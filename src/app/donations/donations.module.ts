import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DonationsComponent } from './donations.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { SuccessComponent } from '../success/success.component';
import { CancelComponent } from '../cancel/cancel.component';
import { ManageComponent } from './manage/manage.component';

@NgModule({
  declarations: [
    DonationsComponent,
    SuccessComponent,
    CancelComponent,
    ManageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: DonationsComponent
      },
      {
        path: 'success',
        component: SuccessComponent
      },
      {
        path: 'cancel',
        component: CancelComponent
      },
      {
        path: 'manage',  // Nueva ruta para la gestión de colaboraciones
        component: ManageComponent
      }
    ]),
    MaterialModule,
  ]
})
export class DonationsModule { }
