import { Component, computed, effect, inject } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { AuthStatus } from './auth/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'el-conservador-app';

  private  authService =  inject( AuthService );
  private router = inject( Router)
  public finishedAuthCheck = computed<boolean>( () => {

    if( this.authService.authStatus() === AuthStatus.cheking ) {
      return false;
    }

    return true;

  })

  public authStatusChangedEffect = effect (() => {
    console.log('Auth status changed:', this.authService.authStatus());

    switch (this.authService.authStatus()) {
      case AuthStatus.cheking:
        return;
      case AuthStatus.authenticated:
        return;
      case AuthStatus.notAuthenticated:
        this.router.navigateByUrl('/news/list');
        return;
      case AuthStatus.registered:
        this.router.navigateByUrl('/auth/login');
        return;
    }

  })

}
