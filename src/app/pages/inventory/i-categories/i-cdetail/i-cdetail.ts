import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton';
import { MessageModule } from 'primeng/message';
import { DividerModule } from 'primeng/divider';
import { TagModule } from 'primeng/tag';
import { INav } from '../../i-nav/i-nav';
import { ICmodal } from '../i-cmodal/i-cmodal';
import { InventoryService } from '../../../../core/service/inventory.service';
import { ConfirmService } from '../../../../core/service/confirm.service';
import { InventoryStateService } from '../../../../core/service/inventory-state.service';
import { Categoria, Producto } from '../../../../core/models/inventory.models';
import { Subscription, forkJoin } from 'rxjs';
import { TableModule } from 'primeng/table';

@Component({
    selector: 'app-i-cdetail',
    standalone: true,
    imports: [
        CommonModule, ButtonModule, SkeletonModule,
        MessageModule, DividerModule, TagModule, INav, ICmodal, TableModule,
    ],
    templateUrl: './i-cdetail.html',
})
export class ICdetail implements OnInit, OnDestroy {
    private route = inject(ActivatedRoute);
    private router = inject(Router);
    private inventoryService = inject(InventoryService);
    private confirmService = inject(ConfirmService);
    private inventoryState = inject(InventoryStateService);
    private sub = new Subscription();

    categoria: Categoria | null = null;
    productos: Producto[] = [];
    loading = true;
    error: string | null = null;
    modalVisible = false;

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        const state = history.state as { categoria?: Categoria };

        if (state?.categoria) {
            this.categoria = state.categoria;
            this.loadProductos(state.categoria.id);
        } else if (id) {
            this.loadAll(id);
        } else {
            this.error = 'ID de categoría no encontrado.';
            this.loading = false;
        }

        this.sub.add(this.inventoryState.openEditCategoria$.subscribe(() => this.openEdit()));
        this.sub.add(this.inventoryState.deleteCategoria$.subscribe(() => this.onDelete()));
    }

    ngOnDestroy() { this.sub.unsubscribe(); }

    loadAll(id: string) {
        this.loading = true;
        this.error = null;
        forkJoin({
            categorias: this.inventoryService.getCategorias(),
            productos: this.inventoryService.getProductos(),
        }).subscribe({
            next: ({ categorias, productos }) => {
                this.categoria = categorias.find(c => c.id === id) ?? null;
                if (!this.categoria) {
                    this.error = 'Categoría no encontrada.';
                } else {
                    this.productos = productos.filter(p => p.categoria.id === id);
                }
                this.loading = false;
            },
            error: () => {
                this.error = 'No se pudo cargar la información.';
                this.loading = false;
            },
        });
    }

    loadProductos(categoriaId: string) {
        this.loading = true;
        this.inventoryService.getProductos().subscribe({
            next: productos => {
                this.productos = productos.filter(p => p.categoria.id === categoriaId);
                this.loading = false;
            },
            error: () => {
                this.error = 'No se pudieron cargar los productos.';
                this.loading = false;
            },
        });
    }

    openEdit() { this.modalVisible = true; }
    onModalClosed() { this.modalVisible = false; }
    onModalSaved(categoria: Categoria) { this.categoria = categoria; this.modalVisible = false; }
    onDelete() {
        if (!this.categoria) return;

        const tieneProductosActivos = this.productos.some(p => p.activo);

        if (tieneProductosActivos) {
            this.confirmService.deleteWithInput({
                nombre: this.categoria.nombre,
                onAccept: () => {
                    this.inventoryService.deleteCategoria(this.categoria!.id).subscribe({
                        next: () => this.router.navigate(['/system/inventory/categories']),
                        error: () => this.error = 'No se pudo eliminar. Intenta de nuevo.',
                    });
                },
            });
        } else {
            this.confirmService.delete({
                nombre: this.categoria.nombre,
                onAccept: () => {
                    this.inventoryService.deleteCategoria(this.categoria!.id).subscribe({
                        next: () => this.router.navigate(['/system/inventory/categories']),
                        error: () => this.error = 'No se pudo eliminar. Intenta de nuevo.',
                    });
                },
            });
        }
    }
}