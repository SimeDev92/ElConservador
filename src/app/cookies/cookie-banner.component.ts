import { Component, OnInit } from '@angular/core';
import { CookieConsentService } from './cookie-consent.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cookie-banner',
  imports: [
    CommonModule
],
  templateUrl: './cookie-banner.component.html',
})
export class CookieBannerComponent implements OnInit {
  showBanner = false;

  constructor(private cookieConsentService: CookieConsentService) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.showBanner = !this.cookieConsentService.hasConsent();
    }, 0);
  }

  acceptCookies(): void {
    this.cookieConsentService.setConsent('accepted');
    this.showBanner = false;
  }

  rejectCookies(): void {
    this.cookieConsentService.setConsent('rejected');
    this.showBanner = false;
    // Opcional: Remover scripts de AdSense
    this.removeAdSense();
  }

  private removeAdSense(): void {
    const ads = document.querySelectorAll('script[src*="adsbygoogle"]');
    ads.forEach(ad => ad.remove());
  }

}
