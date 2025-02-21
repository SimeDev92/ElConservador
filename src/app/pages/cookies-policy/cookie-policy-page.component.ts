import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { CookieConsentService } from '../../cookies/cookie-consent.service';

@Component({
  selector: 'app-cookie-policy-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cookie-policy-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CookiePolicyPageComponent implements OnInit {
  private title = inject(Title);
  private meta = inject(Meta);
  private cookieConsentService = inject(CookieConsentService);

  ngOnInit(): void {
    const pageTitle = 'Política de Cookies | El Conservador Noticias';
    const description =
      'Política de Cookies de El Conservador Noticias. Descubre qué cookies utilizamos, su propósito y cómo gestionarlas.';

    this.title.setTitle(pageTitle);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ name: 'og:title', content: pageTitle });
    this.meta.updateTag({ name: 'og:description', content: description });
    this.meta.updateTag({ name: 'og:type', content: 'website' });
    this.meta.updateTag({ name: 'og:url', content: 'https://elconservadornoticias.com/politica-de-cookies' });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary' });
    this.meta.updateTag({ name: 'twitter:title', content: pageTitle });
    this.meta.updateTag({ name: 'twitter:description', content: description });
  }

  revokeConsent(): void {
    this.cookieConsentService.revokeConsent();
    alert('Has revocado el consentimiento. Es posible que necesites recargar la página.');
  }
}
