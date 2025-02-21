import { Injectable } from '@angular/core';
import { SsrCookieService } from 'ngx-cookie-service-ssr';

@Injectable({
  providedIn: 'root',
})
export class CookieConsentService {
  private consentCookieName = 'cookie_consent';

  constructor(private ssrCookieService: SsrCookieService) {}

  hasConsent(): boolean {
    return this.ssrCookieService.check(this.consentCookieName);
  }

  setConsent(value: 'accepted' | 'rejected'): void {
    this.ssrCookieService.set(this.consentCookieName, value, {
      expires: 365,
      path: '/',
      secure: true,
      sameSite: 'Lax' // Usa 'None' si necesitas cross-site cookies
    });
  }

  getConsent(): string {
    return this.ssrCookieService.get(this.consentCookieName);
  }

  revokeConsent(): void {
    this.ssrCookieService.delete(this.consentCookieName, '/');
  }
}
