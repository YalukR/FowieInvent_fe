import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { SkeletonModule } from 'primeng/skeleton';
import { MessageModule } from 'primeng/message';
import { INav } from '../i-nav/i-nav';
import { ICmodal } from './i-cmodal/i-cmodal';
import { InventoryService } from '../../../core/service/inventory.service';
import { InventoryStateService } from '@/app/core/service/inventory-state.service';
import { ConfirmService } from '../../../core/service/confirm.service';
import { Categoria } from '../../../core/models/inventory.models';
import { Router } from '@angular/router';
import { Subscription, forkJoin } from 'rxjs';

@Component({
  selector: 'app-i-categories',
  standalone: true,
  imports: [
    CommonModule, TableModule, TagModule, ButtonModule,
    InputTextModule, IconFieldModule, InputIconModule,
    SkeletonModule, MessageModule, INav, ICmodal,
  ],
  templateUrl: './i-categories.html',
  styleUrl: './i-categories.scss',
})
export class ICategories implements OnInit, OnDestroy {

  private inventoryService = inject(InventoryService);
  private inventoryState = inject(InventoryStateService);
  private confirmService = inject(ConfirmService);
  private router = inject(Router);

  private sub = new Subscription();

  categorias: Categoria[] = [];
  productosCount: Record<string, number | undefined> = {}; 
  loading = true;
  error: string | null = null;
  skeletonRows = Array(8);

  modalVisible = false;
  selectedCategoria: Categoria | null = null;

  ngOnInit() {
    this.loadData();
    this.sub.add(
      this.inventoryState.openCreateCategoria$.subscribe(() => this.openCreate())
    );
  }

  ngOnDestroy() { this.sub.unsubscribe(); }

  loadData() {
    this.loading = true;
    this.error = null;
    forkJoin({
      categorias: this.inventoryService.getCategorias(),
      productos: this.inventoryService.getProductos(),
    }).subscribe({
      next: ({ categorias, productos }) => {
        this.categorias = categorias;
        this.productosCount = {};
        for (const p of productos) {
          const cid = p.categoria?.id;
          if (cid) this.productosCount[cid] = (this.productosCount[cid] ?? 0) + 1;
        }
        this.loading = false;
      },
      error: () => {
        this.error = 'No se pudieron cargar las categorías.';
        this.loading = false;
      },
    });
  }

  openDetail(categoria: Categoria) {
    this.router.navigate(['/system/inventory/categories', categoria.id], {
      state: { categoria }
    });
  }

  openCreate() {
    this.selectedCategoria = null;
    this.modalVisible = true;
  }

  openEdit(categoria: Categoria) {
    this.selectedCategoria = categoria;
    this.modalVisible = true;
  }

  onModalClosed() {
    this.modalVisible = false;
    this.selectedCategoria = null;
  }

  onModalSaved(categoria: Categoria) {
    const idx = this.categorias.findIndex(c => c.id === categoria.id);
    if (idx >= 0) {
      this.categorias = [
        ...this.categorias.slice(0, idx),
        categoria,
        ...this.categorias.slice(idx + 1),
      ];
    } else {
      this.categorias = [categoria, ...this.categorias];
      this.productosCount[categoria.id] = 0;
    }
    this.modalVisible = false;
    this.selectedCategoria = null;
  }

  onDelete(categoria: Categoria) {
    this.confirmService.delete({
      nombre: categoria.nombre,
      onAccept: () => {
        this.inventoryService.deleteCategoria(categoria.id).subscribe({
          next: () => {
            this.categorias = this.categorias.filter(c => c.id !== categoria.id);
            delete this.productosCount[categoria.id];
          },
          error: () => {
            this.error = 'No se pudo eliminar. Intenta de nuevo.';
          },
        });
      }
    });
  }
}