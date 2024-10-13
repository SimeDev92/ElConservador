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

  createCheckoutSession(priceId: string): Observable<any> {
    const userId = this.authService.getCurrentUserId();
    if (!userId) {
      throw new Error('Usuario no autenticado');
    }

    return this.http.post(`${this.apiUrl}/create-checkout-session`, { priceId, userId });
  }
}
