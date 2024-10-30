import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subscription } from '../interfaces/subscription.interface';
import { environments } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  private apiUrl = `${environments.baseUrl}/packages`;

  constructor(private http: HttpClient) {}
  getActiveSubscription(userId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/active-subscription/${userId}`);
  }

  cancelSubscription(subscriptionId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/cancel/${subscriptionId}`, {});
  }

  getAllPackages(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  createCheckoutSession(priceId: string, userId: string, metadata: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create-checkout-session`, { priceId, userId, metadata });
  }
}