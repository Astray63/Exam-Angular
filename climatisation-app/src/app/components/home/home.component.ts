import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Article } from '../../models/article.interface';
import { ArticleService } from '../../services/article.service';
import { ArticleCardComponent } from '../article-card/article-card.component';

// Composant de la page d'accueil
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
    ArticleCardComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  
  promotionalArticles$!: Observable<Article[]>;
  isLoading = true;

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    // Récupère les articles en promotion
    this.promotionalArticles$ = this.articleService.getAll().pipe(
      map(articles => articles.filter(article => this.articleService.hasDiscount(article)))
    );

    // Simule le temps de chargement de 2 secondes
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }

  // Fonction pour optimiser les performances
  trackByArticleId(index: number, article: Article): number {
    return article.id;
  }
}
