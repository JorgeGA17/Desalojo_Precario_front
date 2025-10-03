// =========================================
// DOMAIN MODEL (Entidad de negocio)
// - Representa el perfil del usuario
// - No depende de Angular ni Infraestructura
// =========================================
export interface UserProfile {
  id: number;
  username: string;
  fullName: string;
  email: string;
  distrito: number;
}