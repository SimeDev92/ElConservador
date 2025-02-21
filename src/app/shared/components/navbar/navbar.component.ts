import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, HostListener, Inject, PLATFORM_ID, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { TranslateCategoryPipe } from '../../../articles/pipes/translate-category.pipe';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    TranslateCategoryPipe
  ],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  isMobileMenuOpen = signal(false); // Estado del menú móvil
  menuStateClass = computed(() => this.isMobileMenuOpen() ? 'block' : 'hidden'); // Clase dinámica para el menú móvil
  isNewsDropdownOpen = false; // Estado del menú desplegable de "Noticias"

  // Categorías de noticias
  newsCategories = [
    'Politics',
    'Economy',
    'Society',
    'ScienceTechnology',
    'Culture',
    'Sports',
    'Opinion',
    'International'
  ];

  constructor(
    private elementRef: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) {}

  // Alternar el menú móvil
  toggleMobileMenu() {
    this.isMobileMenuOpen.update(v => !v);
  }

  // Cerrar el menú móvil
  closeMobileMenu() {
    this.isMobileMenuOpen.set(false);
  }

  // Cerrar el menú móvil y el desplegable de "Noticias" al cambiar de ruta
  closeMobileMenuOnRouteChange(): void {
    this.closeMobileMenu();
    this.isNewsDropdownOpen = false;
  }

  // Cerrar menús al hacer clic fuera del componente
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    if (isPlatformBrowser(this.platformId)) {
      const clickedInside = this.elementRef.nativeElement.contains(event.target);
      if (!clickedInside) {
        this.closeMobileMenu();
        this.isNewsDropdownOpen = false;
      }
    }
  }

  // Alternar el menú desplegable de "Noticias"
  toggleNewsDropdown(): void {
    this.isNewsDropdownOpen = !this.isNewsDropdownOpen;
  }
}
