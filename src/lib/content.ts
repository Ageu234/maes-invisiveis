import { ProjectInstitutionalInfo, Story, NavItem } from "@/types/content";

/**
 * Conteúdo institucional oficial — Projecto Mães-Invisíveis
 * Fundadora/CEO: Adalgiza Baptista
 * Domínio: https://www.maesinvesiveis.com/
 * Instagram oficial: https://www.instagram.com/_maes.invisiveis_/
 *
 * AUDITORIA:
 * - Todos os dados aqui presentes são confirmados ou declarados neutros.
 * - Não contêm datas de fundação, estatísticas, sedes, parceiros ou testemunhos inventados.
 * - O link WhatsApp original não foi confirmado — removido.
 */

export const INSTITUTIONAL_INFO: ProjectInstitutionalInfo = {
  name: "Mães Invisíveis",
  projectName: "Projecto Mães-Invisíveis",
  founderName: "Adalgiza Baptista",
  founderTitle: "CEO do Projecto Mães-Invisíveis",
  brandStatement: "IGNORAR NÃO FAZ DESAPARECER",
  tagline: "Damos visibilidade a quem cuida.",
  siteUrl: "https://www.maesinvesiveis.com",

  /**
   * Texto oficial do projecto — fornecido pela fundadora.
   */
  aboutText: `Um projecto dedicado às mães atípicas que exercem a maternidade de filhos com deficiências, como autismo, TDAH, síndromes, doenças raras ou outras neurodivergências, enfrentando uma rotina marcada por cuidados intensivos, terapias e necessidades diferentes do desenvolvimento padrão.

É uma jornada marcada por amor intenso, mas também por sobrecarga, necessidade de resiliência e, frequentemente, pela falta de uma rede de apoio.

Damos visibilidade a quem cuida: mães que enfrentam o medo, a culpa e a luta pela aceitação após o diagnóstico dos filhos. Ao mesmo tempo, estendemos o nosso apoio a famílias em situação de vulnerabilidade.

Acreditamos que "ignorar não faz desaparecer".

Por isso, tiramos histórias da invisibilidade e criamos um espaço de acolhimento real, onde cada relato é visto, cada luta é reconhecida e cada família encontra apoio. Aqui, o silêncio transforma-se em apoio, e o apoio abre caminho para um novo recomeço.`,

  mission: "Damos visibilidade a quem cuida: mães que enfrentam o medo, a culpa e a luta pela aceitação após o diagnóstico dos filhos.",
  objective: "Promover a inclusão, o apoio e a capacitação de famílias atípicas nas áreas escolares, educacionais, jurídicas e sociais.",

  values: [
    "Inclusão",
    "Resiliência",
    "Acolhimento",
    "Igualdade",
    "Empatia",
  ],

  publicPositioning: {
    target: "Mães atípicas que exercem a maternidade de filhos com deficiências, autismo, TDAH, síndromes e outras neurodivergências.",
    pillars: ["Ignoradas", "Sozinhas", "Mas presentes."],
    missionStatement: "Damos visibilidade a quem cuida.",
    callToAction: "Junta-te à comunidade.",
  },

  communityLinks: {
    instagram: "https://www.instagram.com/_maes.invisiveis_/",
    // WhatsApp: a ser fornecido oficialmente quando disponível
    whatsappCommunity: null,
  },

  statusFlags: {
    officialHistoryProvided: false,
    officialMissionProvided: true,
    officialVisionProvided: false,
    officialPartnersProvided: false,
    donationsEnabled: false,
  },
};

export const NAVIGATION_ITEMS: NavItem[] = [
  { label: "Manifesto", href: "/#manifesto" },
  { label: "O Projeto", href: "/projeto" },
  { label: "Histórias", href: "/historias" },
  { label: "Apoiar", href: "/apoiar" },
  { label: "Contacto", href: "/contacto" },
];

/**
 * HISTÓRIAS — Registos fotográficos documentais.
 *
 * AUDITORIA:
 * - As fotografias são reais (acervo do projecto).
 * - Os títulos e textos descritivos são editorialmente neutros,
 *   baseados no que é visível nas fotografias e no posicionamento confirmado do projecto.
 * - Não contêm dados biográficos inventados, datas de eventos, localizações específicas
 *   ou afirmações factuais sobre terceiros não confirmadas.
 * - "Arquivo Documental" e referências tipo "DOC. N.º" são rótulos editoriais — não afirmações
 *   de existência de um arquivo formal.
 */
export const INITIAL_STORIES: Story[] = [
  {
    id: "historia-adalgiza",
    slug: "a-forca-de-um-abraco",
    title: "A Força de um Abraço",
    subtitle: "A presença que desafia o silêncio",
    excerpt: "No abraço entre mãe e filho reside a mais pura declaração de resistência. A presença materna permanece inabalável.",
    date: "2026",
    location: "Projecto Mães-Invisíveis",
    documentRef: "Registo Fotográfico",
    featuredImage: "/media/adalgiza-e-filho-documental.jpg",
    featuredImageAlt: "Adalgiza Baptista abraçando o filho — registo fotográfico do Projecto Mães-Invisíveis.",
    content: [
      "Ser mãe de uma criança com necessidades atípicas é enfrentar uma realidade que a sociedade frequentemente prefere não encarar. O cansaço físico dos cuidados ininterruptos une-se, com frequência, a um peso ainda mais difícil: o silêncio e a incompreensão dos que estão ao redor.",
      "O projecto Mães Invisíveis nasceu da constatação profunda de que ignorar a existência destas famílias não apaga a sua luta, nem diminui as suas necessidades. Pelo contrário: agrava a solidão de quem já carrega responsabilidades imensas.",
      "Cada registo fotográfico é o testemunho visual de que cada mãe atípica está presente, viva e merece ser plenamente vista, respeitada e apoiada pela sociedade.",
    ],
    photographerCredit: "Acervo Mães Invisíveis",
    tags: ["Maternidade Atípica", "Presença", "Acolhimento"],
    isFeatured: true,
  },
  {
    id: "historia-quotidiano",
    slug: "o-afeto-no-quotidiano",
    title: "O Afeto no Quotidiano",
    subtitle: "A verdade dos pequenos instantes que sustentam uma vida inteira",
    excerpt: "Nos gestos quotidianos de carinho revela-se a dedicação de quem cuida todos os dias sem interrupção.",
    date: "2026",
    location: "Projecto Mães-Invisíveis",
    documentRef: "Registo Fotográfico",
    featuredImage: "/media/adalgiza-e-filho-afeto.jpg",
    featuredImageAlt: "Adalgiza Baptista num momento de carinho com o filho — registo do Projecto Mães-Invisíveis.",
    content: [
      "A maternidade atípica constrói-se na minúcia dos dias: na atenção às rotinas, nas barreiras ultrapassadas a cada saída e na sensibilidade de compreender aquilo que nem sempre é dito por palavras.",
      "Quando o espaço público não oferece acessibilidade nem acolhimento, o afeto familiar torna-se o verdadeiro refúgio. Contudo, nenhuma família deveria ter de existir isolada do mundo.",
      "Registar estes momentos é devolver a humanidade que os rótulos e diagnósticos clínicos tantas vezes obscurecem. Antes de qualquer condição, existe uma relação de amor que merece espaço, dignidade e reconhecimento coletivo.",
    ],
    photographerCredit: "Acervo Mães Invisíveis",
    tags: ["Quotidiano", "Afeto", "Dignidade"],
    isFeatured: true,
  },
  {
    id: "historia-lideranca",
    slug: "adalgiza-baptista-fundadora",
    title: "A Voz que Recusou o Silêncio",
    subtitle: "A fundadora do Projecto Mães-Invisíveis",
    excerpt: "Ao recusar a invisibilidade, Adalgiza Baptista colocou a sua determinação ao serviço de todas as mães que partilham a mesma caminhada.",
    date: "2026",
    location: "Projecto Mães-Invisíveis",
    documentRef: "Registo Fotográfico",
    featuredImage: "/media/adalgiza-retrato.jpg",
    featuredImageAlt: "Retrato de Adalgiza Baptista, CEO e Fundadora do Projecto Mães-Invisíveis.",
    content: [
      "O Projecto Mães Invisíveis tem como fundadora e CEO Adalgiza Baptista, que assumiu a missão de criar uma plataforma de acolhimento e escuta para mães de filhos atípicos.",
      "O objectivo não é vitimizar, mas mobilizar: dar visibilidade a quem cuida, unir famílias em situações semelhantes e promover a inclusão nas áreas escolares, educacionais, jurídicas e sociais.",
      "Acreditamos que ignorar não faz desaparecer. Por isso criamos um espaço onde cada relato é visto, cada luta é reconhecida e cada família encontra apoio.",
    ],
    photographerCredit: "Acervo Mães Invisíveis",
    tags: ["Fundadora", "Visibilidade", "Inclusão"],
    isFeatured: true,
  },
];
