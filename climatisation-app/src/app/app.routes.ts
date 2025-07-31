import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CatalogComponent } from './components/catalog/catalog.component';

// Configuration des routes
export const routes: Routes = [
  { 
    path: '', 
    component: HomeComponent,
    title: 'Accueil - Climatisation Pro'
  },
  { 
    path: 'catalog', 
    component: CatalogComponent,
    title: 'Catalogue - Climatisation Pro'
  },
  { 
    path: '**', 
    redirectTo: '' 
  }
];
