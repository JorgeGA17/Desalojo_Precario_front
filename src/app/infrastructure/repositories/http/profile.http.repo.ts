// =========================================
// ADAPTADOR SECUNDARIO (HTTP Repository)
// - Implementa PUERTO DE SALIDA (ProfileRepositoryPort)
// - Los Casos de Uso dependen de esta abstracción (DIP - SOLID)
// - Aquí se hace la llamada real a la API REST
// - Sin @Injectable y sin tokens: se instancia manualmente en la UI
// - RxJS moderno (firstValueFrom)
// =========================================
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

// ⬇️ desde .../http/ → a /src/environments  (4 niveles)
import { environment } from '../../../../environments/environment';

// ⬇️ desde .../http/ → a /app/domain (3 niveles)
import { ProfileRepositoryPort } from '../../../domain/ports/output/profile.repo';
import { ChangePasswordDto } from '../../../domain/dto/change-password.dto';
import { UserProfile } from '../../../domain/models/user-profile.model';
import { UpdateProfileDto } from '../../../domain/dto/update-profile.dto';

export class ProfileHttpRepository implements ProfileRepositoryPort {
  private readonly api = `${environment.apiUrl}/profile`;

  constructor(private http: HttpClient) { }

  // ✅ Obtener perfil del usuario autenticado
  async getMyProfile(): Promise<UserProfile> {
    const res: any = await firstValueFrom(
      this.http.get(`${environment.apiUrl}/usuarios/me`)
    );

    return {
      id: res.c_codigo,
      username: res.x_usuario,
      fullName: res.x_nombre,
      email: res.x_email,
      distrito: res.c_distrito
    };
  }

  // ✅ Actualizar perfil // se cambio esto para la actualización del perfil
  async updateMyProfile(dto: UpdateProfileDto): Promise<UserProfile> {
    const res: any = await firstValueFrom(
      this.http.put(`${environment.apiUrl}/usuarios/me`, {
        fullName: dto.fullName,
        email: dto.email,
      }, {
        headers: { 'Content-Type': 'application/json' } // ⚡ importante
      })
    );

    return {
      id: res.c_codigo,
      username: res.x_usuario,
      fullName: res.x_nombre,
      email: res.x_email,
      distrito: res.c_distrito
    };
  }


  // ✅ Cambiar contraseña
  async changeMyPassword(dto: ChangePasswordDto): Promise<void> {
    await firstValueFrom(
      this.http.post<void>(`${this.api}/change-password`, dto)
    );
  }
}
