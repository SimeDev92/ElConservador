import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from "./shared/components/footer/footer.component";
import { CookieBannerComponent } from './cookies/cookie-banner.component';
import { isPlatformBrowser, ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    CookieBannerComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'El Conservador - Noticias';

  constructor(
    private router: Router,
    private viewportScroller: ViewportScroller,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.viewportScroller.scrollToPosition([0, 0]);
        }
      });
    }
  }
}
