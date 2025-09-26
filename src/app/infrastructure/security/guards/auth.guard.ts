import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';

function getToken(): string | null {
  try { return localStorage.getItem('token'); } catch { return null; }
}
function getUiRoles(): string[] {
  try { return JSON.parse(localStorage.getItem('roles') ?? '[]'); } catch { return []; }
}

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const token = getToken();
  if (token) return true;
  router.navigateByUrl('/auth/login');
  return false;
};

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const router = inject(Router);
  const required: string[] = route.data?.['roles'] ?? [];  
  if (!required.length) return true;                       

  const mine = getUiRoles();                              
  const ok = required.some(r => mine.includes(r));
  if (ok) return true;

  router.navigateByUrl('/home');
  return false;
};