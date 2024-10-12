import { inject } from '@angular/core';
import type { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthStatus } from '../interfaces';

export const isNotAuthenticatedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.authStatus() === AuthStatus.authenticated) {
    const redirectUrl = authService.getRedirectUrl();
    console.log('isNotAuthenticatedGuard: User is authenticated, redirecting to:', redirectUrl);
    router.navigateByUrl(redirectUrl);
    return false;
  }

  console.log('isNotAuthenticatedGuard: User is not authenticated, allowing access to auth routes');
  return true;
};
