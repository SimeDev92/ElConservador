import { Component, computed, effect, inject, OnInit } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { AuthStatus } from './auth/interfaces';
import { Router } from '@angular/router';
import { VisitsService } from './visits.service';

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

  // Colores del spinner
  private colors = ['#FFC400', '#C60B1E'];
  spinnerColor = this.colors[0];
  isLoading = true;

  public finishedAuthCheck = computed<boolean>(() => {
    return this.authService.authStatus() !== AuthStatus.cheking;
  });

  public authStatusChangedEffect = effect(() => {
    switch (this.authService.authStatus()) {
      case AuthStatus.cheking:
        this.isLoading = true;
        return;
      case AuthStatus.authenticated:
        this.isLoading = false;
        return;
      case AuthStatus.notAuthenticated:
        this.isLoading = false;
        return;
      case AuthStatus.registered:
        this.router.navigateByUrl('/auth/login');
        this.isLoading = false;
        return;
    }
  });

  ngOnInit(): void {
    this.visitsService.incrementVisits();

    setInterval(() => {
      if (this.isLoading) {
        this.spinnerColor = this.spinnerColor === this.colors[0] ? this.colors[1] : this.colors[0];
      }
    }, 500);
  }

}
