import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DonationsService } from '../donations/donations.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {
  sessionId: string | null = null;
  paymentVerified: boolean = false;
  paymentDetails: any = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private donationsService: DonationsService
  ) {}

  ngOnInit() {
    this.sessionId = this.route.snapshot.queryParamMap.get('session_id');
    if (this.sessionId) {
      this.verifyPayment(this.sessionId);
    } else {
      this.handleError('No se encontró ID de sesión');
    }
  }

  verifyPayment(sessionId: string) {
    this.donationsService.verifyPayment(sessionId).subscribe(
      (response) => {
        if (response.success) {
          this.paymentVerified = true;
          this.paymentDetails = response.paymentDetails;
          this.showSuccessMessage();
        } else {
          this.handleError('No se pudo verificar el pago');
        }
      },
      (error) => {
        console.error('Error verifying payment:', error);
        this.handleError('Error al verificar el pago');
      }
    );
  }

  showSuccessMessage() {
    Swal.fire({
      title: '¡Donación exitosa!',
      text: 'Gracias por tu generosa donación.',
      icon: 'success',
      confirmButtonText: 'OK'
    });
  }

  handleError(message: string) {
    Swal.fire({
      title: 'Error',
      text: message,
      icon: 'error',
      confirmButtonText: 'OK'
    }).then(() => {
      this.router.navigate(['/donations']);
    });
  }
}
