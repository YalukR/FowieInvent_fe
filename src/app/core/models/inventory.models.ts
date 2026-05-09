// src/app/core/models/inventory.models.ts
export interface Categoria {
    id: string;
    tenant?: string;
    nombre: string;
    activo: boolean;
}

export interface Producto {
    id: string;
    tenant?: string;
    categoria: Categoria;
    categoria_id?: string;
    nombre: string;
    unidad_medida: string;
    stock_actual: number;
    stock_minimo: number;
    activo: boolean;
    created_at: string;
}

export interface Movimiento {
    id: string;
    producto: string;
    usuario: string;
    tipo: 'entrada' | 'salida';
    cantidad: number;
    motivo: string;
    fecha: string;
}

// ── DTOs ──────────────────────────────────────────────────────────────────────

export interface CreateCategoriaDto {
    nombre: string;
}

export interface UpdateCategoriaDto {
    nombre?: string;
    activo?: boolean;
}

export interface CreateProductoDto {
    nombre: string;
    categoria_id: string;
    unidad_medida: string;
    stock_actual?: number;
    stock_minimo?: number;
}

export interface UpdateProductoDto extends Partial<CreateProductoDto> {
    activo?: boolean;
}

export interface CreateMovimientoDto {
    producto: string;
    tipo: 'entrada' | 'salida';
    cantidad: number;
    motivo?: string;
}