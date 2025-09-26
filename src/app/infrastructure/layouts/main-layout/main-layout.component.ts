import { Component, inject, signal, computed } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

interface MenuItem {
  id: string;
  label: string;
  icon?: string;
  route?: string;
  roles?: string[];
  badge?: string | number;
  children?: MenuItem[];
}

@Component({
  standalone: true,
  selector: 'sp-main-layout',
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet, ReactiveFormsModule, ButtonModule],
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent {
  private router = inject(Router);

  roles = signal<string[]>(this.readRolesFromStorage());

  search = new FormControl('', { nonNullable: true });

  private allMenu: MenuItem[] = [
    { id: 'home', label: 'Inicio', icon: 'pi pi-home', route: '/home', roles: ['ADMIN', 'JUEZ', 'SECRETARIO'] },

    {
      id: 'civil',
      label: 'Módulo Civil',
      icon: 'pi pi-sitemap',
      children: [
        {
          id: 'civil-generador',
          label: 'Generador de documentos',
          icon: 'pi pi-file-edit',
          route: '/generador',
          roles: ['JUEZ', 'ADMIN']
        },

        {
          id: 'civil-bandeja',
          label: 'Bandeja de documentos',
          icon: 'pi pi-briefcase',
          route: '/bandeja',
          badge: 'NEW',
          roles: ['SECRETARIO', 'JUEZ', 'ADMIN']
        },
      ],
    },
    { id: 'ayuda', label: 'Ayuda', icon: 'pi pi-info-circle', route: '/home', roles: ['ADMIN', 'JUEZ', 'SECRETARIO'] },
  ];

  expanded = signal<Set<string>>(new Set(['civil']));

  menu = computed<MenuItem[]>(() => {
    const roles = this.roles();
    const q = (this.search.value || '').toLowerCase().trim();

    const filterTree = (nodes: MenuItem[]): MenuItem[] => nodes
      .filter(n => !n.roles || n.roles.some(r => roles.includes(r)))
      .map(n => {
        if (n.children?.length) {
          const kids = filterTree(n.children);
          const match = n.label.toLowerCase().includes(q);
          return (q ? (match || kids.length) : true) ? { ...n, children: kids } : null as any;
        }
        return (q ? n.label.toLowerCase().includes(q) : true) ? n : null as any;
      })
      .filter(Boolean);

    return filterTree(this.allMenu);
  });

  toggle(id: string) {
    this.expanded.update(s => {
      const next = new Set(s);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  logout() {
    ['token', 'username', 'rol', 'roles', 'corte', 'avatarUrl'].forEach(k => localStorage.removeItem(k));
    this.router.navigateByUrl('/auth/login');
  }

  private readRolesFromStorage(): string[] {
    try { return JSON.parse(localStorage.getItem('roles') || '[]'); }
    catch { return []; }
  }

  avatarUrl = signal<string | null>(this.readAvatarUrl());

  onAvatarError() {
    this.avatarUrl.set(null);
  }

  private readAvatarUrl(): string | null {
    try {
      return localStorage.getItem('avatarUrl');
    } catch {
      return null;
    }
  }


  private roleMap: Record<string, string> = {
    'SPREC_ADMIN': 'Administrador',
    'SPREC_JUEZ': 'Juez',
    'SPREC_SECRETARIO': 'Secretario'
  };


  username = signal<string | null>(this.readUsernameFromStorage());
  rol = signal<string | null>(this.mapRolToUi(this.readRolFromStorage()));

  private mapRolToUi(rol: string | null): string | null {
    if (!rol) return null;
    return this.roleMap[rol] ?? rol; // si no lo encuentra, deja el original
  }


  private readUsernameFromStorage(): string | null {
    try { return localStorage.getItem('username'); }
    catch { return null; }
  }

  private readRolFromStorage(): string | null {
    try { return localStorage.getItem('rol'); }
    catch { return null; }
  }

  goToMantUser() {
    this.router.navigateByUrl('/mant-user');
  }

}


