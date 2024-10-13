import { Component } from '@angular/core';

@Component({
  selector: 'app-packages-cancel',
  template: `
    <div class="container">
      <h2>Contratación cancelada</h2>
      <p>La contratación del paquete ha sido cancelada. Si tienes alguna pregunta, no dudes en contactarnos.</p>
      <button mat-raised-button color="primary" routerLink="/packages">Volver a Paquetes</button>
    </div>
  `,
  styles: [`
    .container {
      text-align: center;
      padding: 20px;
    }
    h2 {
      color: #F44336;
    }
  `]
})
export class PackagesCancelComponent {}
