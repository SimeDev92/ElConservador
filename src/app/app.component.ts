import { Component, computed, effect, inject, OnInit } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { AuthStatus } from './auth/interfaces';
import { Router } from '@angular/router';
import { VisitsService } from './visits.service';
import { timer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'el-conservador-app';

  private authService = inject(AuthService);
  private router = inject(Router);
  private visitsService = inject(VisitsService);

  isLoading = true;

  public finishedAuthCheck = computed<boolean>(() => {
    return this.authService.authStatus() !== AuthStatus.cheking && !this.isLoading;
  });

  public authStatusChangedEffect = effect(() => {
    switch (this.authService.authStatus()) {
      case AuthStatus.cheking:
        return;
      case AuthStatus.authenticated:
        // Podrías redirigir a una página de inicio para usuarios autenticados si lo deseas
        return;
      case AuthStatus.notAuthenticated:
        // No redirigir automáticamente
        return;
      case AuthStatus.registered:
        this.router.navigateByUrl('/auth/login');
        return;
    }
  });

  ngOnInit(): void {
    this.visitsService.incrementVisits();

    // Simula un retraso de 3 segundos para la pantalla de carga
    timer(3000).subscribe(() => {
      this.isLoading = false;
    });
  }
}
