// src/app/pages/inventory/i-products/i-pdetail/i-pdetail.ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { SkeletonModule } from 'primeng/skeleton';
import { MessageModule } from 'primeng/message';
import { DividerModule } from 'primeng/divider';
import { INav } from '../../i-nav/i-nav';
import { IModal } from '../i-pmodal/i-modal';
import { InventoryService } from '../../../../core/service/inventory.service';
import { ConfirmService } from '../../../../core/service/confirm.service';
import { Producto } from '../../../../core/models/inventory.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-i-pdetail',
  standalone: true,
  imports: [
    CommonModule, ButtonModule, TagModule,
    SkeletonModule, MessageModule, DividerModule,
    INav, IModal,
  ],
  templateUrl: './i-pdetail.html',
})
export class IPdetail implements OnInit {

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private inventoryService = inject(InventoryService);
  private confirmService = inject(ConfirmService);

  // ── Estado ────────────────────────────────────────────────────────────────
  producto: Producto | null = null;
  loading = true;
  error: string | null = null;

  // ── Modal editar ──────────────────────────────────────────────────────────
  modalVisible = false;

  // ── Init ──────────────────────────────────────────────────────────────────

  ngOnInit() {
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras?.state as { producto?: Producto };

    if (state?.producto) {
      this.producto = state.producto;
      this.loading = false;
    } else {
      // fallback: si llega directo por URL (bookmark, F5)
      const id = this.route.snapshot.paramMap.get('id');
      if (id) this.loadProducto(id);
    }
  }

  loadProducto(id: string) {
    this.loading = true;
    this.error = null;
    this.inventoryService.getProducto(id).subscribe({
      next: producto => {
        this.producto = producto;
        this.loading = false;
      },
      error: () => {
        this.error = 'No se pudo cargar el producto.';
        this.loading = false;
      },
    });
  }

  // ── Modal ─────────────────────────────────────────────────────────────────

  openEdit() {
    this.modalVisible = true;
  }

  onModalClosed() {
    this.modalVisible = false;
  }

  onModalSaved(producto: Producto) {
    this.producto = producto;
    this.modalVisible = false;
  }

  // ── Eliminar ──────────────────────────────────────────────────────────────

  onDelete() {
    if (!this.producto) return;
    this.confirmService.delete({
      nombre: this.producto.nombre,
      onAccept: () => {
        this.inventoryService.deleteProducto(this.producto!.id).subscribe({
          next: () => this.router.navigate(['/inventory/products']),
          error: () => this.error = 'No se pudo eliminar. Intenta de nuevo.',
        });
      }
    });
  }

  // ── Helpers ───────────────────────────────────────────────────────────────

  getStockSeverity(): 'success' | 'warn' | 'danger' {
    if (!this.producto) return 'danger';
    if (this.producto.stock_actual === 0) return 'danger';
    if (this.producto.stock_actual <= this.producto.stock_minimo) return 'warn';
    return 'success';
  }

  getStockLabel(): string {
    if (!this.producto) return '';
    if (this.producto.stock_actual === 0) return 'Sin stock';
    if (this.producto.stock_actual <= this.producto.stock_minimo) return 'Stock bajo';
    return 'OK';
  }
}