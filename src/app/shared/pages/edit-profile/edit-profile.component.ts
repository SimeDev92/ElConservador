import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  profileForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required], // Agrega el control para apellidos
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit() {
    // Cargar los datos actuales del usuario
    const currentUser = this.authService.currentUser();
    if (currentUser) {
      this.profileForm.patchValue({
        name: currentUser.name,
        surname: currentUser.surname, // Asegúrate de que esto coincida con tu modelo
        email: currentUser.email
      });
    }
  }

  onSubmit() {
    if (this.profileForm.valid) {
      const { name, surname, email } = this.profileForm.value; // Desestructurar los valores del formulario
      const currentUser = this.authService.currentUser(); // Obtener el usuario actual
      const userId = currentUser!._id; // Asegúrate de que esto coincide con tu modelo

      this.authService.updateProfile(userId, name, surname, email).subscribe(success => {
        if (success) {
          Swal.fire({
            title: 'Éxito',
            text: 'Perfil actualizado correctamente',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            this.router.navigate(['/dashboard']);
          });
        } else {
          Swal.fire({
            title: 'Error',
            text: 'No se pudo actualizar el perfil',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      });
    }
  }

  onChangePassword() {
    this.router.navigate(['/reset-password']);
  }
}
