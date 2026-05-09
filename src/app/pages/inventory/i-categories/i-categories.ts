// src/app/pages/inventory/i-categories/i-categories.ts
import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
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
import { InventoryService } from '../../../core/service/inventory.service';
import { ConfirmService } from '../../../core/service/confirm.service';
import { Categoria } from '../../../core/models/inventory.models';

@Component({
    selector: 'app-i-categories',
    standalone: true,
    imports: [
        CommonModule, TableModule, TagModule, ButtonModule,
        InputTextModule, IconFieldModule, InputIconModule,
        SkeletonModule, MessageModule, INav,
    ],
    templateUrl: './i-categories.html',
    styleUrl: './i-categories.scss',
})
export class ICategories implements OnInit {

    private inventoryService = inject(InventoryService);
    private confirmService   = inject(ConfirmService);
    private cdr              = inject(ChangeDetectorRef);

    // ── Estado ────────────────────────────────────────────────────────────────
    categorias: Categoria[] = [];
    loading = true;
    error: string | null = null;
    skeletonRows = Array(8);

    // ── Init ──────────────────────────────────────────────────────────────────

    ngOnInit() {
        this.loadCategorias();
    }

    loadCategorias() {
        this.loading = true;
        this.error = null;
        this.inventoryService.getCategorias().subscribe({
            next: categorias => {
                this.categorias = categorias;
                this.loading = false;
                this.cdr.markForCheck();
            },
            error: () => {
                this.error = 'No se pudieron cargar las categorías.';
                this.loading = false;
                this.cdr.markForCheck();
            },
        });
    }

    // ── Eliminar ──────────────────────────────────────────────────────────────

    onDelete(categoria: Categoria) {
        this.confirmService.delete({
            nombre: categoria.nombre,
            onAccept: () => {
                this.inventoryService.deleteCategoria(categoria.id).subscribe({
                    next: () => {
                        this.categorias = this.categorias.filter(c => c.id !== categoria.id);
                    },
                    error: () => {
                        this.error = 'No se pudo eliminar. Intenta de nuevo.';
                    },
                });
            }
        });
    }
}