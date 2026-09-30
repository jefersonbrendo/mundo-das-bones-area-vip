export type KitCategory =
  | 'todos'
  | 'bonequinhas'
  | 'barbies'
  | 'princesas'
  | 'pets'
  | 'acessorios'
  | 'bonecas_prontas'
  | 'realistas'
  | 'guia';

export interface PrintableKit {
  id: string;
  title: string;
  category: KitCategory;
  categoryLabel: string;
  description: string;
  coverImageUrl: string;
  driveFileId?: string;
  pdfDownloadUrl?: string;
  pageCount: number;
  piecesCount?: string; // ex: "Mais de 250 peças"
  recommendedPaper?: string; // ex: "Papel Offset ou Fotográfico 180g"
  previewImages?: string[];
  isNew?: boolean;
  isPopular?: boolean;
  isVipBonus?: boolean;
  ageRange?: string; // ex: "3 a 12 anos"
  printTips?: string[];
}

export interface PortalConfig {
  portalName: string;
  tagline: string;
  welcomeMessage: string;
  logoUrl?: string;
  supportWhatsapp?: string;
  supportEmail?: string;
  vipClubOffer?: {
    enabled: boolean;
    title: string;
    description: string;
    price: string;
    ctaText: string;
    ctaLink: string;
  };
  themePreset: 'warm_studio' | 'vibrant_creative' | 'dark_craft' | 'pastel_dream';
}
