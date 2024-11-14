import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { environments } from '../../../../environments/environments';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.css']
})
export class ContactPageComponent implements OnInit {
  contactData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  facebookUrl = environments.facebookUrl;
  twitterUrl = environments.twitterUrl;
  telegramUrl = environments.telegramUrl;

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.matIconRegistry.addSvgIcon(
      'x-twitter',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/x-twitter.svg')
    );
  }

  onSubmit() {
    // Implementa aquí la lógica de envío del formulario
    console.log('Formulario enviado', this.contactData);
    // Resetear el formulario después de enviar
    this.contactData = {
      name: '',
      email: '',
      subject: '',
      message: ''
    };
  }
}
