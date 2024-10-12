// donations.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { loadStripe, Stripe, StripeError } from '@stripe/stripe-js';
import { environments } from '../../environments/environments';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DonationsService {
  private stripePromise = loadStripe(environments.stripePublicKeyTest);

  constructor(private http: HttpClient) {}

  // Método para crear una sesión de pago
  createCheckoutSession(priceId: string, isRecurring: boolean): Observable<{ sessionId: string }> {
    return this.http.post<{ sessionId: string }>(
      `${environments.baseUrl}/payments/create-checkout-session`,
      { priceId, isRecurring }
    );
  }

  // Método para redirigir a Stripe Checkout
  redirectToCheckout(sessionId: string): Observable<{ error?: StripeError }> {
    return from(this.stripePromise).pipe(
      switchMap((stripe) => {
        if (!stripe) {
          throw new Error('Stripe no se pudo cargar correctamente');
        }
        return from(stripe.redirectToCheckout({ sessionId }));
      })
    );
  }

  // Método para verificar el pago
  verifyPayment(sessionId: string): Observable<any> {
    return this.http.get(`${environments.baseUrl}/payments/verify-payment`, {
      params: { session_id: sessionId }
    });
  }
}
