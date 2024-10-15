import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrls: ['./layout-page.component.css']
})
export class LayoutPageComponent {

  public sidebarItems = [
    { label: 'Listado', icon: 'label', url: '/news/list' },
    { label: 'Buscar', icon: 'search', url: '/news/search' },
    { label: 'Política', icon: 'gavel', url: '/news/category/Politics' },
    { label: 'Economía', icon: 'attach_money', url: '/news/category/Economy' },
    { label: 'Sociedad', icon: 'people', url: '/news/category/Society' },
    { label: 'Ciencia y Tecnología', icon: 'science', url: '/news/category/ScienceTechnology' },
    { label: 'Cultura', icon: 'palette', url: '/news/category/Culture' },
    { label: 'Deportes', icon: 'sports_soccer', url: '/news/category/Sports' },
    { label: 'Opinión', icon: 'forum', url: '/news/category/Opinion' },
    { label: 'Publicar', icon: 'publish', url: '/packages' },
    { label: 'Donar', icon: 'volunteer_activism', url: '/donations' }
  ];

  constructor(private router: Router) {}

  navigateTo(url: string): void {
    this.router.navigate([url]);
  }
  openExternalLink(url: string): void {
    window.open(url, '_blank');
  }

}
