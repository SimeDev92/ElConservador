import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetForm: FormGroup;
  token: string = '';
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    this.resetForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
    });
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const newPassword = formGroup.get('newPassword')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.resetForm.valid && this.token) {
      this.isLoading = true;
      const newPassword = this.resetForm.get('newPassword')?.value;

      if (newPassword) {
        this.authService.resetPassword(this.token, newPassword).subscribe(
          () => {
            this.isLoading = false;
            Swal.fire({
              title: 'Éxito',
              text: 'Contraseña restablecida con éxito',
              icon: 'success',
              confirmButtonText: 'OK',
              confirmButtonColor: '#007BFF',
            }).then(() => {
              this.router.navigate(['/auth/login']);
            });
          },
          error => {
            this.isLoading = false;
            console.error('Error al restablecer la contraseña', error);
            Swal.fire({
              title: 'Error',
              text: 'Error al restablecer la contraseña. Por favor, intente de nuevo.',
              icon: 'error',
              confirmButtonText: 'OK',
              confirmButtonColor: '#007BFF',
            });
          }
        );
      }
    }
  }

  get newPasswordControl() { return this.resetForm.get('newPassword'); }
  get confirmPasswordControl() { return this.resetForm.get('confirmPassword'); }
}
