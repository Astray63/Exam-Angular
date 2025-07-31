import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from '../models/article.interface';

// Service pour gérer les articles
@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor() { }

  // Méthode qui retourne les articles après 2 secondes
  getAll(): Observable<Article[]> {
    return new Observable(observer => {
      setTimeout(() => {
        observer.next([
          {
            id: 1,
            title: "Ventilateur de Plafond Premium",
            description: "Ventilateur silencieux avec télécommande et éclairage LED",
            image: "https://images.unsplash.com/photo-1565184099246-7c2dfcbf5811?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            fullPrice: 299.99,
            discountPercent: 0.15,
            category: "ventilateur",
            features: [
              { title: "Silencieux", description: "Moteur ultra-silencieux", icon: "volume_off" },
              { title: "Télécommande", description: "Contrôle à distance", icon: "settings_remote" },
              { title: "LED", description: "Éclairage intégré", icon: "lightbulb" }
            ]
          },
          {
            id: 2,
            title: "Climatiseur Mobile 12000 BTU",
            description: "Climatiseur mobile pour pièces jusqu'à 40m²",
            image: "https://images.kkeu.de/is/image/BEG/Climatiseurs/Appareils_de_climatisation/Climatiseur_mobile_12000_BTU_pdplarge-mrd--762232_AFS_00_00_00_19918745.jpg",
            fullPrice: 599.99,
            discountPercent: 0,
            category: "climatiseur",
            features: [
              { title: "Mobile", description: "Facile à déplacer", icon: "directions_walk" },
              { title: "Économique", description: "Classe énergétique A+", icon: "eco" }
            ]
          },
          {
            id: 3,
            title: "Ventilateur Tour Oscillant",
            description: "Ventilateur colonne avec oscillation 90°",
            image: "https://cdn.shopify.com/s/files/1/2660/5202/products/1_d2f798f9-3f42-445c-96da-29f0fb2f8669_800x.jpeg?v=1616685503",
            fullPrice: 159.99,
            discountPercent: 0.25,
            category: "ventilateur",
            features: [
              { title: "Oscillant", description: "Rotation 90°", icon: "refresh" },
              { title: "Minuterie", description: "Arrêt programmé", icon: "schedule" }
            ]
          },
          {
            id: 4,
            title: "Climatiseur Split 18000 BTU",
            description: "Climatiseur fixe haute performance",
            image: "http://cais.com.tn/wp-content/uploads/2023/06/520273903001.jpg",
            fullPrice: 899.99,
            discountPercent: 0.10,
            category: "climatiseur",
            features: [
              { title: "Haute Performance", description: "Refroidissement rapide", icon: "flash_on" },
              { title: "Wifi", description: "Contrôle par application", icon: "wifi" }
            ]
          },
          {
            id: 5,
            title: "Ventilateur USB LOWRIOT 3000",
            description: "Ventilateur supersonique de MR. L",
            fullPrice: 29.99,
            image: "https://www.cdiscount.com/pdt2/4/6/6/1/700x700/1236231779856466/rw/mini-ventilateur-usb-portable-rechargeable-3-modes.jpg",
            discountPercent: 0,
            category: "ventilateur",
            features: [
              { title: "Portable", description: "Compact et léger", icon: "luggage" },
              { title: "USB", description: "Alimentation USB", icon: "usb" }
            ]
          },
          {
            id: 6,
            title: "Refroidisseur d'Air Évaporatif",
            description: "Refroidisseur d'air par évaporation naturelle",
            image: "https://media.carrefour.fr/medias/460293780d4c3dd1b2fbe0ff8248b87d/p_1500x1500/2c941b619c4e4206ad748f9f9b0b2411-image.jpg",
            fullPrice: 199.99,
            discountPercent: 0.20,
            category: "refroidisseur",
            features: [
              { title: "Écologique", description: "Refroidissement naturel", icon: "nature" },
              { title: "Humidificateur", description: "Ajoute de l'humidité", icon: "water_drop" }
            ]
          },
          {
            id: 8,
            title: "Ventilateur Industriel 75cm",
            description: "Ventilateur haute performance pour espaces industriels",
            image: "https://cdn.manomano.com/images/images_products/23211379/P/58688454_1.jpg",
            fullPrice: 449.99,
            discountPercent: 0.30,
            category: "ventilateur",
            features: [
              { title: "Industriel", description: "Usage intensif", icon: "factory" },
              { title: "Puissant", description: "Débit d'air élevé", icon: "air" },
              { title: "Robuste", description: "Construction métallique", icon: "shield" }
            ]
          },
          {
            id: 10,
            title: "Ventilateur Mural Oscillant",
            description: "Ventilateur mural avec télécommande et 3 vitesses",
            image: "https://media.adeo.com/marketplace/MKP/84254283/a3b5556debbd7b11a66f5289121f5039.jpeg",
            fullPrice: 89.99,
            discountPercent: 0.18,
            category: "ventilateur",
            features: [
              { title: "Mural", description: "Gain de place", icon: "vertical_align_top" },
              { title: "3 vitesses", description: "Réglage précis", icon: "speed" },
              { title: "Oscillant", description: "Rotation automatique", icon: "rotate_right" }
            ]
          }
        ]);
        observer.complete();
      }, 2000);
    });
  }

  // Méthodes utiles pour l'affichage
  
  // Calcule le prix avec la réduction
  getDiscountedPrice(article: Article): number {
    return article.fullPrice * (1 - article.discountPercent);
  }

  // Vérifie si l'article a une promotion
  hasDiscount(article: Article): boolean {
    return article.discountPercent > 0;
  }

  // Calcule le montant de la réduction
  getDiscountAmount(article: Article): number {
    return article.fullPrice * article.discountPercent;
  }

  // Récupère le pourcentage de réduction
  getDiscountPercentage(article: Article): number {
    return Math.round(article.discountPercent * 100);
  }
}
