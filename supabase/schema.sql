-- ==============================================================================
-- PROJECTO MÃES-INVISÍVEIS — ESQUEMA SUPABASE & POLÍTICAS RLS (AUDITADO)
-- ==============================================================================
-- Domínio Oficial: https://www.maesinvesiveis.com/
-- Fundadora / CEO: Adalgiza Baptista
--
-- ATENÇÃO: NÃO EXECUTAR ANTES DA APROVAÇÃO FINAL DA AUDITORIA DE SEGURANÇA.
--
-- AUDITORIA DE SEGURANÇA & AUTORIZAÇÃO:
-- 1. LOGIN ≠ ADMIN: Utilizadores autenticados normais NÃO têm permissões administrativas.
-- 2. Tabela 'admin_users' e função segura 'is_admin()' verificam autorização no RLS.
-- 3. Contactos ('contact_messages'): visitantes só podem INSERT; utilizadores autenticados
--    normais NÃO têm SELECT/UPDATE/DELETE. Apenas 'admin' pode ler e gerir.
-- 4. Histórias ('stories'): visitante e utilizador comum só lêem 'published'; admin tem CRUD.
-- 5. Storage (bucket 'media'): upload, update e delete restritos estritamente a administradores.
-- 6. Integridade editorial: Rascunhos de desenvolvimento marcados como 'draft' sem datas,
--    localizações ou créditos fictícios.

-- 1. EXTENSÕES NECESSÁRIAS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==============================================================================
-- 2. TABELA: admin_users (Registo de Administradores Autorizados)
-- ==============================================================================
-- Liga-se à tabela auth.users do Supabase Auth.
-- Apenas utilizadores presentes nesta tabela possuem perfil de administrador.
CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL DEFAULT 'admin' CHECK (role = 'admin'),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ==============================================================================
-- 3. FUNÇÃO DE VERIFICAÇÃO DE ADMINISTRADOR (SECURITY DEFINER)
-- ==============================================================================
-- Executada de forma segura pelo PostgreSQL com search_path fixo,
-- garantindo que o utilizador autenticado tem role = 'admin' atribuído.
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM public.admin_users
    WHERE id = auth.uid()
      AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- ==============================================================================
-- 4. TABELA: stories (Histórias & Registos)
-- ==============================================================================
-- Sem valores factuais pré-definidos (localização, crédito fotográfico ou datas inventadas).
CREATE TABLE IF NOT EXISTS public.stories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  subtitle TEXT,
  summary TEXT NOT NULL,
  content TEXT NOT NULL,
  cover_image TEXT,
  cover_image_alt TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  published_at TIMESTAMPTZ,
  seo_title TEXT,
  seo_description TEXT,
  location TEXT,
  document_ref TEXT,
  photographer_credit TEXT,
  tags TEXT[] DEFAULT '{}',
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_stories_slug ON public.stories (slug);
CREATE INDEX IF NOT EXISTS idx_stories_status ON public.stories (status);
CREATE INDEX IF NOT EXISTS idx_stories_published_at ON public.stories (published_at DESC);

-- ==============================================================================
-- 5. TABELA: site_settings (Definições Institucionais e Gerais)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.site_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL DEFAULT '{}'::jsonb,
  description TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ==============================================================================
-- 6. TABELA: contact_messages (Mensagens do Formulário de Contacto)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'archived')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON public.contact_messages (status);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON public.contact_messages (created_at DESC);

-- ==============================================================================
-- 7. TABELA: media (Registo de Ficheiros do Storage)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  public_url TEXT NOT NULL,
  mime_type TEXT,
  size_bytes BIGINT,
  alt_text TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_media_created_at ON public.media (created_at DESC);

-- ==============================================================================
-- 8. FUNÇÃO E TRIGGERS PARA updated_at AUTOMÁTICO
-- ==============================================================================
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_stories_updated_at ON public.stories;
CREATE TRIGGER trigger_stories_updated_at
  BEFORE UPDATE ON public.stories
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS trigger_site_settings_updated_at ON public.site_settings;
CREATE TRIGGER trigger_site_settings_updated_at
  BEFORE UPDATE ON public.site_settings
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- ==============================================================================
-- 9. ROW LEVEL SECURITY (RLS) — ACTIVAR EM TODAS AS TABELAS
-- ==============================================================================
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;

-- ------------------------------------------------------------------------------
-- POLÍTICAS: admin_users
-- ------------------------------------------------------------------------------
-- Apenas administradores autenticados podem ver quem é administrador
DROP POLICY IF EXISTS "Admin read admin_users" ON public.admin_users;
CREATE POLICY "Admin read admin_users"
  ON public.admin_users
  FOR SELECT
  TO authenticated
  USING (public.is_admin());

-- Apenas administradores podem gerir administradores
DROP POLICY IF EXISTS "Admin manage admin_users" ON public.admin_users;
CREATE POLICY "Admin manage admin_users"
  ON public.admin_users
  FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- ------------------------------------------------------------------------------
-- POLÍTICAS: stories
-- ------------------------------------------------------------------------------
-- Público (anon ou utilizador normal): SELECT apenas de histórias com status = 'published'
DROP POLICY IF EXISTS "Public read published stories" ON public.stories;
CREATE POLICY "Public read published stories"
  ON public.stories
  FOR SELECT
  TO anon, authenticated
  USING (status = 'published');

-- Administrador: SELECT de todas as histórias (inclui rascunhos)
DROP POLICY IF EXISTS "Admin read all stories" ON public.stories;
CREATE POLICY "Admin read all stories"
  ON public.stories
  FOR SELECT
  TO authenticated
  USING (public.is_admin());

-- Administrador: INSERT de histórias
DROP POLICY IF EXISTS "Admin insert stories" ON public.stories;
CREATE POLICY "Admin insert stories"
  ON public.stories
  FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin());

-- Administrador: UPDATE de histórias
DROP POLICY IF EXISTS "Admin update stories" ON public.stories;
CREATE POLICY "Admin update stories"
  ON public.stories
  FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Administrador: DELETE de histórias
DROP POLICY IF EXISTS "Admin delete stories" ON public.stories;
CREATE POLICY "Admin delete stories"
  ON public.stories
  FOR DELETE
  TO authenticated
  USING (public.is_admin());

-- ------------------------------------------------------------------------------
-- POLÍTICAS: site_settings
-- ------------------------------------------------------------------------------
-- Público (anon ou utilizador normal): SELECT apenas das definições públicas necessárias
DROP POLICY IF EXISTS "Public read site_settings" ON public.site_settings;
CREATE POLICY "Public read site_settings"
  ON public.site_settings
  FOR SELECT
  TO anon, authenticated
  USING (key = 'institutional');

-- Administrador: SELECT de todas as definições
DROP POLICY IF EXISTS "Admin read site_settings" ON public.site_settings;
CREATE POLICY "Admin read site_settings"
  ON public.site_settings
  FOR SELECT
  TO authenticated
  USING (public.is_admin());

-- Administrador: INSERT de definições
DROP POLICY IF EXISTS "Admin insert site_settings" ON public.site_settings;
CREATE POLICY "Admin insert site_settings"
  ON public.site_settings
  FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin());

-- Administrador: UPDATE de definições
DROP POLICY IF EXISTS "Admin update site_settings" ON public.site_settings;
CREATE POLICY "Admin update site_settings"
  ON public.site_settings
  FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Administrador: DELETE de definições
DROP POLICY IF EXISTS "Admin delete site_settings" ON public.site_settings;
CREATE POLICY "Admin delete site_settings"
  ON public.site_settings
  FOR DELETE
  TO authenticated
  USING (public.is_admin());

-- ------------------------------------------------------------------------------
-- POLÍTICAS: contact_messages
-- ------------------------------------------------------------------------------
-- Público (anon ou autenticado): apenas INSERT com validação rigorosa dos dados
DROP POLICY IF EXISTS "Public insert contact_messages" ON public.contact_messages;
CREATE POLICY "Public insert contact_messages"
  ON public.contact_messages
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    length(trim(name)) > 0 AND
    length(trim(email)) > 3 AND
    length(trim(message)) > 0
  );

-- Administrador: SELECT de mensagens de contacto
-- UTILIZADORES AUTENTICADOS NORMAIS NÃO TÊM ACESSO (PROTEGIDO POR is_admin())
DROP POLICY IF EXISTS "Admin read contact_messages" ON public.contact_messages;
CREATE POLICY "Admin read contact_messages"
  ON public.contact_messages
  FOR SELECT
  TO authenticated
  USING (public.is_admin());

-- Administrador: UPDATE de estado (read, unread, archived)
DROP POLICY IF EXISTS "Admin update contact_messages" ON public.contact_messages;
CREATE POLICY "Admin update contact_messages"
  ON public.contact_messages
  FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Administrador: DELETE de mensagens
DROP POLICY IF EXISTS "Admin delete contact_messages" ON public.contact_messages;
CREATE POLICY "Admin delete contact_messages"
  ON public.contact_messages
  FOR DELETE
  TO authenticated
  USING (public.is_admin());

-- ------------------------------------------------------------------------------
-- POLÍTICAS: media
-- ------------------------------------------------------------------------------
-- Público: SELECT de registos de media
DROP POLICY IF EXISTS "Public read media" ON public.media;
CREATE POLICY "Public read media"
  ON public.media
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Administrador: INSERT de novos registos
DROP POLICY IF EXISTS "Admin insert media" ON public.media;
CREATE POLICY "Admin insert media"
  ON public.media
  FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin());

-- Administrador: UPDATE de registos
DROP POLICY IF EXISTS "Admin update media" ON public.media;
CREATE POLICY "Admin update media"
  ON public.media
  FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Administrador: DELETE de registos
DROP POLICY IF EXISTS "Admin delete media" ON public.media;
CREATE POLICY "Admin delete media"
  ON public.media
  FOR DELETE
  TO authenticated
  USING (public.is_admin());

-- ==============================================================================
-- 10. STORAGE: BUCKET 'media' E POLÍTICAS DE ACESSO
-- ==============================================================================
-- Criação do bucket público 'media' caso não exista (leitura de imagens via CDN)
INSERT INTO storage.buckets (id, name, public)
VALUES ('media', 'media', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Leitura pública de objectos do bucket 'media'
DROP POLICY IF EXISTS "Public read media objects" ON storage.objects;
CREATE POLICY "Public read media objects"
  ON storage.objects
  FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'media');

-- Upload permitido APENAS A ADMINISTRADORES (verificado por public.is_admin())
DROP POLICY IF EXISTS "Admin upload media objects" ON storage.objects;
CREATE POLICY "Admin upload media objects"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'media' AND public.is_admin());

-- Actualização permitida APENAS A ADMINISTRADORES
DROP POLICY IF EXISTS "Admin update media objects" ON storage.objects;
CREATE POLICY "Admin update media objects"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (bucket_id = 'media' AND public.is_admin());

-- Eliminação permitida APENAS A ADMINISTRADORES
DROP POLICY IF EXISTS "Admin delete media objects" ON storage.objects;
CREATE POLICY "Admin delete media objects"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'media' AND public.is_admin());

-- ==============================================================================
-- 11. DADOS INICIAIS (SEED)
-- ==============================================================================

-- A. DEFINIÇÕES INSTITUCIONAIS OFICIAIS (Confirmadas)
INSERT INTO public.site_settings (key, value, description)
VALUES
  (
    'institutional',
    '{
      "projectName": "Projecto Mães-Invisíveis",
      "founderName": "Adalgiza Baptista",
      "founderTitle": "CEO do Projecto Mães-Invisíveis",
      "brandStatement": "IGNORAR NÃO FAZ DESAPARECER",
      "tagline": "Damos visibilidade a quem cuida.",
      "siteUrl": "https://www.maesinvesiveis.com",
      "mission": "Damos visibilidade a quem cuida: mães que enfrentam o medo, a culpa e a luta pela aceitação após o diagnóstico dos filhos.",
      "objective": "Promover a inclusão, o apoio e a capacitação de famílias atípicas nas áreas escolares, educacionais, jurídicas e sociais.",
      "values": ["Inclusão", "Resiliência", "Acolhimento", "Igualdade", "Empatia"],
      "instagram": "https://www.instagram.com/_maes.invisiveis_/"
    }'::jsonb,
    'Informações institucionais oficiais do Projecto Mães-Invisíveis'
  )
ON CONFLICT (key) DO UPDATE SET
  value = EXCLUDED.value,
  updated_at = now();

-- B. RASCUNHOS EDITORIAIS DE HISTÓRIAS
-- AVISO: Os textos abaixo foram preparados durante o desenvolvimento e NÃO FORAM
-- oficialmente confirmados pela fundadora/CEO Adalgiza Baptista.
-- Por este motivo, são inseridos estritamente como status = 'draft' e published_at = NULL,
-- sem datas, localizações ou créditos fotográficos fictícios.
-- Estes relatos NÃO FICAM VISÍVEIS PUBLICAMENTE até aprovação editorial no CMS.
INSERT INTO public.stories (
  id,
  title,
  slug,
  subtitle,
  summary,
  content,
  cover_image,
  cover_image_alt,
  status,
  published_at,
  seo_title,
  seo_description,
  location,
  document_ref,
  photographer_credit,
  tags,
  is_featured
)
VALUES
  (
    'a1b2c3d4-0001-4000-8000-000000000001',
    'A Força de um Abraço',
    'a-forca-de-um-abraco',
    'A presença que desafia o silêncio',
    'No abraço entre mãe e filho reside a mais pura declaração de resistência. A presença materna permanece inabalável.',
    'Ser mãe de uma criança com necessidades atípicas é enfrentar uma realidade que a sociedade frequentemente prefere não encarar. O cansaço físico dos cuidados ininterruptos une-se, com frequência, a um peso ainda mais difícil: o silêncio e a incompreensão dos que estão ao redor.

O projecto Mães Invisíveis nasceu da constatação profunda de que ignorar a existência destas famílias não apaga a sua luta, nem diminui as suas necessidades. Pelo contrário: agrava a solidão de quem já carrega responsabilidades imensas.

Cada registo fotográfico é o testemunho visual de que cada mãe atípica está presente, viva e merece ser plenamente vista, respeitada e apoiada pela sociedade.',
    '/media/adalgiza-e-filho-documental.jpg',
    'Adalgiza Baptista abraçando o filho',
    'draft',
    NULL,
    'A Força de um Abraço | Mães Invisíveis',
    'No abraço entre mãe e filho reside a mais pura declaração de resistência.',
    NULL,
    NULL,
    NULL,
    ARRAY['Maternidade Atípica', 'Presença'],
    false
  ),
  (
    'a1b2c3d4-0002-4000-8000-000000000002',
    'O Afeto no Quotidiano',
    'o-afeto-no-quotidiano',
    'A verdade dos pequenos instantes que sustentam uma vida inteira',
    'Nos gestos quotidianos de carinho revela-se a dedicação de quem cuida todos os dias sem interrupção.',
    'A maternidade atípica constrói-se na minúcia dos dias: na atenção às rotinas, nas barreiras ultrapassadas a cada saída e na sensibilidade de compreender aquilo que nem sempre é dito por palavras.

Quando o espaço público não oferece acessibilidade nem acolhimento, o afeto familiar torna-se o verdadeiro refúgio. Contudo, nenhuma família deveria ter de existir isolada do mundo.

Registar estes momentos é devolver a humanidade que os rótulos e diagnósticos clínicos tantas vezes obscurecem. Antes de qualquer condição, existe uma relação de amor que merece espaço, dignidade e reconhecimento coletivo.',
    '/media/adalgiza-e-filho-afeto.jpg',
    'Adalgiza Baptista num momento de carinho com o filho',
    'draft',
    NULL,
    'O Afeto no Quotidiano | Mães Invisíveis',
    'Nos gestos quotidianos de carinho revela-se a dedicação de quem cuida todos os dias.',
    NULL,
    NULL,
    NULL,
    ARRAY['Quotidiano', 'Afeto'],
    false
  ),
  (
    'a1b2c3d4-0003-4000-8000-000000000003',
    'A Voz que Recusou o Silêncio',
    'adalgiza-baptista-fundadora',
    'A fundadora do Projecto Mães-Invisíveis',
    'Ao recusar a invisibilidade, Adalgiza Baptista colocou a sua determinação ao serviço de todas as mães que partilham a mesma caminhada.',
    'O Projecto Mães Invisíveis tem como fundadora e CEO Adalgiza Baptista, que assumiu a missão de criar uma plataforma de acolhimento e escuta para mães de filhos atípicos.

O objectivo não é vitimizar, mas mobilizar: dar visibilidade a quem cuida, unir famílias em situações semelhantes e promover a inclusão nas áreas escolares, educacionais, jurídicas e sociais.

Acreditamos que ignorar não faz desaparecer. Por isso criamos um espaço onde cada relato é visto, cada luta é reconhecida e cada família encontra apoio.',
    '/media/adalgiza-retrato.jpg',
    'Retrato de Adalgiza Baptista, CEO e Fundadora do Projecto Mães-Invisíveis',
    'draft',
    NULL,
    'A Voz que Recusou o Silêncio | Mães Invisíveis',
    'Ao recusar a invisibilidade, Adalgiza Baptista colocou a sua determinação ao serviço de todas as mães.',
    NULL,
    NULL,
    NULL,
    ARRAY['Fundadora', 'Visibilidade'],
    false
  )
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  subtitle = EXCLUDED.subtitle,
  summary = EXCLUDED.summary,
  content = EXCLUDED.content,
  cover_image = EXCLUDED.cover_image,
  cover_image_alt = EXCLUDED.cover_image_alt,
  status = EXCLUDED.status,
  published_at = EXCLUDED.published_at,
  location = EXCLUDED.location,
  document_ref = EXCLUDED.document_ref,
  photographer_credit = EXCLUDED.photographer_credit,
  updated_at = now();

-- ==============================================================================
-- 12. INSTRUÇÃO PARA ASSOCIAR O PRIMEIRO ADMINISTRADOR
-- ==============================================================================
-- Depois de criar o utilizador no menu Authentication > Users do Supabase,
-- execute a seguinte instrução com o ID e o e-mail correspondente:
--
-- INSERT INTO public.admin_users (id, email, role)
-- VALUES ('<UUID_DO_UTILIZADOR_CRIADO_NO_AUTH>', 'admin@maesinvesiveis.com', 'admin')
-- ON CONFLICT (id) DO NOTHING;
