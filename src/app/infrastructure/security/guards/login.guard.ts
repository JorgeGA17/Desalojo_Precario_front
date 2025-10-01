import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../auth/auth.service.'; // ajusta la ruta real

export const loginGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    // cierra sesión
    authService.logout();
    router.navigate(['/home']); 
    return false;
  }

  return true; 
};
