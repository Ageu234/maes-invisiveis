import { ProjectInstitutionalInfo, Story, NavItem } from "@/types/content";

/**
 * Public institutional data and confirmed facts.
 * Founder: Adalgiza Baptista
 * Confirmed positioning:
 * - "IGNORAR NÃO FAZ DESAPARECER"
 * - "Ignoradas | Sozinhas | Mas presentes."
 * - "Mães de filhos atípicos."
 * - "Damos voz ao que o mundo finge não ver."
 * - "Junta-te à comunidade."
 */
export const INSTITUTIONAL_INFO: ProjectInstitutionalInfo = {
  name: "Mães Invisíveis",
  founderName: "Adalgiza Baptista",
  brandStatement: "IGNORAR NÃO FAZ DESAPARECER",
  tagline: "Damos voz ao que o mundo finge não ver.",
  publicPositioning: {
    target: "Mães de filhos atípicos.",
    pillars: ["Ignoradas", "Sozinhas", "Mas presentes."],
    missionStatement: "Damos voz ao que o mundo finge não ver.",
    callToAction: "Junta-te à comunidade.",
  },
  communityLinks: {
    instagram: "https://instagram.com", // Canal público oficial do projeto
    whatsappCommunity: "https://chat.whatsapp.com", // Comunidade pública de mães
  },
  statusFlags: {
    officialHistoryProvided: false,
    officialMissionProvided: false,
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
 * Curated documentary stories grounded strictly in the real photographic assets.
 * Respectful, dignified narrative focusing on maternal presence, devotion, and social recognition.
 */
export const INITIAL_STORIES: Story[] = [
  {
    id: "historia-adalgiza",
    slug: "a-forca-de-um-abraco",
    title: "A Força de um Abraço e o Fim da Invisibilidade",
    subtitle: "A presença que desafia o silêncio e o isolamento",
    excerpt: "No abraço entre mãe e filho reside a mais pura declaração de resistência. Contra a indiferença do mundo, a presença materna permanece inabalável.",
    date: "2026",
    location: "Arquivo Documental",
    documentRef: "DOC. N.º 01 / REGISTO CENTRAL",
    featuredImage: "/media/adalgiza-e-filho-documental.jpg",
    featuredImageAlt: "Fotografia documental a preto e branco: Adalgiza Baptista abraçando com ternura e serenidade o seu filho.",
    content: [
      "Ser mãe de uma criança com necessidades atípicas é enfrentar uma realidade que a sociedade frequentemente prefere não encarar. O cansaço físico dos cuidados ininterruptos une-se, com frequência, a um peso ainda mais difícil: o silêncio e a incompreensão dos que estão ao redor.",
      "O projeto Mães Invisíveis nasceu da constatação profunda de que ignorar a existência destas famílias não apaga a sua luta, nem diminui as suas necessidades. Pelo contrário: agrava a solidão de quem já carrega responsabilidades imensas.",
      "Neste registo fotográfico a preto e branco, o abraço não expressa resignação, mas sim soberania afetiva. É o testemunho visual de que cada mãe atípica está presente, viva e merece ser plenamente vista, respeitada e apoiada pela sociedade."
    ],
    photographerCredit: "Acervo Mães Invisíveis",
    tags: ["Maternidade Atípica", "Presença", "Resistência Afetiva"],
    isFeatured: true,
  },
  {
    id: "historia-quotidiano",
    slug: "o-afeto-no-quotidiano",
    title: "O Afeto no Quotidiano dos Cuidados",
    subtitle: "A verdade dos pequenos instantes que sustentam uma vida inteira",
    excerpt: "Nos pequenos trajetos e nos gestos quotidianos de carinho revela-se a dedicação invisível de quem cuida todos os dias sem interrupção.",
    date: "2026",
    location: "Arquivo Documental",
    documentRef: "DOC. N.º 02 / CONTEXTO REAL",
    featuredImage: "/media/adalgiza-e-filho-afeto.jpg",
    featuredImageAlt: "Fotografia documental de Adalgiza Baptista num momento de carinho espontâneo e beijo no rosto do filho.",
    content: [
      "A maternidade atípica constrói-se na minúcia dos dias: na atenção às rotinas terapêuticas, nas barreiras ultrapassadas a cada saída e na sensibilidade de compreender aquilo que nem sempre é dito por palavras.",
      "Quando o espaço público não oferece acessibilidade nem acolhimento, o afeto familiar torna-se o verdadeiro refúgio. Contudo, nenhuma família deveria ter de existir isolada do mundo.",
      "Registar estes momentos em fotografia é devolver a humanidade que os rótulos e diagnósticos clínicos tantas vezes obscurecem. Antes de qualquer condição, existe uma relação de amor que merece espaço, dignidade e reconhecimento coletivo."
    ],
    photographerCredit: "Acervo Mães Invisíveis",
    tags: ["Quotidiano", "Afeto", "Dignidade"],
    isFeatured: true,
  },
  {
    id: "historia-lideranca",
    slug: "adalgiza-baptista-fundadora",
    title: "Adalgiza Baptista: Liderança, Coragem e Propósito",
    subtitle: "A fundadora que transformou a vivência própria numa voz coletiva",
    excerpt: "Ao recusar a invisibilidade, Adalgiza Baptista colocou a sua determinação ao serviço de todas as mães que partilham a mesma caminhada solitária.",
    date: "2026",
    location: "Sede do Movimento",
    documentRef: "DOC. N.º 03 / LIDERANÇA INSTITUCIONAL",
    featuredImage: "/media/adalgiza-retrato.jpg",
    featuredImageAlt: "Retrato editorial de estúdio de Adalgiza Baptista, Fundadora do projeto Mães Invisíveis.",
    content: [
      "A criação do movimento Mães Invisíveis é fruto direto da determinação de Adalgiza Baptista. Perante os obstáculos quotidianos de ser mãe de um filho atípico, compreendeu que o isolamento que sentia não era uma fatalidade individual, mas sim um fenómeno social generalizado.",
      "Em vez de se conformar com a ausência de representação, assumiu a missão de criar uma plataforma de acolhimento e escuta. O objetivo não é vitimizar, mas mobilizar: consciencializar a opinião pública, unir famílias em situações idênticas e exigir que o cuidado materno seja valorizado.",
      "Hoje, o projeto Mães Invisíveis afirma-se como um manifesto e um ponto de encontro: para que nenhuma mãe atípica continue a sentir-se desamparada ou esquecida."
    ],
    photographerCredit: "Acervo Mães Invisíveis",
    tags: ["Fundadora", "Voz Coletiva", "Liderança"],
    isFeatured: true,
  }
];
