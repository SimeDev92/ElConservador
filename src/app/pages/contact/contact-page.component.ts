import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'page-contact',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './contact-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ContactPageComponent implements OnInit {
  isDropdownOpen = false;
  private title = inject(Title);
  private meta = inject(Meta);

  contactData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  facebookUrl = 'https://www.facebook.com/people/El-Conservador-Noticias/61571265990971/';
  twitterUrl = 'https://x.com/Conservador24h';
  telegramUrl = 'https://t.me/ElConservadorNoticias';

  ngOnInit(): void {
    const pageTitle = 'Contacto | El Conservador Noticias';
    const pageDescription = 'Ponte en contacto con El Conservador Noticias. Envíanos tus comentarios, sugerencias o consultas a través de nuestro formulario de contacto o redes sociales.';

    this.title.setTitle(pageTitle);
    this.meta.updateTag({ name: 'description', content: pageDescription });
    this.meta.updateTag({ property: 'og:title', content: pageTitle });
    this.meta.updateTag({ property: 'og:description', content: pageDescription });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:url', content: 'https://elconservadornoticias.es/contacto' });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary' });
    this.meta.updateTag({ name: 'twitter:title', content: pageTitle });
    this.meta.updateTag({ name: 'twitter:description', content: pageDescription });
    this.meta.updateTag({ name: 'keywords', content: 'contacto, El Conservador Noticias, formulario de contacto, redes sociales, consultas, sugerencias' });
  }

  onSubmit() {
  }
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}
