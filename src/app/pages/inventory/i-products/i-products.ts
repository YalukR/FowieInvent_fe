import { Component, OnInit, OnDestroy, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { SkeletonModule } from 'primeng/skeleton';
import { MessageModule } from 'primeng/message';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';
import { IModal } from './i-pmodal/i-modal';
import { InventoryService } from '../../../core/service/inventory.service';
import { ConfirmService } from '../../../core/service/confirm.service';
import { Producto } from '../../../core/models/inventory.models';
import { InventoryStateService } from '@/app/core/service/inventory-state.service';
import { Subscription } from 'rxjs';
import { INav } from '../i-nav/i-nav';
import { Router } from '@angular/router';

@Component({
  selector: 'app-i-products',
  standalone: true,
  imports: [
    CommonModule, FormsModule, TableModule, TagModule, ButtonModule,
    InputTextModule, IconFieldModule, InputIconModule,
    SkeletonModule, MessageModule, SelectButtonModule, IModal, INav,
  ],
  templateUrl: './i-products.html',
  styleUrl: './i-products.scss',
})
export class IProducts implements OnInit, OnDestroy {

  private inventoryService = inject(InventoryService);
  private confirmService = inject(ConfirmService);
  private inventoryState = inject(InventoryStateService);
  private cdr = inject(ChangeDetectorRef);
  private router = inject(Router);
  private sub = new Subscription();

  productos: Producto[] = [];
  loading = true;
  error: string | null = null;
  skeletonRows = Array(10);

  modalVisible = false;
  selectedProducto: Producto | null = null;

  filtroActivo: 'todos' | 'activos' | 'inactivos' = 'todos';
  filtroOpciones = [
    { label: 'Todos', value: 'todos' },
    { label: 'Activos', value: 'activos' },
    { label: 'Inactivos', value: 'inactivos' },
  ];

  get productosFiltrados(): Producto[] {
    if (this.filtroActivo === 'activos') return this.productos.filter(p => p.activo);
    if (this.filtroActivo === 'inactivos') return this.productos.filter(p => !p.activo);
    return this.productos;
  }

  ngOnInit() {
    this.loadProductos();
    this.sub.add(
      this.inventoryState.openCreateProducto$.subscribe(() => this.openCreate())
    );
  }

  ngOnDestroy() { this.sub.unsubscribe(); }

  loadProductos() {
    this.loading = true;
    this.error = null;
    this.inventoryService.getProductos().subscribe({
      next: productos => {
        this.productos = productos;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'No se pudieron cargar los productos.';
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }

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

  openDetail(producto: Producto) {
    this.router.navigate(['/system/inventory/products', producto.id], {
      state: { producto }
    });
  }

  onModalSaved(producto: Producto) {
    const idx = this.productos.findIndex(p => p.id === producto.id);
    if (idx >= 0) {
      this.productos = [
        ...this.productos.slice(0, idx),
        producto,
        ...this.productos.slice(idx + 1),
      ];
    } else {
      this.productos = [producto, ...this.productos];
    }
    this.modalVisible = false;
    this.selectedProducto = null;
  }

  onDelete(producto: Producto) {
    this.confirmService.delete({
      nombre: producto.nombre,
      onAccept: () => {
        this.inventoryService.deleteProducto(producto.id).subscribe({
          next: () => {
            this.productos = this.productos.filter(p => p.id !== producto.id);
          },
          error: () => {
            this.error = 'No se pudo eliminar. Intenta de nuevo.';
          },
        });
      }
    });
  }

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