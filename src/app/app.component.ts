import { Component, computed, effect, inject } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { AuthStatus } from './auth/interfaces';
import { Router } from '@angular/router';
import { retry } from 'rxjs';

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

    switch( this.authService.authStatus() ){

      case AuthStatus.cheking:
        return;
      case AuthStatus.authenticated:
        this.router.navigateByUrl('/dashboard');
        return;
      case AuthStatus.notAuthenticated:
        this.router.navigateByUrl('/news/list'); // '/news/list' /auth/login'
        return;
    }


  })

}
