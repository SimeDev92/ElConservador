// donations.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { loadStripe, Stripe, StripeError } from '@stripe/stripe-js';
import { environments } from '../../environments/environments';
import { Observable, from, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DonationsService {
  private stripePromise = loadStripe(environments.stripePublicKeyTest);
  private apiUrl = `${environments.baseUrl}/payments`;

  constructor(private http: HttpClient) {}

  // Método para crear una sesión de pago
  createCheckoutSession(priceId: string, isRecurring: boolean, userId: string): Observable<{ sessionId: string; url: string }> {
    return this.http.post<{ sessionId: string; url: string }>(
      `${this.apiUrl}/create-checkout-session`,
      {
        priceId,
        isRecurring,
        userId,
        metadata: {
          type: 'donation',
          mode: isRecurring ? 'recurring' : 'one-time',
          userId: userId
        }
      }
    );
  }

  // Método para redirigir a Stripe Checkout
// Método para redirigir a Stripe Checkout
redirectToCheckout(sessionData: { sessionId: string; url?: string }): Observable<{ error?: StripeError }> {
  if (sessionData.url) {
    // Si tenemos una URL directa, redirigimos inmediatamente
    window.location.href = sessionData.url;
    return of({ error: undefined });
  } else {
    // Si no tenemos URL, usamos el método tradicional con sessionId
    return from(this.stripePromise).pipe(
      switchMap((stripe) => {
        if (!stripe) {
          throw new Error('Stripe no se pudo cargar correctamente');
        }
        return from(stripe.redirectToCheckout({ sessionId: sessionData.sessionId }));
      })
    );
  }
}

  // Método para verificar el pago
  verifyPayment(sessionId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/verify-payment`, {
      params: { session_id: sessionId }
    });
  }

  // Nuevo método para obtener el historial de donaciones del usuario
  getUserDonations(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/user-donations/${userId}`);
  }

  // Nuevo método para cancelar una donación recurrente
  cancelRecurringDonation(subscriptionId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/cancel-subscription`, { subscriptionId });
  }
}
