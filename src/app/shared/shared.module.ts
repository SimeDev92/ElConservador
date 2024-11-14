import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Error404PageComponent } from './pages/error404-page/error404-page.component';
import { FooterComponent } from './footer/footer.component';
import { MaterialModule } from '../material/material.module';
import { LayoutPageComponent } from './layout-page/layout-page.component';
import { PrivacyPolicyPageComponent } from './pages/privacy-policy-page/privacy-policy-page.component';
import { TermsAndConditionsPageComponent } from './pages/terms-and-conditions-page/terms-and-conditions-page.component';
import { CategoryTranslatePipe } from './pipes/category-translate.pipe';
import { PublicarInformacionComponent } from './pages/publicar-informacion/publicar-informacion.component';
import { RequestResetPasswordComponent } from './pages/request-reset-password/request-reset-password.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';

@NgModule({
  declarations: [
    LayoutPageComponent,
    Error404PageComponent,
    FooterComponent,
    PrivacyPolicyPageComponent,
    TermsAndConditionsPageComponent,
    CategoryTranslatePipe,
    PublicarInformacionComponent,
    RequestResetPasswordComponent,
    ResetPasswordComponent,
    EditProfileComponent,
    AboutPageComponent,
    ContactPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  exports: [
    LayoutPageComponent,
    Error404PageComponent,
    FooterComponent,
    CategoryTranslatePipe,
    RequestResetPasswordComponent,
    ResetPasswordComponent,
  ],
})
export class SharedModule {}
