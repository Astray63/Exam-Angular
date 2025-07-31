import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Article } from '../models/article.interface';
import { CartItem, CartState, CartActions } from '../models/cart.interface';
import { ArticleService } from './article.service';

// Service pour gérer le panier
@Injectable({
  providedIn: 'root'
})
export class CartService implements CartActions {
  
  // Variable pour stocker l'état du panier
  private cartState$ = new BehaviorSubject<CartState>({
    items: [],
    totalItems: 0,
    totalPrice: 0
  });

  constructor(private articleService: ArticleService) { }

  // Retourne l'état du panier
  getCartState(): Observable<CartState> {
    return this.cartState$.asObservable();
  }

  // Retourne le nombre total d'articles
  getTotalItems(): Observable<number> {
    return this.cartState$.pipe(
      map(state => state.totalItems)
    );
  }

  // Retourne le prix total
  getTotalPrice(): Observable<number> {
    return this.cartState$.pipe(
      map(state => state.totalPrice)
    );
  }

  // Retourne les articles du panier
  getCartItems(): Observable<CartItem[]> {
    return this.cartState$.pipe(
      map(state => state.items)
    );
  }

  // Implémentation des actions du panier

  // Ajoute un article au panier
  addItem(article: Article): void {
    const currentState = this.cartState$.value;
    const existingItemIndex = currentState.items.findIndex(item => item.article.id === article.id);

    let newItems: CartItem[];
    
    if (existingItemIndex >= 0) {
      // Article déjà dans le panier, on augmente la quantité
      newItems = [...currentState.items];
      newItems[existingItemIndex] = {
        ...newItems[existingItemIndex],
        quantity: newItems[existingItemIndex].quantity + 1
      };
    } else {
      // Nouvel article dans le panier
      newItems = [...currentState.items, { article, quantity: 1 }];
    }

    this.updateCartState(newItems);
  }

  // Supprime un article du panier
  removeItem(articleId: number): void {
    const currentState = this.cartState$.value;
    const newItems = currentState.items.filter(item => item.article.id !== articleId);
    this.updateCartState(newItems);
  }

  // Met à jour la quantité d'un article
  updateQuantity(articleId: number, quantity: number): void {
    if (quantity <= 0) {
      this.removeItem(articleId);
      return;
    }

    const currentState = this.cartState$.value;
    const newItems = currentState.items.map(item => 
      item.article.id === articleId 
        ? { ...item, quantity }
        : item
    );

    this.updateCartState(newItems);
  }

  // Vide le panier
  clearCart(): void {
    this.updateCartState([]);
  }

  // Vérifie si un article est dans le panier
  isInCart(articleId: number): Observable<boolean> {
    return this.cartState$.pipe(
      map(state => state.items.some(item => item.article.id === articleId))
    );
  }

  // Récupère la quantité d'un article dans le panier
  getItemQuantity(articleId: number): Observable<number> {
    return this.cartState$.pipe(
      map(state => {
        const item = state.items.find(item => item.article.id === articleId);
        return item ? item.quantity : 0;
      })
    );
  }

  // Méthodes privées

  // Met à jour l'état du panier et recalcule les totaux
  private updateCartState(items: CartItem[]): void {
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce((sum, item) => {
      const price = this.articleService.getDiscountedPrice(item.article);
      return sum + (price * item.quantity);
    }, 0);

    const newState: CartState = {
      items,
      totalItems,
      totalPrice
    };

    this.cartState$.next(newState);
  }
}
