import "dotenv/config"
import { PrismaPg } from "@prisma/adapter-pg"
import pg from "pg"
import { PrismaClient } from "@/infrastructure/prisma/output/client"

const connectionString = process.env.DATABASE_URL
if (!connectionString) {
  throw new Error("DATABASE_URL is required for seed")
}

const schema = (() => {
  try {
    return new URL(connectionString).searchParams.get("schema") ?? "gmbovinos"
  } catch {
    return "gmbovinos"
  }
})()

const pool = new pg.Pool({ connectionString })
pool.on("connect", (client) => {
  void client.query(`SET search_path TO "${schema}", public`)
})

const prisma = new PrismaClient({ adapter: new PrismaPg(pool) })

const mapsEmbedUrl =
  "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3711.2913709424433!2d-45.4830883!3d-21.535459400000004!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ca8d3973a83c9b%3A0x1cee0e6762772380!2sFazenda%20Para%C3%ADso%20-%20Varginha!5e0!3m2!1spt-BR!2sbr!4v1777071671981!5m2!1spt-BR!2sbr"

const sections = [
  {
    key: "hero",
    title: "Hero",
    payload: {
      eyebrow: "GM Bovinos · Pecuária de corte",
      headline: "Compra e venda de gado",
      body: "Avaliação de lote, alinhamento de preço e acompanhamento da transação — com base técnica em engorda, manejo e sanidade para fechar com mais segurança.",
      chip: "Negociação técnica · transparência comercial",
      imageUrl: "/media/photos/02.webp",
      ctaPrimaryLabel: "Ver galeria",
      ctaPrimaryHref: "#gallery",
      ctaSecondaryLabel: "Como funciona",
      ctaSecondaryHref: "#como-funciona",
    },
  },
  {
    key: "como_funciona",
    title: "Como funciona",
    payload: {
      eyebrow: "Processo comercial",
      headline: "Como funciona",
      body: "O foco principal é compra e venda de gado com critério técnico e clareza comercial. Engorda e manejo fazem parte da nossa base operacional — usamos esse know-how em cada etapa do negócio.",
      steps: [
        {
          title: "Intenção e perfil do negócio",
          description:
            "Entendemos se você compra, vende ou repassa gado, o perfil de lote desejado ou ofertado e o prazo — para direcionar a conversa e evitar perda de tempo.",
        },
        {
          title: "Avaliação técnica do rebanho",
          description:
            "Análise de condição animal, lote, risco sanitário e documentação: o mesmo olhar técnico da operação de engorda aplicado à decisão de compra ou venda.",
        },
        {
          title: "Proposta e fechamento",
          description:
            "Precificação alinhada ao mercado, transparência nas condições e acompanhamento da negociação até o acordo.",
        },
        {
          title: "Logística e continuidade",
          description:
            "Apoio na logística da troca e, quando fizer sentido, continuidade com planejamento de manejo ou engorda após o negócio.",
        },
      ],
    },
  },
  {
    key: "atuacao",
    title: "Atuação",
    payload: {
      eyebrow: "Atuação institucional",
      headline: "Atuação da GM Bovinos",
      body: "A GM Bovinos tem como foco principal a compra e venda de gado, com avaliação de lote e acompanhamento comercial de ponta a ponta. A operação de engorda, manejo e sanidade é a base técnica que sustenta negócios mais seguros e previsíveis.",
      highlightChips: [
        { label: "Prioridade", value: "Compra e venda de gado" },
        { label: "Base técnica", value: "Engorda e manejo" },
        { label: "Foco", value: "Negócio seguro e claro" },
      ],
      pillars: [
        {
          title: "Compra e venda de gado",
          description:
            "Negociação de lote com análise de condição animal, precificação alinhada ao mercado e acompanhamento da transação — prioridade na operação da GM Bovinos.",
          points: [
            "Avaliação técnica para compra ou venda com mais segurança",
            "Transparência nas condições e no processo comercial",
            "Parcerias de longo prazo com produtores e frigoríficos",
          ],
        },
        {
          title: "Engorda e serviços técnicos no campo",
          description:
            "Quando o produtor contrata manejo ou engorda, oferecemos planejamento nutricional, protocolos sanitários e acompanhamento contínuo.",
          points: [
            "Plano técnico por fase do rebanho",
            "Rotina operacional orientada por indicadores",
            "Suporte para decisões no manejo e na performance do lote",
          ],
        },
      ],
    },
  },
  {
    key: "seo_content",
    title: "Conteúdo SEO",
    payload: {
      eyebrow: "Padrão de atendimento",
      headline: "Compra e venda de gado com critério técnico",
      body: "Negociamos gado com avaliação de lote, alinhamento de preço e acompanhamento da transação. Engorda, nutrição e sanidade entram como suporte técnico.",
      secondaryHeadline: "Como conduzimos o negócio",
      secondaryBody:
        "Começamos pela conversa objetiva (comprar, vender ou repassar), seguimos com visita ou análise do rebanho e fechamos com proposta clara e logística alinhada.",
      bullets: [
        "Avaliação de condição animal e de lote antes da proposta.",
        "Transparência em preço, prazo e responsabilidades de cada parte.",
        "Acompanhamento até a conclusão da troca e suporte pós-negócio quando necessário.",
      ],
      audienceHeadline: "Para quem é indicado",
      audienceBody:
        "Produtores e parceiros que querem comprar ou vender gado com interlocutor presente; quem busca avaliação técnica antes de fechar; e quem, além do negócio, precisa de planejamento de engorda ou manejo contínuo na fazenda.",
      secondaryBullets: [
        "Produtores e parceiros que querem comprar ou vender gado com interlocutor presente.",
        "Quem busca avaliação técnica antes de fechar.",
        "Quem, além do negócio, precisa de planejamento de engorda ou manejo contínuo.",
      ],
    },
  },
  {
    key: "about",
    title: "Sobre nós",
    payload: {
      eyebrow: "Quem somos",
      headline: "Sobre nós",
      body: "Hoje a frente comercial é compra e venda de gado, com a mesma seriedade de quem há anos opera engorda, confinamento e integração com indústria e parceiros no campo.",
      paragraphs: [
        "A GM Bovinos nasceu na recria e engorda de bois. Em 2006, com o crescimento da demanda, iniciamos o confinamento na Fazenda Paraíso, em Varginha-MG.",
        "O sistema aumentou a produtividade e aproximou indústria, confinamento e parceiros. Desde então, mantemos foco em gestão, tecnologia e rotina de campo bem acompanhada.",
        "Em 2008, em parceria com a IFB Fertilizantes, criamos o BioFertilizante Conforto. A solução aproveita o esterco da propriedade e transforma esse material em insumo para o solo, com foco em sustentabilidade e produtividade.",
        "Hoje, atuamos com compra e venda de gado, avaliação de lote e apoio técnico no campo. O trabalho segue transparente, com respeito ao meio ambiente, colaboradores, parceiros, fornecedores e clientes.",
      ],
      timeline: [
        {
          label: "Início",
          title: "Origem na recria e engorda",
          description:
            "Nascemos com atividades de recria e engorda de bois, construindo experiência prática no campo.",
        },
        {
          label: "2006",
          title: "Sistema de confinamento",
          description:
            "Com o crescimento da demanda, iniciamos o sistema de confinamento da Fazenda Paraíso em Varginha-MG, aumentando produtividade e eficiência operacional.",
        },
        {
          label: "2008",
          title: "Inovação com BioFertilizante Conforto",
          description:
            "Em parceria com a IFB Fertilizantes, criamos o BioFertilizante Conforto para transformar o excesso de esterco animal em insumo de alta qualidade para o solo.",
        },
        {
          label: "Hoje",
          title: "Negócios e operação integrada",
          description:
            "Atuamos com foco em compra e venda de gado e em relações comerciais duradouras, apoiados por gestão, infraestrutura de confinamento e responsabilidade com parceiros e clientes.",
        },
      ],
    },
  },
  {
    key: "cta",
    title: "Contato / CTA",
    payload: {
      eyebrow: "Fale com a equipe",
      headline: "Quer comprar, vender ou tirar dúvidas?",
      body: "Fale sobre compra ou venda de gado, avaliação de lote ou engorda e manejo no campo. Retornamos em poucas horas com os próximos passos.",
    },
  },
  {
    key: "pre_footer",
    title: "Pré-rodapé",
    payload: {
      headline: "Compra e venda de gado",
      body: "Negócio com critério técnico e transparência — da avaliação do lote ao fechamento.",
      imageUrl: "/media/photos/07.webp",
    },
  },
] as const

const galleryItems = [
  { kind: "IMAGE" as const, url: "/media/photos/01.webp", alt: "Bovinos em manejo de engorda", caption: "Manejo e engorda no campo", sortOrder: 0 },
  { kind: "IMAGE" as const, url: "/media/photos/02.webp", alt: "Rebanho em pastagem", caption: "Rebanho em pastagem", sortOrder: 1 },
  { kind: "VIDEO" as const, url: "/media/videos/01.mp4", posterUrl: "/media/photos/09.webp", alt: "Vídeo do manejo diário", caption: "Manejo diário do rebanho", sortOrder: 2 },
  { kind: "IMAGE" as const, url: "/media/photos/03.webp", alt: "Instalações de confinamento", caption: "Instalações de confinamento", sortOrder: 3 },
  { kind: "IMAGE" as const, url: "/media/photos/04.webp", alt: "Nutrição e suplementação", caption: "Nutrição e suplementação", sortOrder: 4 },
  { kind: "VIDEO" as const, url: "/media/videos/02.mp4", posterUrl: "/media/photos/10.webp", alt: "Vídeo de nutrição bovina", caption: "Nutrição e cuidados", sortOrder: 5 },
  { kind: "IMAGE" as const, url: "/media/photos/05.webp", alt: "Rebanho em cuidados diários", caption: "Cuidados e bem-estar do rebanho", sortOrder: 6 },
  { kind: "IMAGE" as const, url: "/media/photos/06.webp", alt: "Bovinos em área de descanso", caption: "Área de descanso", sortOrder: 7 },
  { kind: "VIDEO" as const, url: "/media/videos/03.mp4", posterUrl: "/media/photos/11.webp", alt: "Vídeo das instalações", caption: "Visão geral das instalações", sortOrder: 8 },
  { kind: "IMAGE" as const, url: "/media/photos/07.webp", alt: "Acompanhamento veterinário", caption: "Acompanhamento veterinário", sortOrder: 9 },
  { kind: "IMAGE" as const, url: "/media/photos/08.webp", alt: "Gado em engorda intensiva", caption: "Engorda intensiva", sortOrder: 10 },
  { kind: "VIDEO" as const, url: "/media/videos/04.mp4", posterUrl: "/media/photos/12.webp", alt: "Vídeo do dia a dia no campo", caption: "Dia a dia no campo", sortOrder: 11 },
  { kind: "IMAGE" as const, url: "/media/photos/09.webp", alt: "Paisagem da propriedade", caption: "Paisagem da propriedade", sortOrder: 12 },
  { kind: "IMAGE" as const, url: "/media/photos/10.webp", alt: "Bovinos em lote de engorda", caption: "Lote de engorda", sortOrder: 13 },
  { kind: "VIDEO" as const, url: "/media/videos/05.mp4", posterUrl: "/media/photos/13.webp", alt: "Vídeo de sanidade animal", caption: "Sanidade animal", sortOrder: 14 },
  { kind: "IMAGE" as const, url: "/media/photos/11.webp", alt: "Estrutura de manejo", caption: "Estrutura de manejo", sortOrder: 15 },
  { kind: "IMAGE" as const, url: "/media/photos/12.webp", alt: "Bovinos em tratamento", caption: "Tratamento e sanidade", sortOrder: 16 },
  { kind: "VIDEO" as const, url: "/media/videos/06.mp4", posterUrl: "/media/photos/14.webp", alt: "Vídeo de bem-estar animal", caption: "Bem-estar animal", sortOrder: 17 },
  { kind: "IMAGE" as const, url: "/media/photos/13.webp", alt: "Operação no campo", caption: "Operação no campo", sortOrder: 18 },
  { kind: "IMAGE" as const, url: "/media/photos/14.webp", alt: "Resultado de engorda", caption: "Resultado de engorda", sortOrder: 19 },
  { kind: "VIDEO" as const, url: "/media/videos/07.mp4", posterUrl: "/media/photos/01.webp", alt: "Vídeo de engorda", caption: "Processo de engorda", sortOrder: 20 },
  { kind: "VIDEO" as const, url: "/media/videos/08.mp4", posterUrl: "/media/photos/02.webp", alt: "Vídeo de manejo", caption: "Manejo do rebanho", sortOrder: 21 },
  { kind: "VIDEO" as const, url: "/media/videos/09.mp4", posterUrl: "/media/photos/03.webp", alt: "Vídeo de suplementação", caption: "Suplementação bovina", sortOrder: 22 },
  { kind: "VIDEO" as const, url: "/media/videos/10.mp4", posterUrl: "/media/photos/04.webp", alt: "Vídeo de confinamento", caption: "Confinamento", sortOrder: 23 },
  { kind: "VIDEO" as const, url: "/media/videos/11.mp4", posterUrl: "/media/photos/05.webp", alt: "Vídeo de cuidados", caption: "Cuidados com o gado", sortOrder: 24 },
  { kind: "VIDEO" as const, url: "/media/videos/12.mp4", posterUrl: "/media/photos/06.webp", alt: "Vídeo da propriedade", caption: "A propriedade", sortOrder: 25 },
  { kind: "VIDEO" as const, url: "/media/videos/13.mp4", posterUrl: "/media/photos/07.webp", alt: "Vídeo de resultados", caption: "Resultados no campo", sortOrder: 26 },
]

async function main() {
  await prisma.$executeRawUnsafe(`CREATE SCHEMA IF NOT EXISTS "${schema}"`)

  await prisma.siteSettings.upsert({
    where: { id: "default" },
    create: {
      id: "default",
      siteName: "GM Bovinos",
      seoLocality: "Minas Gerais",
      whatsappMessage:
        "Olá! Gostaria de falar sobre compra ou venda de gado (e engorda/manejo, se precisar).",
      defaultOgImageUrl: "/media/photos/02.webp",
      mapsEmbedUrl,
      geoLatitude: "-21.5354594",
      geoLongitude: "-45.4830883",
    },
    update: {},
  })

  for (const section of sections) {
    await prisma.siteSection.upsert({
      where: { key: section.key },
      create: {
        key: section.key,
        title: section.title,
        payload: section.payload,
      },
      update: {
        title: section.title,
        payload: section.payload,
      },
    })
  }

  const existingGallery = await prisma.galleryItem.count()
  if (existingGallery === 0) {
    await prisma.galleryItem.createMany({
      data: galleryItems.map((item) => ({
        kind: item.kind,
        url: item.url,
        storagePath: "",
        posterUrl: "posterUrl" in item ? item.posterUrl : null,
        alt: item.alt,
        caption: item.caption,
        sortOrder: item.sortOrder,
        active: true,
      })),
    })
  }

  console.log("Seed GM Bovinos concluído.")
}

main()
  .catch((error) => {
    console.error(error)
    process.exitCode = 1
  })
  .finally(async () => {
    await prisma.$disconnect()
    await pool.end()
  })
