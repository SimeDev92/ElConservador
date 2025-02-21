import { ChangeDetectionStrategy, Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { CookieConsentService } from '../../cookies/cookie-consent.service';


@Component({
  selector: 'privacy-policy',
  standalone: true,
  imports: [
  ],
  templateUrl: './privacy-policy-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PrivacyPolicyPageComponent implements OnInit {
  private title = inject(Title)
  private meta = inject(Meta)
  private cookieConsentService = inject(CookieConsentService);

  ngOnInit(): void {
    const pageTitle = 'Política de Privacidad | El Conservador';
    const pageDescription = 'Lea nuestra política de privacidad para entender cómo El Conservador recopila, usa y protege su información personal.';

    this.title.setTitle(pageTitle);
    this.meta.updateTag({ name: 'description', content: pageDescription });
    this.meta.updateTag({ property: 'og:title', content: pageTitle });
    this.meta.updateTag({ property: 'og:description', content: pageDescription });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:url', content: 'https://elconservador.es/politica-de-privacidad' });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary' });
    this.meta.updateTag({ name: 'twitter:title', content: pageTitle });
    this.meta.updateTag({ name: 'twitter:description', content: pageDescription });
    this.meta.updateTag({ name: 'keywords', content: 'política de privacidad, protección de datos, El Conservador, privacidad en línea, derechos del usuario' });
  }
  revokeConsent(): void {
    this.cookieConsentService.revokeConsent();
    alert('Su consentimiento para el uso de cookies ha sido revocado. Las cookies no esenciales han sido eliminadas.');
    // Opcional: Recargar la página para aplicar cambios inmediatos
    window.location.reload();
  }
}
