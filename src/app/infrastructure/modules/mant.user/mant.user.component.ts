import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-mant-user',
  templateUrl: './mant.user.component.html',
  styleUrls: ['./mant.user.component.scss'],
  imports: [CommonModule, RouterModule]  
})

export class MantUserComponent {
  private router = inject(Router);

  goEditProfile() {
    // más adelante podrías navegar a un subcomponente /mant-user/edit-profile
    alert('Aquí abrirías el formulario para editar perfil');
  }

  goChangePassword() {
    // más adelante podrías navegar a un subcomponente /mant-user/change-password
    alert('Aquí abrirías el formulario para cambiar contraseña');
  }
}
