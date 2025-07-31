import { Article } from './article.interface';

// Interface pour un élément du panier
export interface CartItem {
  article: Article;
  quantity: number;
}

// Interface pour l'état du panier
export interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

// Interface pour les actions du panier
export interface CartActions {
  addItem(article: Article): void;
  removeItem(articleId: number): void;
  updateQuantity(articleId: number, quantity: number): void;
  clearCart(): void;
}
