import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../auth/auth.service.'; // ajusta la ruta real

export const loginGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    // Si ya hay sesión, cerramos sesión
    authService.logout();

    // 🚀 Aquí decides dónde mandarlo:
    router.navigate(['/home']); // lo mandamos a home
    return false; // bloqueamos acceso al login
  }

  return true; // si no hay sesión, puede entrar al login
};
