import { inject } from '@angular/core';
import type { CanActivateFn } from '@angular/router';

import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthStatus } from '../interfaces';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {

  // const url = state.url;
  // localStorage.setItem( 'url', url );

  const authService = inject( AuthService );
  const router = inject( Router );

  if( authService.authStatus() === AuthStatus.authenticated ) {
    return true;
  }

  if( authService.authStatus() === AuthStatus.cheking ) {
    return false;
  }

  authService.setRedirectUrl(state.url)
  router.navigateByUrl('/auth/login');
  return false;
};
