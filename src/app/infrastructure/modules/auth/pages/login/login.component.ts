import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { AuthService } from '../../../../security/auth/auth.service.';

@Component({
  standalone: true,
  selector: 'sp-login',
  imports: [
    CommonModule,
    FormsModule,
    DropdownModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    MessageModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  private router = inject(Router);        
  private auth   = inject(AuthService);   
  user = '';                
  pwd = '';                 
  selectedProfile = '';     
  error = '';               
  loading = false;          

  profiles = [
    { id: 'LIMA NORTE',     label: 'CSJLima Norte' },
    { id: 'SELVA CENTRAL',  label: 'CSJSelva Central' },
    { id: 'HUANUCO',        label: 'CSJHuanuco' },
    { id: 'JUNIN',          label: 'CSJJunin' }
  ];

  submit() {
    this.error = '';
    if (!this.user.trim() || !this.pwd.trim() || !this.selectedProfile) {
      this.error = 'Usuario, contraseña y corte son obligatorios';
      return;
    }

    this.loading = true;

    this.auth.login(this.user.trim(), this.pwd.trim(), this.selectedProfile).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigateByUrl('/home');
      },
      error: (err) => {
        this.loading = false;
         this.error = err?.error?.detail || err?.message || 'No se pudo iniciar sesión';
      }
    });
  }

  goForgot() {
    if (!this.loading) {
      this.router.navigateByUrl('/auth/forgot');
    }
  }
}
