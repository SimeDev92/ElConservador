import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { isNotAuthenticatedGuard } from './guards/is-not-authenticated.guard';

// localhost:4200/auth/
const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent,
    canActivate: [isNotAuthenticatedGuard],
  },
  {
    path: 'register',
    component: RegisterPageComponent,
  },
  {
    path: '**',
    redirectTo: 'login',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
