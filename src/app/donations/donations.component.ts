import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { environments } from '../../environments/environments';
import { DonationsService } from './donations.service';
import { AuthService } from '../auth/services/auth.service';
import { AuthStatus } from '../auth/interfaces';
import { of } from 'rxjs';

@Component({
  selector: 'app-donations',
  templateUrl: './donations.component.html',
  styleUrls: ['./donations.component.css']
})
export class DonationsComponent implements OnInit {
  isAuthenticated: boolean = false;
  donationType: string = 'single';
  selectedAmount: number | null = null;
  singleDonationAmounts = [1, 5, 10, 20, 50, 100];
  monthlyDonationAmounts = [5, 10, 20, 50];

  constructor(
    private authService: AuthService,
    private router: Router,
    private donationsService: DonationsService
  ) {}

  ngOnInit() {
    this.isAuthenticated = this.authService.authStatus() === AuthStatus.authenticated;
  }

  processDonation(isRecurring: boolean) {
    if (!this.isAuthenticated) {
      this.authService.setRedirectUrl('/donations');
      this.router.navigateByUrl('/auth/login');
      return;
    }

    if (this.selectedAmount === null) {
      this.showError(`Por favor, selecciona un monto de donación ${isRecurring ? 'mensual' : 'única'}.`);
      return;
    }

    const priceId = this.getPriceIdForAmount(this.selectedAmount, isRecurring ? 'monthly' : 'single');
    if (!priceId) {
      this.showError('El monto seleccionado no es válido.');
      return;
    }

    const userId = this.authService.getCurrentUserId();
    if (!userId) {
      this.showError('No se pudo identificar al usuario. Por favor, inicia sesión nuevamente.');
      return;
    }

    this.donationsService.createCheckoutSession(priceId, isRecurring, userId).pipe(
      switchMap(response => this.donationsService.redirectToCheckout(response))
    ).subscribe(
      (result) => {
        if (result && result.error) {
          console.error('Error during checkout:', result.error);
          this.showError('Hubo un problema al procesar el pago. Por favor, inténtalo de nuevo más tarde.');
        }
        // Si no hay error, el usuario ha sido redirigido a Stripe
      },
      (error) => {
        console.error('Error initiating checkout:', error);
        this.showError('Hubo un problema al crear la sesión de pago. Por favor, inténtalo de nuevo más tarde.');
      }
    );
  }

  processSingleDonation() {
    this.processDonation(false);
  }

  processMonthlyDonation() {
    this.processDonation(true);
  }

  private getPriceIdForAmount(amount: number, type: 'single' | 'monthly'): string | null {
    const testPriceMapping = {
      single: {
        1:   'price_1Q8mjnDZG49tH5nmNFHqTipQ',
        5:   'price_1Q8mlKDZG49tH5nm0pNvz9AS',
        10:  'price_1Q8mljDZG49tH5nmq6wf8RjB',
        20:  'price_1Q8mpVDZG49tH5nmvBwli4QP',
        50:  'price_1Q8mptDZG49tH5nmis73ROoV',
        100: 'price_1Q8mtIDZG49tH5nmJiHjxrDZ',
      },
      monthly: {
        5:  'price_1Q8mu5DZG49tH5nmWVzvvraZ',
        10: 'price_1Q8mugDZG49tH5nmfiAR2cGq',
        20: 'price_1Q8muzDZG49tH5nmXkkDMnqt',
        50: 'price_1Q8mvKDZG49tH5nmfv1QfGRm',
      },
    };

    const productionPriceMapping = {
      single: {
        1:   'prod_R0maryEnpbavyW',
        5:   'prod_R0motzuCHMGDoN',
        10:  'prod_R0mp9ic6y1Z3i1',
        20:  'prod_R0mqYtmEZVGjkz',
        50:  'prod_R0mrpYgRgvzS67',
        100: 'prod_R0ms4bbEgwCnKe',
      },
      monthly: {
        5:  'prod_R0mwgStTFFivtv',
        10: 'price_1Q8lTXDZG49tH5nmXxI6MLyo',
        20: 'prod_R0n4EJHptIxcvl',
        50: 'prod_R0n5OrlkIgQDEL',
      },
    };

    const priceMapping = environments.useTestProducts ? testPriceMapping : productionPriceMapping;
    const selectedMapping = priceMapping[type] as { [key: number]: string };

    return selectedMapping[amount] || null;
  }

  private showError(message: string) {
    Swal.fire({
      title: 'Error',
      text: message,
      icon: 'error',
      confirmButtonText: 'OK',
      confirmButtonColor: '#007BFF',
    });
  }

  // Nuevos métodos para manejar el historial de donaciones y cancelaciones

  getUserDonations() {
    const userId = this.authService.getCurrentUserId();
    if (userId) {
      this.donationsService.getUserDonations(userId).subscribe(
        (donations) => {
          console.log('Historial de donaciones:', donations);
          // Aquí puedes manejar la visualización del historial de donaciones
        },
        (error) => {
          console.error('Error al obtener el historial de donaciones:', error);
          this.showError('No se pudo obtener el historial de donaciones.');
        }
      );
    }
  }

  cancelRecurringDonation(subscriptionId: string) {
    this.donationsService.cancelRecurringDonation(subscriptionId).subscribe(
      (result) => {
        console.log('Donación recurrente cancelada:', result);
        Swal.fire({
          title: 'Éxito',
          text: 'La donación recurrente ha sido cancelada.',
          icon: 'success',
          confirmButtonText: 'OK',
          confirmButtonColor: '#007BFF',
        });
        // Aquí puedes actualizar la UI o recargar el historial de donaciones
      },
      (error) => {
        console.error('Error al cancelar la donación recurrente:', error);
        this.showError('No se pudo cancelar la donación recurrente. Por favor, inténtalo de nuevo más tarde.');
      }
    );
  }
}
