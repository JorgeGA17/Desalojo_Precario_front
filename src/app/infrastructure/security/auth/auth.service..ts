import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

interface LoginResp { 
  access_token: string;   
  token_type: 'bearer';   
  rol: string;            
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private base = `${environment.apiUrl.replace(/\/$/, '')}/sisprecario-api/authenticate`;

  constructor(private http: HttpClient) {}

  login(username: string, password: string, corte?: string): Observable<void> {
    return this.http.post<LoginResp>(`${this.base}/login`, { username, password }).pipe(
      tap(res => {
        localStorage.setItem('token', res.access_token);
        localStorage.setItem('username', username);
        localStorage.setItem('rol', res.rol);
        localStorage.setItem('roles', JSON.stringify(this.mapBackendRolToUi(res.rol)));
      }),
      map(() => void 0), 
    );
  }

  logout() { ['token','username','rol','roles','corte'].forEach(k => localStorage.removeItem(k)); }
   
  getToken()      { return localStorage.getItem('token'); }
  getUsername()   { return localStorage.getItem('username'); }
  getBackendRol() { return localStorage.getItem('rol'); }
  getUiRoles(): string[] { 
    try { return JSON.parse(localStorage.getItem('roles') ?? '[]'); }
    catch { return []; } }
   
  isLoggedIn()    { return !!this.getToken(); }

  private mapBackendRolToUi(c_rol: string | null): string[] {
    switch (c_rol) {
      case 'SPREC_ADMIN':      return ['ADMIN','CIVIL','LECTOR'];
      case 'SPREC_JUEZ':       return ['JUEZ'];
      case 'SPREC_SECRETARIO': return ['SECRETARIO'];
      default:                 return [];
    }
  }
}
