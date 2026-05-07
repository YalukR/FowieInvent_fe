// src/app/pages/inventory/i-dashboard/i-dashboard.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';

export interface Producto {
    id: string;
    nombre: string;
    categoria: string;
    unidad_medida: string;
    stock_actual: number;
    stock_minimo: number;
    activo: boolean;
    created_at: string;
}

@Component({
    selector: 'app-i-dashboard',
    standalone: true,
    imports: [
        CommonModule,
        TableModule,
        TagModule,
        ButtonModule,
        InputTextModule,
        IconFieldModule,
        InputIconModule,
    ],
    templateUrl: './i-dashboard.html',
    styleUrl: './i-dashboard.scss',
})
export class IDashboard {

    productos: Producto[] = [
        { id: '1', nombre: 'Laptop Dell XPS 13',       categoria: 'Electrónica',   unidad_medida: 'pieza',  stock_actual: 12, stock_minimo: 5,  activo: true,  created_at: '2026-01-15' },
        { id: '2', nombre: 'Silla ergonómica',          categoria: 'Mobiliario',    unidad_medida: 'pieza',  stock_actual: 3,  stock_minimo: 5,  activo: true,  created_at: '2026-01-20' },
        { id: '3', nombre: 'Papel bond A4 (resma)',     categoria: 'Papelería',     unidad_medida: 'resma',  stock_actual: 45, stock_minimo: 10, activo: true,  created_at: '2026-02-01' },
        { id: '4', nombre: 'Monitor 24" LG',            categoria: 'Electrónica',   unidad_medida: 'pieza',  stock_actual: 0,  stock_minimo: 3,  activo: true,  created_at: '2026-02-10' },
        { id: '5', nombre: 'Teclado inalámbrico',       categoria: 'Electrónica',   unidad_medida: 'pieza',  stock_actual: 8,  stock_minimo: 4,  activo: true,  created_at: '2026-02-14' },
        { id: '6', nombre: 'Caja de bolígrafos',        categoria: 'Papelería',     unidad_medida: 'caja',   stock_actual: 2,  stock_minimo: 5,  activo: false, created_at: '2026-03-01' },
        { id: '7', nombre: 'Escritorio modular',        categoria: 'Mobiliario',    unidad_medida: 'pieza',  stock_actual: 6,  stock_minimo: 2,  activo: true,  created_at: '2026-03-15' },
        { id: '8', nombre: 'Cargador USB-C 65W',        categoria: 'Electrónica',   unidad_medida: 'pieza',  stock_actual: 15, stock_minimo: 6,  activo: true,  created_at: '2026-04-01' },
        { id: '9', nombre: 'Archivero 4 cajones',       categoria: 'Mobiliario',    unidad_medida: 'pieza',  stock_actual: 1,  stock_minimo: 2,  activo: true,  created_at: '2026-04-10' },
        { id: '10', nombre: 'Post-it bloc 100 hojas',   categoria: 'Papelería',     unidad_medida: 'bloc',   stock_actual: 30, stock_minimo: 10, activo: true,  created_at: '2026-04-20' },
    ];

    // ── Helpers ───────────────────────────────────────────────────────────────

    getStockSeverity(producto: Producto): 'success' | 'warn' | 'danger' {
        if (producto.stock_actual === 0)                          return 'danger';
        if (producto.stock_actual <= producto.stock_minimo)       return 'warn';
        return 'success';
    }

    getStockLabel(producto: Producto): string {
        if (producto.stock_actual === 0)                          return 'Sin stock';
        if (producto.stock_actual <= producto.stock_minimo)       return 'Stock bajo';
        return 'OK';
    }
}