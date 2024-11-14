import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from '../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class VisitsService {
  private apiUrl = `${environments.baseUrl}/visits`;

  constructor(
    private http: HttpClient,
  ) {}

  incrementVisits(): void {
    this.http.post(`${this.apiUrl}/increment`, {}).subscribe({
      next: () => console.log('Visita registrada exitosamente'),
      error: (err) => console.error('Error al registrar visita:', err)
    });
  }
}
