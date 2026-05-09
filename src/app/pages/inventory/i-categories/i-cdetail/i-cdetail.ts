// src/app/pages/inventory/i-categories/i-cdetail/i-cdetail.ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton';
import { MessageModule } from 'primeng/message';
import { DividerModule } from 'primeng/divider';
import { INav } from '../../i-nav/i-nav';
import { ICmodal } from '../i-cmodal/i-cmodal';
import { InventoryService } from '../../../../core/service/inventory.service';
import { ConfirmService } from '../../../../core/service/confirm.service';
import { Categoria } from '../../../../core/models/inventory.models';

@Component({
    selector: 'app-i-cdetail',
    standalone: true,
    imports: [
        CommonModule, ButtonModule, SkeletonModule,
        MessageModule, DividerModule, INav, ICmodal,
    ],
    templateUrl: './i-cdetail.html',
})
export class ICdetail implements OnInit {

    private route            = inject(ActivatedRoute);
    private router           = inject(Router);
    private inventoryService = inject(InventoryService);
    private confirmService   = inject(ConfirmService);

    // ── Estado ────────────────────────────────────────────────────────────────
    categoria: Categoria | null = null;
    loading = true;
    error: string | null = null;

    // ── Modal ─────────────────────────────────────────────────────────────────
    modalVisible = false;

    // ── Init ──────────────────────────────────────────────────────────────────

    ngOnInit() {
        const nav   = this.router.getCurrentNavigation();
        const state = nav?.extras?.state as { categoria?: Categoria };

        if (state?.categoria) {
            this.categoria = state.categoria;
            this.loading   = false;
        } else {
            const id = this.route.snapshot.paramMap.get('id');
            if (id) this.loadCategoria(id);
            else {
                this.error   = 'ID de categoría no encontrado.';
                this.loading = false;
            }
        }
    }

    loadCategoria(id: string) {
        this.loading = true;
        this.error   = null;
        // No hay getCategoria(id) en el service — cargamos todas y filtramos
        this.inventoryService.getCategorias().subscribe({
            next: cats => {
                this.categoria = cats.find(c => c.id === id) ?? null;
                if (!this.categoria) this.error = 'Categoría no encontrada.';
                this.loading = false;
            },
            error: () => {
                this.error   = 'No se pudo cargar la categoría.';
                this.loading = false;
            },
        });
    }

    // ── Modal ─────────────────────────────────────────────────────────────────

    openEdit() { this.modalVisible = true; }

    onModalClosed() { this.modalVisible = false; }

    onModalSaved(categoria: Categoria) {
        this.categoria   = categoria;
        this.modalVisible = false;
    }

    // ── Eliminar ──────────────────────────────────────────────────────────────

    onDelete() {
        if (!this.categoria) return;
        this.confirmService.delete({
            nombre: this.categoria.nombre,
            onAccept: () => {
                this.inventoryService.deleteCategoria(this.categoria!.id).subscribe({
                    next: () => this.router.navigate(['/inventory/categories']),
                    error: () => this.error = 'No se pudo eliminar. Intenta de nuevo.',
                });
            }
        });
    }
}