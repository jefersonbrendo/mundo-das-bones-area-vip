import { DeliverableData } from '../types/deliverable';

export const TEMPLATES: DeliverableData[] = [
  {
    id: 'protocolo-reset-21d',
    title: 'Protocolo Reset Metabólico 21D',
    tagline: 'O método prático para reativar o gasto calórico noturno em 21 dias sem dietas restritivas',
    uniqueMechanism: 'Ciclo Circadiano de Ativação Enzimática & Infusões Bioativas',
    niche: 'saude_fitness',
    productType: 'protocolo_desafio',
    theme: 'emerald_luxury',
    badgeText: 'ÁREA DO MEMBRO VIP • ACESSO VITALÍCIO',
    coverImageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    bannerImageUrl: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1600&q=80',
    author: {
      name: 'Dr. Lucas Sampaio',
      role: 'Especialista em Fisiologia & Nutrição Esportiva',
      bio: 'Mais de 14.800 vidas transformadas através do alinhamento circadiano e rotinas de alta eficiência metabólica.',
      avatarUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
    },
    proofs: [
      {
        id: 'proof-1',
        title: 'Resultado de Mariana R.',
        caption: 'Menos 8.4kg nos primeiros 21 dias seguindo a rotina noturna',
        imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80',
        metric: '-8.4 kg',
      },
      {
        id: 'proof-2',
        title: 'Relato de Carlos E.',
        caption: 'Energia restaurada e sono profundo desde a primeira semana',
        imageUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=600&q=80',
        metric: '100% Disposição',
      },
    ],
    modules: [
      {
        id: 'mod-1',
        title: 'Módulo 1: O Despertar do Mecanismo',
        badge: 'Fase de Limpeza • Dias 1 a 3',
        description: 'Desintoxicação dos receptores e alinhamento do relógio biológico com o tônico matinal.',
        lessons: [
          {
            id: 'les-1-1',
            title: 'Aula de Boas-Vindas & Regras de Ouro',
            duration: '08 min',
            summary: 'Como tirar o máximo proveito do protocolo e o que esperar nas primeiras 72 horas.',
            contentMarkdown: `### Seja muito bem-vindo ao seu novo ponto de virada!

Nesta aula introdutória, você descobrirá como o seu corpo armazena e queima gordura com base nos hormônios noturnos.

#### As 3 Regras Invioláveis do Protocolo:
1. **Janela Hídrica Matinal:** 500ml de água morna com limão e pitada de sal integral ao acordar.
2. **Corte de Luz Azul:** Nenhuma tela após as 22h para disparar o pico natural de melatonina.
3. **Não Pular Etapas:** Siga cada dia na ordem cronológica recomendada.`,
            checklist: [
              'Tirar foto de "Antes" e anotar peso inicial na ficha de acompanhamento',
              'Comprar os ingredientes da lista de compras da Semana 1',
              'Configurar o alarme para o ritual matinal às 07:00',
            ],
            calloutBox: {
              type: 'secret',
              title: 'Segredo de Ouro',
              text: 'O tônico matinal não serve apenas para hidratação: ele ativa a enzima lipase sensível a hormônios logo nos primeiros minutos do dia.',
            },
          },
          {
            id: 'les-1-2',
            title: 'O Tônico Ativador Matinal: Receita & Horário Exato',
            duration: '06 min',
            summary: 'A fórmula exata dos 4 ingredientes que você encontra no mercado da sua esquina.',
            contentMarkdown: `Aqui está a formulação oficial do **Tônico Termogênico Matinal**:

- 300ml de água morna (38°C a 40°C)
- Suco de meio limão taiti ou siciliano
- 1g de gengibre fresco ralado ou em pó
- 1 pitada minúscula de canela do Ceilão

Consuma em jejum, 20 minutos antes do seu primeiro café da manhã.`,
            checklist: [
              'Preparar e tomar o tônico matinal nos dias 1 a 3',
              'Anotar nível de disposição na escala de 1 a 10',
            ],
          },
        ],
      },
      {
        id: 'mod-2',
        title: 'Módulo 2: O Ciclo das 21 Noites',
        badge: 'Queima Noturna • Dias 4 a 14',
        description: 'Configuração do jantar bioativo e o chá relaxante indutor de queima profunda.',
        lessons: [
          {
            id: 'les-2-1',
            title: 'Cardápio Noturno Desinflamante',
            duration: '12 min',
            summary: 'Como montar o prato da noite sem passar fome e sem acumular triglicerídeos durante o sono.',
            contentMarkdown: `### A Estrutura do Prato Noturno
Para induzir queima enquanto dorme, a insulina deve permanecer baixa durante as 8 horas de repouso.

- **50% do prato:** Vegetais verdes escuros cozidos no vapor (brócolis, espinafre, abobrinha).
- **30% do prato:** Proteína magra leve (peito de frango grelhado, peixe branco ou ovos caipiras).
- **20% do prato:** Gordura saudável estabilizadora (azeite de oliva extravirgem ou 1/4 de abacate).`,
            checklist: [
              'Jantar pelo menos 2h30 antes de ir para a cama',
              'Evitar carboidratos refinados no período noturno',
            ],
          },
        ],
      },
      {
        id: 'mod-3',
        title: 'Módulo 3: Consolidação & Efeito Rebote Zero',
        badge: 'Manutenção Vitalícia • Dias 15 a 21',
        description: 'Estratégias sociais, fins de semana sem culpa e ancoragem de resultados.',
        lessons: [
          {
            id: 'les-3-1',
            title: 'O Protocolo dos Fins de Semana Livres',
            duration: '10 min',
            summary: 'Como ir a festas, churrascos e restaurantes sem perder 1 grama do seu resultado.',
            contentMarkdown: `Aprenda a técnica da **Compensação Prévia e Pós-Refeição Livre**:
1. Antes do evento: Consuma uma salada crua rica em fibras.
2. Durante: Aproveite sem culpa a sua comida favorita.
3. No dia seguinte: Retorne imediatamente ao ritual matinal habitual.`,
          },
        ],
      },
    ],
    bonuses: [
      {
        id: 'bonus-1',
        title: 'Guia de Shots de Emergência Antibarriga',
        tag: 'BÔNUS #1 • VALOR R$ 97 (GRÁTIS)',
        description: '3 receitas para desinchar até 3cm de cintura antes de festas ou eventos especiais.',
        coverImageUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=400&q=80',
      },
      {
        id: 'bonus-2',
        title: 'Áudio Guia: Indução do Sono Profundo Theta',
        tag: 'BÔNUS #2 • VALOR R$ 147 (GRÁTIS)',
        description: 'Frequência sonora binaural para relaxamento muscular e reprogramação mental noturna.',
        coverImageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80',
      },
    ],
    upsell: {
      enabled: true,
      badge: 'OFERTA EXCLUSIVA DE ACELERAÇÃO (SÓ NESTA PÁGINA)',
      headline: 'Deseja Triplicar a Velocidade dos Seus Resultados?',
      subheadline: 'Adquira o Acelerador VIP com Cardápios Prontos para os 365 Dias do Ano e Acompanhamento Semanal com nossa Nutricionista.',
      regularPrice: 'R$ 497,00',
      offerPrice: 'R$ 97,00 (ou 12x R$ 9,74)',
      benefits: [
        '52 Semanas de Cardápios Prontos com Lista de Compras Econômica',
        'Acesso ao Grupo Privado de Alunas no WhatsApp com Dúvidas Respondidas',
        'Calculadora Automática de Porções e Substituições de Alimentos',
        'Acesso prioritário a todas as atualizações do Dr. Lucas',
      ],
      ctaText: 'SIM! QUERO ACELERAR MEUS RESULTADOS AGORA',
      ctaLink: '#',
    },
    support: {
      whatsappNumber: '5511999999999',
      whatsappMessage: 'Olá! Sou aluna do Protocolo 21D e preciso de ajuda.',
      supportEmail: 'suporte@protocolo21d.com.br',
      communityName: 'Comunidade Exclusiva de Guerreiras VIP',
      communityLink: '#',
    },
    certificate: {
      enabled: true,
      hours: '30 Horas',
    },
  },
  {
    id: 'arsenal-copys-dr',
    title: 'Arsenal dos Criativos & Copys Milionários',
    tagline: 'O cofre secreto com mais de 127 scripts validados em mais de R$ 8 dígitos de faturamento em Direct Response',
    uniqueMechanism: 'Método Hook-Retain-Reward & Gatilhos de Contraste Extremo',
    niche: 'marketing_vendas',
    productType: 'swipe_file_copys',
    theme: 'gold_dark',
    badgeText: 'ARQUIVO CONFIDENCIAL DE DIRECT RESPONSE • USO RESTRITO',
    coverImageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    bannerImageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=80',
    author: {
      name: 'Gabriel Martins',
      role: 'Copywriter Direto & Estrategista de Ofertas',
      bio: 'Criador de campanhas que geraram mais de 25 milhões de reais em tráfego pago na Meta, TikTok e YouTube.',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    },
    proofs: [
      {
        id: 'proof-copy-1',
        title: 'Campanha de Junho',
        caption: 'ROAS 4.8x aplicando o Hook de Curiosidade Invertida',
        imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
        metric: 'ROAS 4.8x',
      },
    ],
    modules: [
      {
        id: 'mod-copy-1',
        title: 'Módulo 1: Hooks Hipnóticos para os Primeiros 3 Segundos',
        badge: 'Retenção Alta',
        description: 'Os ganchos exatos para parar o scroll do lead frio no feed e Reels.',
        lessons: [
          {
            id: 'les-c1',
            title: 'Os 10 Hooks de Quebra de Padrão Mais Lucrativos',
            duration: '15 min',
            summary: 'Como criar uma abertura magnética que faz o lead querer assistir até o final.',
            contentMarkdown: `### Como Funciona a Quebra de Padrão
O lead assiste a centenas de anúncios iguais por dia. Você precisa dizer algo que vá contra o senso comum nos primeiros 2.5 segundos.`,
            checklist: [
              'Escolher 3 hooks para o teste A/B do próximo criativo',
              'Gravar abertura com corte rápido e expressão enfática',
            ],
            copySnippets: [
              {
                id: 'c-1',
                title: 'Hook do Erro Comum',
                tag: 'Reels / TikTok',
                content: '"Pare de [fazer o que todo mundo faz] agora mesmo se você não quiser [consequência indesejada grave]. Aqui está a verdadeira razão pela qual..."',
              },
              {
                id: 'c-2',
                title: 'Hook do Segredo Proibido',
                tag: 'Anúncio Feed',
                content: '"Eles não querem que você descubra isso, mas este pequeno detalhe que você ignora todos os dias é o verdadeiro culpado de..."',
              },
            ],
          },
        ],
      },
    ],
    bonuses: [
      {
        id: 'bonus-c1',
        title: 'Planilha de Métricas de Escala & CPA Máximo',
        tag: 'BÔNUS EXCLUSIVO',
        description: 'Calcule o ROI exato e saiba quando aumentar o orçamento com segurança.',
        coverImageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=400&q=80',
      },
    ],
    upsell: {
      enabled: true,
      badge: 'BLACK BOX DE ESCALA',
      headline: 'Acesso à Nossa Central de Análise de Criativos por IA',
      subheadline: 'Envie sua copy ou vídeo e receba uma nota de conversão imediata com sugestões de melhoria linha por linha.',
      regularPrice: 'R$ 997,00',
      offerPrice: 'R$ 197,00',
      benefits: [
        'Análises Ilimitadas de Vídeos e Landing Pages',
        'Score de Retenção com Previsão de CPA',
        'Banco semanal de criativos dos EUA traduzidos e dissecados',
      ],
      ctaText: 'DESBLOQUEAR O COFRE BLACK BOX',
      ctaLink: '#',
    },
    support: {
      whatsappNumber: '5511988887777',
      whatsappMessage: 'Olá! Sou membro do Arsenal de Copys e quero tirar uma dúvida.',
      supportEmail: 'contato@arsenalcopys.com',
      communityName: 'Mastermind dos Copys de 8 Dígitos',
      communityLink: '#',
    },
    certificate: {
      enabled: true,
      hours: '20 Horas',
    },
  },
];
