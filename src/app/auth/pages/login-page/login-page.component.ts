import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  public myForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  login() {
    if (this.myForm.invalid) return;

    const { email, password } = this.myForm.value;
    this.authService.login(email, password).subscribe({
      next: (success) => {
        if (success) {
          const redirectUrl = this.authService.getRedirectUrl();
          this.authService.clearRedirectUrl();
          this.router.navigateByUrl(redirectUrl).then(() => {
          }).catch(error => {
            console.error('Navigation failed:', error);
          });
        }
      },
      error: (message) => {
        Swal.fire({
          title: 'Error',
          text: message,
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor: '#007BFF',
        });
      }
    });
  }

  loginWithGoogle() {
    // Implementar lógica de inicio de sesión con Google aquí
  }
}
