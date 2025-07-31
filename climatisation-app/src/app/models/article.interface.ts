// Interface pour les caractéristiques d'un produit
export interface Feature {
  title: string;
  description: string;
  icon: string;
}

// Interface pour les articles
export interface Article {
  id: number;
  title: string;
  description: string;
  image: string;
  fullPrice: number;
  discountPercent: number;
  category: 'ventilateur' | 'climatiseur' | 'refroidisseur';
  features: Feature[];
}

// Interface pour l'affichage des articles
export interface ArticleDisplayInfo {
  discountedPrice: number;
  hasDiscount: boolean;
  discountAmount: number;
}
