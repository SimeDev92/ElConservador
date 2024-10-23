import { NgModule } from '@angular/core';
import { Error404PageComponent } from './pages/error404-page/error404-page.component';
import { FooterComponent } from './footer/footer.component';
import { MaterialModule } from '../material/material.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutPageComponent } from './layout-page/layout-page.component';
import { PrivacyPolicyPageComponent } from './pages/privacy-policy-page/privacy-policy-page.component';
import { TermsAndConditionsPageComponent } from './pages/terms-and-conditions-page/terms-and-conditions-page.component';



@NgModule({
  declarations: [
    LayoutPageComponent,
    Error404PageComponent,
    FooterComponent,
    PrivacyPolicyPageComponent,
    TermsAndConditionsPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,

  ],
  exports: [
    LayoutPageComponent,
    Error404PageComponent,
    FooterComponent
  ]
})
export class SharedModule { }
