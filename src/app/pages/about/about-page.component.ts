import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'page-about',
  standalone: true,
  imports: [],
  templateUrl: './about-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AboutPageComponent implements OnInit {
  private title = inject(Title)
  private meta = inject(Meta)

  ngOnInit(): void {
    const pageTitle = 'Acerca de El Conservador Noticias | Valores Conservadores en España';
    const pageDescription = 'El Conservador Noticias: Plataforma dedicada a promover y preservar los valores tradicionales y conservadores en España. Descubre nuestra misión, valores y equipo.';

    this.title.setTitle(pageTitle);
    this.meta.updateTag({ name: 'description', content: pageDescription });
    this.meta.updateTag({ property: 'og:title', content: pageTitle });
    this.meta.updateTag({ property: 'og:description', content: pageDescription });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:url', content: 'https://elconservadornoticias.es/sobre-nosotros' });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: pageTitle });
    this.meta.updateTag({ name: 'twitter:description', content: pageDescription });
    this.meta.updateTag({ name: 'keywords', content: 'El Conservador, noticias conservadoras, valores tradicionales, España, política conservadora, familia, libertad, economía, patriotismo' });
  }
}
