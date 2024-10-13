import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PackagesPageComponent } from './pages/packages-page/packages-page.component';
import { PackagesCancelComponent } from './packages-cancel/packages-cancel.component';
import { PackagesSuccessComponent } from './packages-success/packages-success.component';

const routes: Routes = [
  { path: '', component: PackagesPageComponent },
  { path: 'success', component: PackagesSuccessComponent },
  { path: 'cancel', component: PackagesCancelComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PackagesRoutingModule { }
