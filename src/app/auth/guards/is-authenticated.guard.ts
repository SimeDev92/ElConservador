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
    console.log('isAuthenticatedGuard: User is authenticated, allowing access');
    return true;
  }

  if( authService.authStatus() === AuthStatus.cheking ) {
    return false;
  }

  console.log('Guard: Saving redirect URL:', state.url);
  authService.setRedirectUrl(state.url)
  router.navigateByUrl('/auth/login');
  return false;
};
