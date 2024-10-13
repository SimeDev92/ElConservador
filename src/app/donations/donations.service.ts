import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { loadStripe, Stripe, StripeError } from '@stripe/stripe-js';
import { environments } from '../../environments/environments';
import { Observable, from, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DonationsService {
  private stripePromise = loadStripe(environments.stripePublicKeyTest);
  private apiUrl = `${environments.baseUrl}/donations`; // Cambiado a /donations

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  createDonationCheckoutSession(priceId: string, isRecurring: boolean): Observable<{ sessionId: string; url: string }> {
    const userId = this.authService.getCurrentUserId();
    if (!userId) {
      throw new Error('Usuario no autenticado');
    }

    return this.http.post<{ sessionId: string; url: string }>(
      `${this.apiUrl}/create-checkout-session`,
      {
        priceId,
        userId,
        isRecurring,
        metadata: {
          type: 'donation',
          donationType: isRecurring ? 'recurring' : 'one-time',
          userId: userId
        }
      }
    );
  }

  redirectToCheckout(sessionData: { sessionId: string; url?: string }): Observable<{ error?: StripeError }> {
    if (sessionData.url) {
      window.location.href = sessionData.url;
      return of({ error: undefined });
    } else {
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

  verifyPayment(sessionId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/verify-payment`, {
      params: { session_id: sessionId }
    });
  }

  getUserDonations(): Observable<any> {
    const userId = this.authService.getCurrentUserId();
    if (!userId) {
      throw new Error('Usuario no autenticado');
    }
    return this.http.get(`${this.apiUrl}/user-donations/${userId}`);
  }

  cancelRecurringDonation(subscriptionId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/cancel-subscription`, { subscriptionId });
  }
}
