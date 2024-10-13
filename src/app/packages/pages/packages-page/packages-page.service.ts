import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environments } from '../../../../environments/environments';
import { AuthService } from '../../../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PackagesService {
  private apiUrl = `${environments.baseUrl}/packages`;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  createCheckoutSession(priceId: string): Observable<{ sessionId: string; url: string }> {
    const userId = this.authService.getCurrentUserId();
    if (!userId) {
      throw new Error('Usuario no autenticado');
    }

    return this.http.post<{ sessionId: string; url: string }>(`${this.apiUrl}/create-checkout-session`, {
      priceId,
      userId,
      mode: 'subscription',
      metadata: {
        type: 'package',
        userId: userId
      }
    });
  }
}
