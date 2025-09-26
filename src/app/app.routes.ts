import { Routes } from '@angular/router';
import { authGuard, roleGuard } from './infrastructure/security/guards/auth.guard';
import { loginGuard } from './infrastructure/security/guards/login.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'auth/login' },

  {
    path: 'auth/login',
    loadComponent: () => import('./infrastructure/modules/auth/pages/login/login.component')
      .then(m => m.LoginComponent),
    canActivate: [loginGuard] 
  },
  {
    path: 'auth/forgot',
    loadComponent: () => import('./infrastructure/modules/auth/pages/forgot/forgot.component')
      .then(m => m.ForgotComponent)
  },

  {
    path: '',
    loadComponent: () => import('./infrastructure/layouts/main-layout/main-layout.component')
      .then(m => m.MainLayoutComponent),
    canActivate: [authGuard],
    children: [
      { path: 'home', loadComponent: () => import('./infrastructure/modules/home/pages/home/home.component').then(m => m.HomeComponent) },

      {
        path: 'bandeja',
        loadComponent: () => import('./infrastructure/modules/bandeja/pages/bandeja/bandeja.component').then(m => m.BandejaComponent),
        canActivate: [roleGuard],
        data: { roles: ['SECRETARIO', 'JUEZ', 'ADMIN'] }
      },

      {
        path: 'generador',
        loadComponent: () => import('./infrastructure/modules/generador/pages/generador/generador.component').then(m => m.GeneradorComponent),
        canActivate: [roleGuard],
        data: { roles: ['JUEZ', 'ADMIN'] }
      },


      {
        path: 'mant-user',
        loadComponent: () => import('./infrastructure/modules/mant.user/mant.user.component')
          .then(m => m.MantUserComponent),
        children: [
          {
            path: 'edit-profile',
            loadComponent: () => import('./infrastructure/modules/edit-profile/edit-profile.component')
              .then(m => m.EditProfileComponent)
          },
          {
            path: 'change-password',
            loadComponent: () => import('./infrastructure/modules/change-password/change-password.component')
              .then(m => m.ChangePasswordComponent)
          },
          { path: '', redirectTo: 'edit-profile', pathMatch: 'full' }
        ]
      }
    ]
  },


  { path: '**', loadComponent: () => import('./infrastructure/shared/pages/not-found/not-found.component').then(m => m.NotFoundComponent) }
];
