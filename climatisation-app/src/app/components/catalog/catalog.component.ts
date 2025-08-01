import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';

import { Observable, combineLatest, Subject, of } from 'rxjs';
import { map, startWith, takeUntil, debounceTime, distinctUntilChanged, switchMap, catchError } from 'rxjs/operators';

import { Article } from '../../models/article.interface';
import { ArticleService } from '../../services/article.service';
import { ArticleCardComponent } from '../article-card/article-card.component';

// Composant pour le catalogue avec filtres
@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    ArticleCardComponent
  ],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss'
})
export class CatalogComponent implements OnInit, OnDestroy {
  
  // Formulaire pour les filtres
  filtersForm!: FormGroup;
  
  // Observables pour les données
  articles$!: Observable<Article[]>;
  filteredArticles$!: Observable<Article[]>;
  
  // Variables d'état
  isLoading = true;
  hasActiveFilters = false;
  
  // Subject pour éviter les fuites mémoire
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService
  ) {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.loadArticles();
    this.setupFiltering();
  }

  ngOnDestroy(): void {
    // Nettoyage des subscriptions
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Initialise le formulaire de filtres
  private initializeForm(): void {
    this.filtersForm = this.fb.group({
      search: [''],
      category: [''],
      onlyPromotions: [false]
    });
  }

  // Charge les articles depuis le service
  private loadArticles(): void {
    this.articles$ = this.articleService.getAll();
    
    // Gère l'état de chargement
    this.articles$.subscribe(() => {
      this.isLoading = false;
    });
  }

  // Configure le système de filtrage
  private setupFiltering(): void {
    // Observable des valeurs du formulaire avec délai pour la recherche
    const formValues$ = this.filtersForm.valueChanges.pipe(
      startWith(this.filtersForm.value),
      debounceTime(300), // Évite trop d'appels pendant la saisie
      distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)),
      takeUntil(this.destroy$)
    );

    // Combine les articles et les filtres avec gestion d'erreur
    this.filteredArticles$ = combineLatest([
      this.articles$.pipe(
        catchError(() => of([])), // En cas d'erreur, retourne un tableau vide
        startWith([]) // Commence avec un tableau vide
      ),
      formValues$
    ]).pipe(
      map(([articles, filters]) => {
        // S'assurer que les articles ne sont pas null/undefined
        if (!articles || !Array.isArray(articles)) {
          return [];
        }
        return this.applyFilters(articles, filters);
      }),
      takeUntil(this.destroy$)
    );

    // Suivi des filtres actifs
    formValues$.subscribe(filters => {
      this.hasActiveFilters = this.checkActiveFilters(filters);
    });
  }

  // Applique les filtres aux articles
  private applyFilters(articles: Article[], filters: any): Article[] {
    let filtered = [...articles];

    // Filtre par recherche textuelle
    if (filters.search && filters.search.trim()) {
      const searchTerm = filters.search.toLowerCase().trim();
      filtered = filtered.filter(article => 
        article.title.toLowerCase().includes(searchTerm) ||
        article.description.toLowerCase().includes(searchTerm)
      );
    }

    // Filtre par catégorie
    if (filters.category) {
      filtered = filtered.filter(article => article.category === filters.category);
    }

    // Filtre par promotions
    if (filters.onlyPromotions) {
      filtered = filtered.filter(article => this.articleService.hasDiscount(article));
    }

    return filtered;
  }

  // Vérifie si des filtres sont actifs
  private checkActiveFilters(filters: any): boolean {
    return !!(filters.search?.trim() || filters.category || filters.onlyPromotions);
  }

  // Remet à zéro tous les filtres
  resetFilters(): void {
    this.filtersForm.reset({
      search: '',
      category: '',
      onlyPromotions: false
    });
  }

  // Fonction pour optimiser les performances
  trackByArticleId(index: number, article: Article): number {
    return article.id;
  }
}
