export interface Categoria {
    id: string;
    tenant: string;
    nombre: string;
    activo: boolean;
}

export interface Producto {
    id: string;
    tenant: string;
    categoria: Categoria;       // objeto anidado (read)
    categoria_id?: string;      // UUID plano (write)
    nombre: string;
    unidad_medida: string;
    stock_actual: number;
    stock_minimo: number;
    activo: boolean;
    created_at: string;
}

export interface Movimiento {
    id: string;
    producto: string;           // UUID (el serializer no anida producto)
    usuario: string;            // UUID — read_only, lo asigna el back
    tipo: 'entrada' | 'salida';
    cantidad: number;
    motivo: string;
    fecha: string;              // read_only, lo asigna el back
}

// ── DTOs para crear / editar ──────────────────────────────────────────────────

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

export interface CreateCategoriaDto {
    nombre: string;
}

export interface CreateMovimientoDto {
    producto: string;           // UUID del producto
    tipo: 'entrada' | 'salida';
    cantidad: number;
    motivo?: string;
}