export type DeliverableNiche =
  | 'saude_fitness'
  | 'marketing_vendas'
  | 'financas_renda'
  | 'relacionamento_desenvolvimento'
  | 'personalizado';

export type DeliverableType =
  | 'area_membros'
  | 'guia_interativo'
  | 'protocolo_desafio'
  | 'swipe_file_copys';

export type ThemeStyle =
  | 'gold_dark'
  | 'crimson_dark'
  | 'emerald_luxury'
  | 'royal_blue'
  | 'clean_dark';

export interface AuthorInfo {
  name: string;
  role: string;
  bio: string;
  avatarUrl?: string;
  driveFileId?: string;
}

export interface ProofItem {
  id: string;
  title: string;
  caption: string;
  imageUrl: string;
  driveFileId?: string;
  metric?: string; // ex: "+R$ 48.920" ou "-14kg em 30 dias"
}

export interface CopySnippet {
  id: string;
  title: string;
  description?: string;
  content: string;
  tag?: string; // ex: "Headline VSL", "Email de Carrinho", "Hook TikTok"
}

export interface LessonItem {
  id: string;
  title: string;
  duration?: string;
  summary: string;
  contentMarkdown: string;
  imageUrl?: string;
  driveFileId?: string;
  videoEmbedUrl?: string;
  checklist?: string[];
  calloutBox?: {
    type: 'secret' | 'action_step' | 'warning' | 'tip';
    title: string;
    text: string;
  };
  copySnippets?: CopySnippet[];
  resources?: Array<{
    name: string;
    type: 'pdf' | 'doc' | 'sheet' | 'link';
    url: string;
  }>;
}

export interface ModuleItem {
  id: string;
  title: string;
  badge?: string; // ex: "Fase 1", "Mecanismo Único", "Acelerador"
  description: string;
  coverImageUrl?: string;
  driveFileId?: string;
  lessons: LessonItem[];
}

export interface BonusItem {
  id: string;
  title: string;
  tag: string; // ex: "BÔNUS #1 - VALOR R$ 297"
  description: string;
  coverImageUrl?: string;
  driveFileId?: string;
  downloadUrl?: string;
}

export interface UpsellOffer {
  enabled: boolean;
  badge: string; // "UPGRADE EXCLUSIVO PARA ALUNOS"
  headline: string;
  subheadline: string;
  regularPrice: string;
  offerPrice: string;
  benefits: string[];
  ctaText: string;
  ctaLink: string;
  imageUrl?: string;
  driveFileId?: string;
}

export interface SupportInfo {
  whatsappNumber?: string;
  whatsappMessage?: string;
  supportEmail?: string;
  communityLink?: string;
  communityName?: string;
}

export interface DeliverableData {
  id: string;
  title: string;
  tagline: string;
  uniqueMechanism: string; // Direct response concept: Big Idea / Mecanismo Único
  niche: DeliverableNiche;
  productType: DeliverableType;
  theme: ThemeStyle;
  badgeText: string;
  coverImageUrl?: string;
  coverDriveFileId?: string;
  bannerImageUrl?: string;
  bannerDriveFileId?: string;
  author: AuthorInfo;
  proofs: ProofItem[];
  modules: ModuleItem[];
  bonuses: BonusItem[];
  upsell: UpsellOffer;
  support: SupportInfo;
  certificate: {
    enabled: boolean;
    hours: string;
  };
}
