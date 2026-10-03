# Mães Invisíveis

Plataforma oficial e CMS administrativo do **Projecto Mães-Invisíveis**, dedicado a dar visibilidade, acolhimento e dignidade às mães de crianças atípicas (autismo, TDAH, síndromes, doenças raras e outras neurodivergências).

Domínio Oficial: [https://www.maesinvesiveis.com/](https://www.maesinvesiveis.com/)  
Liderança: **Adalgiza Baptista** (CEO e Fundadora)  
Slogan: *"IGNORAR NÃO FAZ DESAPARECER"*

---

## 1. Visão Geral

O projeto é composto por:
1. **Website Institucional Público:** Apresentação da missão, manifesto editorial, registos e histórias documentais, área de apoio cívico e formulário de contacto protegido.
2. **CMS Administrativo (`/admin`):** Painel restrito para gestão de conteúdos (criação, edição, publicação e despublicação de histórias), consulta de mensagens recebidas, edição de informações institucionais, gestão de ficheiros de media e métricas diárias de visitas ao website.

---

## 2. Stack Tecnológica

* **Framework:** [Next.js](https://nextjs.org/) (App Router, Turbopack)
* **Biblioteca UI:** [React](https://react.dev/)
* **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
* **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
* **Base de Dados & Backend:** [Supabase](https://supabase.com/)
* **Autenticação:** Supabase Auth (sessão gerida com cookies HTTP seguros via `@supabase/ssr`)
* **Base de Dados:** PostgreSQL com Row Level Security (RLS) e funções `SECURITY DEFINER`
* **Armazenamento:** Supabase Storage (bucket `media` protegido)
* **Hospedagem & CDN:** [Vercel](https://vercel.com/) com SSL automatizado e CDN Edge global

---

## 3. Estrutura do Projeto

```text
web/
├── public/
│   ├── brand/              # Logótipos oficiais vetorizados e favicons
│   ├── media/              # Fotografias documentais e vídeo oficial otimizado
│   └── og-image.jpg        # Imagem oficial para redes sociais (1200x630)
├── src/
│   ├── app/                # Rotas do Next.js App Router (públicas e /admin)
│   │   ├── admin/          # Rotas protegidas do CMS administrativo
│   │   ├── api/            # Endpoints seguros (contacto, auth, analytics)
│   │   ├── sitemap.ts      # Geração dinâmica do sitemap.xml
│   │   └── robots.ts       # Regras de indexação do robots.txt
│   ├── components/
│   │   ├── admin/          # Componentes do painel CMS (AdminShell, tabelas)
│   │   ├── analytics/      # Componente cliente de registo de visualizações
│   │   ├── editorial/      # Componentes do Hero audiovisual, manifesto e histórias
│   │   ├── layout/         # Navbar, Footer, navegação móvel e acessibilidade
│   │   └── ui/             # Componentes de base (Button, Card, Container)
│   ├── lib/
│   │   ├── content.ts      # Dados institucionais estáticos e histórias de desenvolvimento
│   │   ├── data/           # Métodos de consulta de dados com fallback resiliente
│   │   └── supabase/       # Clientes Supabase (browser, server, public, middleware)
│   └── types/              # Definições TypeScript para conteúdos e esquema Supabase
└── supabase/
    └── schema.sql          # Esquema DDL completo, políticas RLS e triggers
```

---

## 4. Execução Local

### Pré-requisitos
* Node.js 18+ (recomendado Node.js 20 LTS)
* npm, yarn ou pnpm

### Instalação e Desenvolvimento
```bash
# 1. Instalar dependências
npm install

# 2. Iniciar servidor de desenvolvimento local
npm run dev
```
O projeto estará acessível em `http://localhost:3000`.

### Compilação de Produção
```bash
# 3. Compilar projeto para produção (TypeScript + SSG)
npm run build

# 4. Executar servidor de produção local
npm run start
```

---

## 5. Variáveis de Ambiente

Crie um ficheiro `.env.local` na raiz de `web/` com base no [.env.example](file:///c:/Users/us/Desktop/Projecto-maes-invisiveis/web/.env.example):

```env
# URL da instância Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co

# Chave pública anónima (segura no browser sob políticas RLS)
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Domínio oficial canónico
NEXT_PUBLIC_SITE_URL=https://www.maesinvesiveis.com

# URL opcional para CDN externa do vídeo (por omissão utiliza /media/hero-video.mp4)
NEXT_PUBLIC_HERO_VIDEO_URL=/media/hero-video.mp4
```

> **IMPORTANTE DE SEGURANÇA:**
> - O ficheiro `.env.local` **NUNCA** deve ser commitado no repositório Git (já incluído no `.gitignore`).
> - A chave `SUPABASE_SERVICE_ROLE_KEY` **NÃO É UTILIZADA** no frontend e **NUNCA** deve ser adicionada ao código ou às variáveis do cliente.
> - Todas as operações administrativas são controladas através de autenticação de sessão e Row Level Security (RLS).

---

## 6. Arquitetura Supabase

O ficheiro [supabase/schema.sql](file:///c:/Users/us/Desktop/Projecto-maes-invisiveis/web/supabase/schema.sql) define a estrutura do banco:

* **`auth.users`:** Tabela nativa de utilizadores autenticados do Supabase.
* **`admin_users`:** Registo de utilizadores com perfil de administrador autorizado (`role = 'admin'`), associada por chave estrangeira a `auth.users(id)`.
* **`public.is_admin()`:** Função segura com `SECURITY DEFINER` e `SET search_path = public` que verifica se `auth.uid()` pertence a `admin_users`.
* **`stories`:** Histórias e registos editoriais (`status IN ('draft', 'published')`).
* **`site_settings`:** Definições institucionais oficiais em formato JSONB (`key = 'institutional'`).
* **`contact_messages`:** Mensagens submetidas através do formulário de contacto.
* **`page_views`:** Métricas diárias anónimas de tráfego de páginas.
* **`media`:** Metadados dos ficheiros guardados no Supabase Storage.
* **RLS (Row Level Security):** Ativado em **todas** as tabelas. Utilizadores comuns e anónimos não têm permissão de escrita em nenhuma tabela.

---

## 7. CMS Administrativo

Aceda a `/admin/login` para entrar no painel.

* **Dashboard (`/admin/dashboard`):** Visão geral de métricas, gráfico dos últimos 14 dias de visitas, ranking de páginas mais consultadas, histórias recentes e mensagens não lidas.
* **Histórias (`/admin/historias`):**
  * Criação de novas histórias (`/admin/historias/nova`) com upload direto de fotografia para o Supabase Storage.
  * Modo **Rascunho (`draft`)**: Fica visível apenas para administradores dentro do CMS.
  * Modo **Publicado (`published`)**: Disponível publicamente no site e integrado no sitemap.
  * Edição e despublicação imediata (`/admin/historias/[id]`).
  * Proteção contra identificadores duplicados (`slug UNIQUE`).
* **Contactos (`/admin/contactos`):** Consulta das mensagens enviadas pelos visitantes, com marcação de estado (*não lida*, *lida*, *arquivada*).
* **Configurações (`/admin/configuracoes`):** Edição dos textos institucionais oficiais (missão, valores, slogan, hiperligações comunitárias).
* **Terminar Sessão:** Encerramento seguro de sessão no cliente e servidor.

---

## 8. Segurança e Privacidade

1. **Autenticação Server-Side:** Validação criptográfica de sessão no servidor através de `auth.getUser()` no middleware do Next.js.
2. **Autorização Rígida (Login ≠ Admin):** Utilizadores autenticados comuns não possuem acesso ao CMS. O middleware e as regras de RLS barram qualquer utilizador que não esteja registado na tabela `admin_users`.
3. **Proteção Total do Banco de Dados:** A segurança é garantida no PostgreSQL através de Row Level Security (RLS). Mesmo com pedidos manuais à API Supabase, operações não autorizadas são rejeitadas.
4. **Proteção de Contactos:** Visitantes apenas podem efetuar `INSERT` com validações rigorosas e proteção anti-spam honeypot (`hp_website`). O acesso de leitura (`SELECT`) é restrito exclusivamente a administradores.
5. **Políticas de Storage:** O bucket público `media` permite leitura das imagens pelo navegador, mas qualquer operação de `INSERT`, `UPDATE` ou `DELETE` requer verificação afirmativa da função `public.is_admin()`.

---

## 9. SEO & Metadados Técnicos

* **Domínio Canónico Oficial:** Todas as rotas públicas configuram expressamente `alternates: { canonical: "https://www.maesinvesiveis.com/..." }`.
* **Sitemap Dinâmico:** Gerado em `/sitemap.xml`, incluindo automaticamente novas histórias assim que o status for alterado para `published`.
* **Robots.txt:** Configurado em `/robots.txt` para proibir a indexação de `/admin/` e `/api/`.
* **Open Graph & Twitter:** Configurados com imagem documental oficial (`/og-image.jpg`, 1200x630 px) e textos alinhados com a missão.
* **Schema.org (JSON-LD):** Metadados estruturados de `Organization` e `WebSite` injetados no cabeçalho global com dados confirmados da fundadora e do projeto.

---

## 10. Implementação & Deploy

* **Repositório GitHub:** `Ageu234/maes-invisiveis` (branch `main`).
* **Plataforma de Produção:** Vercel com build automatizado em cada push para `main`.
* **Domínio:** `https://www.maesinvesiveis.com/` (com redirecionamento automático do domínio apex `maesinvesiveis.com` configurado na Vercel).
* **Comando de Compilação:** `next build`.

---

## 11. Governança Editorial

* Todos os relatos, depoimentos e conteúdos a disponibilizar ao público devem ser previamente validados pela fundadora e CEO **Adalgiza Baptista**.
* Histórias em fase de redação ou revisão devem ser mantidas no status **Rascunho (`draft`)**.
* Não devem ser incluídas datas factuais, moradas, contactos telefónicos, estatísticas ou credenciais não comprovadas formalmente pela liderança do projeto.
