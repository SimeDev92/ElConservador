import { Component } from '@angular/core';

@Component({
  selector: 'app-packages-success',
  template: `
    <div class="container">
      <h2>¡Gracias por contratar nuestro paquete!</h2>
      <p>Tu suscripción ha sido procesada con éxito.</p>
      <button mat-raised-button color="primary" routerLink="/packages">Volver a Paquetes</button>
    </div>
  `,
  styles: [`
    .container {
      text-align: center;
      padding: 20px;
    }
    h2 {
      color: #4CAF50;
    }
  `]
})
export class PackagesSuccessComponent {}
