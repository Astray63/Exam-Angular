import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { Observable } from 'rxjs';

import { CartService } from '../../services/cart.service';
import { CartState, CartItem } from '../../models/cart.interface';
import { ArticleService } from '../../services/article.service';

// Composant de navigation
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    MatMenuModule,
    MatDividerModule,
    MatListModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  
  // Observable pour l'état du panier
  cartState$!: Observable<CartState>;

  constructor(
    private cartService: CartService,
    private articleService: ArticleService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Récupère l'état du panier
    this.cartState$ = this.cartService.getCartState();
  }

  // Supprime un article du panier
  removeFromCart(articleId: number): void {
    this.cartService.removeItem(articleId);
  }

  // Vide le panier
  clearCart(): void {
    this.cartService.clearCart();
  }

  // Ferme le menu du panier
  closeCartMenu(): void {
    // Le routerLink se charge de la navigation
  }

  // Calcule le prix d'un article dans le panier
  getItemPrice(item: CartItem): number {
    return this.articleService.getDiscountedPrice(item.article) * item.quantity;
  }

  // Fonction pour optimiser les performances
  trackByCartItem(index: number, item: CartItem): number {
    return item.article.id;
  }
}
