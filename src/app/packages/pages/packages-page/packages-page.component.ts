import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../../auth/services/auth.service';
import { PackagesService } from './packages-page.service';

@Component({
  selector: 'app-packages-page',
  templateUrl: './packages-page.component.html',
  styleUrls: ['./packages-page.component.css']
})
export class PackagesPageComponent {
  public packages = [
    {
      name: 'Francisco',
      image: 'francisco.jpg',
      description: 'Una publicación diaria durante un mes con máxima visibilidad, incluyendo banners en la página principal.',
      price: 30,
      features: ['Publicación diaria', 'Máxima visibilidad', 'Banner en página principal'],
      priceId: 'price_1Q93x6DZG49tH5nmPdVs6qsq',
    },
    {
      name: 'José Antonio',
      image: 'jose-antonio.jpg',
      description: '2-3 publicaciones semanales durante un mes, con visibilidad destacada.',
      price: 20,
      features: ['2-3 publicaciones semanales', 'Visibilidad destacada'],
      priceId: 'price_1Q93zGDZG49tH5nmsK1F0IZD',
    },
    {
      name: 'Isabel',
      image: 'isabel.jpg',
      description: '1 publicación semanal durante un mes, con visibilidad básica.',
      price: 15,
      features: ['1 publicación semanal', 'Visibilidad básica'],
      priceId: 'price_1Q942NDZG49tH5nmL31buW6o',
    }
  ];

  constructor(
    private authService: AuthService,
    private router: Router,
    private packagesService: PackagesService
  ) {}

  contractPackage(packageItem: any): void {
    if (this.authService.authStatus() !== 'authenticated') {
      this.authService.setRedirectUrl('/packages');
      this.router.navigateByUrl('/auth/login');
      return;
    }

    const userId = this.authService.getCurrentUserId();
    if (!userId) {
      Swal.fire({
        title: 'Error',
        text: 'No se pudo identificar al usuario. Por favor, inicia sesión nuevamente.',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#007BFF',
      });
      return;
    }

    this.packagesService.createCheckoutSession( packageItem.priceId )
      .subscribe(
        response => {
          // Redirigir a Stripe Checkout
          window.location.href = response.url;
        },
        error => {
          console.error('Error al crear la sesión de pago:', error);
          Swal.fire({
            title: 'Error',
            text: 'Hubo un problema al procesar tu solicitud. Por favor, inténtalo de nuevo más tarde.',
            icon: 'error',
            confirmButtonText: 'OK',
            confirmButtonColor: '#007BFF',
          });
        }
      );
  }
}
