// src/app/pages/inventory/i-dashboard/i-dashboard.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { IModal } from '../i-modal/i-modal';
import { ConfirmService } from '../../../core/service/confirm.service';
import { Producto } from '../../../core/models/inventory.models';

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
    IModal,
  ],
  templateUrl: './i-dashboard.html',
  styleUrl: './i-dashboard.scss',
})
export class IDashboard {

  private confirmService = inject(ConfirmService);

  // ── Modal state ───────────────────────────────────────────────────────────
  modalVisible = false;
  selectedProducto: Producto | null = null;

  // ── Datos mock (reemplazar por service cuando el back esté listo) ─────────
  productos: Producto[] = [
    { id: '1', nombre: 'Laptop Dell XPS 13', categoria: { id: 'c1', tenant: 't1', nombre: 'Electrónica', activo: true }, unidad_medida: 'pieza', stock_actual: 12, stock_minimo: 5, activo: true, created_at: '2026-01-15' },
    { id: '2', nombre: 'Silla ergonómica', categoria: { id: 'c2', tenant: 't1', nombre: 'Mobiliario', activo: true }, unidad_medida: 'pieza', stock_actual: 3, stock_minimo: 5, activo: true, created_at: '2026-01-20' },
    { id: '3', nombre: 'Papel bond A4 (resma)', categoria: { id: 'c3', tenant: 't1', nombre: 'Papelería', activo: true }, unidad_medida: 'resma', stock_actual: 45, stock_minimo: 10, activo: true, created_at: '2026-02-01' },
    { id: '4', nombre: 'Monitor 24" LG', categoria: { id: 'c1', tenant: 't1', nombre: 'Electrónica', activo: true }, unidad_medida: 'pieza', stock_actual: 0, stock_minimo: 3, activo: true, created_at: '2026-02-10' },
    { id: '5', nombre: 'Teclado inalámbrico', categoria: { id: 'c1', tenant: 't1', nombre: 'Electrónica', activo: true }, unidad_medida: 'pieza', stock_actual: 8, stock_minimo: 4, activo: true, created_at: '2026-02-14' },
    { id: '6', nombre: 'Caja de bolígrafos', categoria: { id: 'c3', tenant: 't1', nombre: 'Papelería', activo: true }, unidad_medida: 'caja', stock_actual: 2, stock_minimo: 5, activo: false, created_at: '2026-03-01' },
    { id: '7', nombre: 'Escritorio modular', categoria: { id: 'c2', tenant: 't1', nombre: 'Mobiliario', activo: true }, unidad_medida: 'pieza', stock_actual: 6, stock_minimo: 2, activo: true, created_at: '2026-03-15' },
    { id: '8', nombre: 'Cargador USB-C 65W', categoria: { id: 'c1', tenant: 't1', nombre: 'Electrónica', activo: true }, unidad_medida: 'pieza', stock_actual: 15, stock_minimo: 6, activo: true, created_at: '2026-04-01' },
    { id: '9', nombre: 'Archivero 4 cajones', categoria: { id: 'c2', tenant: 't1', nombre: 'Mobiliario', activo: true }, unidad_medida: 'pieza', stock_actual: 1, stock_minimo: 2, activo: true, created_at: '2026-04-10' },
    { id: '10', nombre: 'Post-it bloc 100 hojas', categoria: { id: 'c3', tenant: 't1', nombre: 'Papelería', activo: true }, unidad_medida: 'bloc', stock_actual: 30, stock_minimo: 10, activo: true, created_at: '2026-04-20' },
  ];

  // ── Modal ─────────────────────────────────────────────────────────────────

  openCreate() {
    this.selectedProducto = null;
    this.modalVisible = true;
  }

  openEdit(producto: Producto) {
    this.selectedProducto = producto;
    this.modalVisible = true;
  }

  onModalClosed() {
    this.modalVisible = false;
    this.selectedProducto = null;
  }

  onModalSaved(producto: Producto) {
    const idx = this.productos.findIndex(p => p.id === producto.id);
    if (idx >= 0) {
      // Edición — reemplaza en la lista
      this.productos = [
        ...this.productos.slice(0, idx),
        producto,
        ...this.productos.slice(idx + 1),
      ];
    } else {
      // Creación — agrega al inicio
      this.productos = [producto, ...this.productos];
    }
    this.modalVisible = false;
    this.selectedProducto = null;
  }

  // ── Eliminar ──────────────────────────────────────────────────────────────

  onDelete(producto: Producto) {
    this.confirmService.delete({
      nombre: producto.nombre,
      onAccept: () => {
        // TODO: reemplazar por inventoryService.deleteProducto(producto.id)
        this.productos = this.productos.filter(p => p.id !== producto.id);
      }
    });
  }

  // ── Helpers ───────────────────────────────────────────────────────────────

  getStockSeverity(producto: Producto): 'success' | 'warn' | 'danger' {
    if (producto.stock_actual === 0) return 'danger';
    if (producto.stock_actual <= producto.stock_minimo) return 'warn';
    return 'success';
  }

  getStockLabel(producto: Producto): string {
    if (producto.stock_actual === 0) return 'Sin stock';
    if (producto.stock_actual <= producto.stock_minimo) return 'Stock bajo';
    return 'OK';
  }
}