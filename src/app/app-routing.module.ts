import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';
import { PrivacyPolicyPageComponent } from './shared/pages/privacy-policy-page/privacy-policy-page.component';
import { TermsAndConditionsPageComponent } from './shared/pages/terms-and-conditions-page/terms-and-conditions-page.component';
import { isAuthenticatedGuard } from './auth/guards/is-authenticated.guard';
import { isNotAuthenticatedGuard } from './auth/guards/is-not-authenticated.guard';

// dominio.com/
const routes: Routes = [
  {
    path: 'auth',
    canActivate: [ isNotAuthenticatedGuard ],
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule ),
  },
  {
    path: 'news',
    loadChildren: () => import('./news/news.module').then( m => m.NewsModule ),
  },
  {
    path: 'dashboard',
    canActivate: [ isAuthenticatedGuard ],
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardModule ),
  },
  {
    path: 'donations',
    loadChildren: () => import('./donations/donations.module').then(m => m.DonationsModule)
  },
  {
    path: 'packages',
    loadChildren: () => import('./packages/packages.module').then(m => m.PackagesModule)
  },
  {
    path: 'politica-de-privacidad', // Nueva ruta para la Política de Privacidad
    component: PrivacyPolicyPageComponent,
  },
  {
    path: 'terminos-y-condiciones', // Nueva ruta para Términos y Condiciones
    component: TermsAndConditionsPageComponent,
  },
  {
    path: '404',
    component: Error404PageComponent,
  },
  {
    path: '',
    redirectTo: 'news',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '404',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
