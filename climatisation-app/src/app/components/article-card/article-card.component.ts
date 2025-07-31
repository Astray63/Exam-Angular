import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';
import { Observable } from 'rxjs';

import { Article } from '../../models/article.interface';
import { ArticleService } from '../../services/article.service';
import { CartService } from '../../services/cart.service';

// Composant pour afficher une carte d'article
@Component({
  selector: 'app-article-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatBadgeModule
  ],
  templateUrl: './article-card.component.html',
  styleUrl: './article-card.component.scss'
})
export class ArticleCardComponent implements OnInit {
  
  // Propriétés reçues du composant parent
  @Input() article!: Article;
  @Input() showPromoBadge: boolean = true;

  // Variables du composant
  showDetails = false;
  isAddingToCart = false;

  // Propriétés calculées
  hasDiscount!: boolean;
  discountedPrice!: number;
  discountPercentage!: number;

  // Observable
  isInCart$!: Observable<boolean>;

  constructor(
    private articleService: ArticleService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    // Calcul des propriétés d'affichage
    this.hasDiscount = this.articleService.hasDiscount(this.article);
    this.discountedPrice = this.articleService.getDiscountedPrice(this.article);
    this.discountPercentage = this.articleService.getDiscountPercentage(this.article);

    // Vérifier si l'article est dans le panier
    this.isInCart$ = this.cartService.isInCart(this.article.id);
  }

  // Ajoute l'article au panier
  addToCart(): void {
    this.isAddingToCart = true;
    
    // Petit délai pour l'animation
    setTimeout(() => {
      this.cartService.addItem(this.article);
      this.isAddingToCart = false;
    }, 300);
  }

  // Affiche ou cache les détails
  toggleDetails(): void {
    this.showDetails = !this.showDetails;
  }

  // Gère les erreurs d'image
  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/images/placeholder-product.jpg';
  }

  // Fonction pour optimiser les performances
  trackByFeature(index: number, feature: any): string {
    return feature.title;
  }
}
