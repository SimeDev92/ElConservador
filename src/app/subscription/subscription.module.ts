import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Para `routerLink`
import { FormsModule } from '@angular/forms'; // Si utilizas formularios

// Importa componentes y servicios relacionados con el módulo de suscripciones
import { SubscriptionManagementComponent } from './components/subscription-management/subscription-management.component';
import { SubscriptionRoutingModule } from './subscription-routing.module'; // Asegúrate de tener el archivo de enrutamiento
import { MaterialModule } from '../material/material.module'; // Si estás usando Material

@NgModule({
  declarations: [
    SubscriptionManagementComponent // Declara aquí tu componente
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    SubscriptionRoutingModule,
    MaterialModule // Importa MaterialModule si estás usando Angular Material
  ]
})
export class SubscriptionModule { }
