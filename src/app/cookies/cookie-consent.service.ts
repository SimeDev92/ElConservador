import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { SsrCookieService } from 'ngx-cookie-service-ssr';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class CookieConsentService {
  private consentCookieName = 'cookie_consent';

  constructor(
    private ssrCookieService: SsrCookieService,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  hasConsent(): boolean {
    if (!isPlatformBrowser(this.platformId)) return true; // Evita verificar cookies en SSR
    return this.ssrCookieService.check(this.consentCookieName);
  }

  setConsent(value: 'accepted' | 'rejected'): void {
    if (isPlatformBrowser(this.platformId)) {
      this.ssrCookieService.set(this.consentCookieName, value, {
        expires: 365,
        path: '/',
        secure: true,
        sameSite: 'Lax',
      });
    }
  }

  getConsent(): string {
    if (!isPlatformBrowser(this.platformId)) return ''; // Evita errores en SSR
    return this.ssrCookieService.get(this.consentCookieName);
  }

  revokeConsent(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.ssrCookieService.delete(this.consentCookieName, '/');
    }
  }
}
