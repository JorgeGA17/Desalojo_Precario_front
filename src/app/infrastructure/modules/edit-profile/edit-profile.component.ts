import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';  // 👈 importar el módulo de botones

@Component({
  standalone: true,
  selector: 'app-edit-profile',
  imports: [
    CommonModule,
    FormsModule,
    MessagesModule,
    MessageModule,
    ButtonModule   // 👈 añadir aquí
  ],
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent {
  username = localStorage.getItem('username') || '';
  email = 'usuario@correo.com';

  messages: any[] = [];

  saveProfile() {
    this.messages = [
      { severity: 'success', summary: 'Perfil actualizado', detail: `Usuario: ${this.username}, Email: ${this.email}` }
    ];
  }
}
