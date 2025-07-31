# LASSERRE ELIJAH

# App de Climatisation - Angular

## Description

Application web pour vendre des équipements de climatisation et ventilation.

## Organisation du code

### Structure des fichiers

**Interfaces** (`models/`)
- `Article` : structure des produits
- `Cart` : gestion du panier
- Les interfaces m'ont évité pas mal d'erreurs de typage

**Services** (`services/`)
- `ArticleService` : récupère les produits (délai 2s obligatoire)
- `CartService` : gère le panier avec Observables

**Composants** (`components/`)
- `HomeComponent` : page d'accueil avec promotions
- `CatalogComponent` : catalogue avec filtres
- `ArticleCardComponent` : carte produit réutilisable
- `NavbarComponent` : navigation avec compteur panier

## Difficultés principales rencontrées

### 1. Observables et RxJS
**Problème :** Concept complètement nouveau
**Solution :** 
- `BehaviorSubject` pour le panier (garde la dernière valeur)
- `combineLatest` pour mixer articles et filtres
- `async` pipe dans les templates

### 2. Formulaires réactifs
**Problème :** Je ne connaissais que les template forms
**Solution :**
- `FormBuilder` pour les filtres
- `debounceTime(300)` pour éviter le spam de filtrage
- `valueChanges` pour écouter les modifications

### 3. Communication entre composants
**Problème :** Partage de données entre composants
**Solution :**
- `@Input()` pour passer des données parent vers enfant
- Services injectés pour données globales (panier)

### 4. Gestion du panier
**Problème :** Calculs de totaux et gestion des quantités
**Solution :**
- Méthode `updateCartState()` qui recalcule tout
- `reduce()` pour les totaux
- Gestion des prix avec réductions

### 5. Filtres du catalogue
**Problème :** Filtrage multiple simultané (nom + catégorie + promotions)
**Solution :**
- `combineLatest` pour mixer articles et filtres
- Méthode `applyFilters()` séquentielle
- `distinctUntilChanged` pour optimiser

## Fonctionnalités

- Page d'accueil avec promotions
- Catalogue avec filtres (recherche, catégorie, promotions)
- Panier fonctionnel (ajout, suppression, total)
- Navigation entre pages
- Badges de réduction
- Prix barrés pour les promotions
- Indicateur de chargement (2 secondes)

## Technologies

- **Angular 20** : framework principal
- **Angular Material** : composants UI
- **RxJS** : Observables
- **TypeScript** : typage strict
- **SCSS** : styles

## Installation

```bash
cd climatisation-app
npm install
ng serve
```

Application disponible sur `http://localhost:4200`

## Erreurs corrigées

**Observable qui ne se met pas à jour**
Utilisé `BehaviorSubject` au lieu de `Subject`

**Fuites mémoire**
Ajouté `takeUntil(destroy$)` et `ngOnDestroy`

**Filtres qui buggent**
Copie du tableau avec `[...articles]` avant filtrage

**Calculs de réduction incorrects**
Méthodes dédiées dans le service

## Apprentissages

- Observables : puissant mais complexe
- Interfaces TypeScript : évitent les erreurs
- Angular Material : gain de temps
- Nettoyage des subscriptions obligatoire
- Services : idéal pour données partagées
