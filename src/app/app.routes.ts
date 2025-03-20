import { Routes } from '@angular/router';
import { ArticleCategory } from './articles/interfaces';

export const routes: Routes = [
  {
    path: 'sitemap.xml',
    loadComponent: () => import('./pages/empty/empty.component'),
    pathMatch: 'full',
  },
  {
    path: 'news-sitemap.xml',
    loadComponent: () => import('./pages/empty/empty.component'),
    pathMatch: 'full',
  },
  {
    path: 'sobre-nosotros',
    loadComponent: () => import('./pages/about/about-page.component'),
  },
  {
    path: 'politica-de-privacidad',
    loadComponent: () => import('./pages/privacy-policy/privacy-policy-page.component'),
  },
  {
    path: 'politica-de-cookies',
    loadComponent: () => import('./pages/cookies-policy/cookie-policy-page.component'),
  },
  {
    path: 'contacto',
    loadComponent: () => import('./pages/contact/contact-page.component'),
  },
  {
    path: 'noticias',
    redirectTo: 'noticias/pagina/1',
    pathMatch: 'full',
  },
  {
    path: 'noticias/buscar',
    loadComponent: () => import('./pages/article-search/article-search.component'),
  },
  {
    path: 'noticias/pagina/:pagina',
    loadComponent: () => import('./pages/articles/articles-page.component'),
  },
  {
    path: 'noticias/:slug',
    loadComponent: () => import('./pages/article/article-page.component'),
  },
  {
    path: 'noticias/:category',
    loadComponent: () => import('./pages/articles/articles-category-page.component'),
    data: { category: Object.values(ArticleCategory) },
  },
  {
    path: 'noticias/:category/pagina/:pagina',
    loadComponent: () => import('./pages/articles/articles-category-page.component'),
    data: { category: Object.values(ArticleCategory) },
  },
  {
    path: '**',
    redirectTo: 'noticias/pagina/1',
  },
];
