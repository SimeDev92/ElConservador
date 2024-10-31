import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubscriptionManagementComponent } from './components/subscription-management/subscription-management.component';

const routes: Routes = [
  {
    path: 'manage', // La ruta que llevará a la gestión de suscripciones
    component: SubscriptionManagementComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubscriptionRoutingModule { }
