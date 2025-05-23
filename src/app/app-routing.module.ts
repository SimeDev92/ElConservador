import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';
import { PrivacyPolicyPageComponent } from './shared/pages/privacy-policy-page/privacy-policy-page.component';
import { TermsAndConditionsPageComponent } from './shared/pages/terms-and-conditions-page/terms-and-conditions-page.component';
import { isAuthenticatedGuard } from './auth/guards/is-authenticated.guard';
import { isNotAuthenticatedGuard } from './auth/guards/is-not-authenticated.guard';
import { PublicarInformacionComponent } from './shared/pages/publicar-informacion/publicar-informacion.component';
import { RequestResetPasswordComponent } from './shared/pages/request-reset-password/request-reset-password.component';
import { ResetPasswordComponent } from './shared/pages/reset-password/reset-password.component';
import { EditProfileComponent } from './shared/pages/edit-profile/edit-profile.component';
import { AboutPageComponent } from './shared/pages/about-page/about-page.component';
import { ContactPageComponent } from './shared/pages/contact-page/contact-page.component';

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
    path: 'acerca-de',
    component: AboutPageComponent,
  },
  {
    path: 'contacto',
    component: ContactPageComponent,
  },
  {
    path: 'politica-de-privacidad',
    component: PrivacyPolicyPageComponent,
  },
  {
    path: 'terminos-y-condiciones',
    component: TermsAndConditionsPageComponent,
  },
  {
    path: 'publicar-informacion',
    component: PublicarInformacionComponent,
  },
  {
    path: 'subscriptions',
    loadChildren: () => import('./subscription/subscription.module').then(m => m.SubscriptionModule)
  },
  {
    path: 'request-reset-password',
    component: RequestResetPasswordComponent,
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
  },
  {
    path: 'profile/edit',
    component: EditProfileComponent,
    canActivate: [isAuthenticatedGuard]
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
