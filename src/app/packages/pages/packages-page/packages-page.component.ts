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
      name: 'Héroes de la Nación',
      image: 'francisco.jpg',
      description: 'Haz oír tu voz cada día y marca la diferencia.',
      price: 30,
      features: ['22 publicaciones al mes', 'Para líderes de opinión', 'Crea impacto constante'],
      priceId: 'price_1Q93x6DZG49tH5nmPdVs6qsq',
    },
    {
      name: 'La Voz',
      image: 'jose-antonio.jpg',
      description: 'Comparte tus ideas cada semana y conecta con otros.',
      price: 20,
      features: ['10 publicaciones al mes', 'Conecta con tu audiencia', 'Establece tu mensaje'],
      priceId: 'price_1Q93zGDZG49tH5nmsK1F0IZD',
    },
    {
      name: 'Tradición',
      image: 'isabel.jpg',
      description: 'Publica al mes y crea una presencia significativa.',
      price: 15,
      features: ['5 publicaciones al mes', 'Establece tu legado', 'Construye tu visión'],
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

    this.packagesService.createPackageCheckoutSession(packageItem.priceId)
      .subscribe(
        (response: { sessionId: string; url: string }) => {
          if (response.url) {
            window.location.href = response.url;
          } else {
            console.error('No se recibió una URL de redirección válida');
            Swal.fire({
              title: 'Error',
              text: 'Hubo un problema al procesar tu solicitud. Por favor, inténtalo de nuevo más tarde.',
              icon: 'error',
              confirmButtonText: 'OK',
              confirmButtonColor: '#007BFF',
            });
          }
        },
        (error: Error) => {
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
