export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    nombre: string;
    apellido: string;
    email: string;
    password: string;
    nombre_negocio: string;
    plan_id?: string;
}

export interface AuthTokens {
    access: string;
    refresh: string;
}

export interface PermisoNav {
  codigo: string;
  modulo: string;
  submodulo: string;
  ruta: string;
  icono: string;
}

export interface AuthUser {
  id: string;
  email: string;
  tenant: string;
  rol: string;
  permisos: PermisoNav[];
}

export interface AuthResponse extends AuthTokens {
    user?: AuthUser;
}