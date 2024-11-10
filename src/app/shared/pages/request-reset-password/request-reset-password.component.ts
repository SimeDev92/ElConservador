import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-request-reset-password',
  templateUrl: './request-reset-password.component.html',
  styleUrls: ['./request-reset-password.component.css']
})
export class RequestResetPasswordComponent implements OnInit {
  token: string = '';
  email: string = '';

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      if (this.token) {
        Swal.fire({
          title: 'Token Recibido',
          text: 'Se ha recibido un token para restablecer la contraseña.',
          icon: 'info',
          confirmButtonText: 'OK',
          confirmButtonColor: '#007BFF',
        });
      }
    });
  }

  onSubmit() {
    if (!this.email) {
      Swal.fire({
        title: 'Error',
        text: 'Por favor, ingrese su dirección de correo electrónico.',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#007BFF',
      });
      return;
    }

    Swal.fire({
      title: '¿Estás seguro?',
      text: "Se enviará un correo para restablecer tu contraseña.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, enviar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.requestPasswordReset(this.email).subscribe(
          () => {
            Swal.fire({
              title: 'Éxito',
              text: 'Se ha enviado un correo para restablecer la contraseña. Por favor, revisa tu bandeja de entrada.',
              icon: 'success',
              confirmButtonText: 'OK',
              confirmButtonColor: '#007BFF',
            }).then(() => {
              this.router.navigate(['/auth/login']);
            });
          },
          error => {
            Swal.fire({
              title: 'Error',
              text: 'Ha ocurrido un error al solicitar el restablecimiento de contraseña. Por favor, intenta de nuevo más tarde.',
              icon: 'error',
              confirmButtonText: 'OK',
              confirmButtonColor: '#007BFF',
            });
          }
        );
      }
    });
  }
}
