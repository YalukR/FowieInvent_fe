// src/app/layout/component/app.speeddial.ts
import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SpeedDialModule } from 'primeng/speeddial';
import { ToastModule } from 'primeng/toast';
import { MenuItem, MessageService } from 'primeng/api';
import { InventoryStateService } from '@/app/core/service/inventory-state.service';

@Component({
    selector: 'app-speeddial',
    standalone: true,
    imports: [SpeedDialModule, ToastModule, RouterModule],
    providers: [MessageService],
    template: `
        <p-toast />
        <p-speeddial
            [model]="items"
            direction="up"
            buttonClassName="speeddial-main-btn"
            [style]="{ position: 'fixed', right: '2rem', bottom: '2rem', zIndex: 1000 }">
        </p-speeddial>

        <style>
            .speeddial-main-btn {
                width: 4rem !important;
                height: 4rem !important;
            }
            .speeddial-main-btn .p-button-icon {
                font-size: 1.5rem !important;
            }
            .p-speeddial-action {
                width: 3.5rem !important;
                height: 3.5rem !important;
            }
            .p-speeddial-action .p-speeddial-action-icon {
                font-size: 1.2rem !important;
            }
        </style>
`
})
export class AppSpeeddial implements OnInit {
    private messageService = inject(MessageService);
    private inventoryState = inject(InventoryStateService);
    items: MenuItem[] = [];

    ngOnInit() {
        this.items = [
            {
                icon: 'pi pi-plus',
                tooltipOptions: { tooltipLabel: 'Nuevo producto' },
                command: () => {
                    this.inventoryState.triggerCreateProducto()
                }
            },
            {
                icon: 'pi pi-arrow-right-arrow-left',
                tooltipOptions: { tooltipLabel: 'Nuevo movimiento' },
                command: () => {
                    this.messageService.add({ severity: 'info', summary: 'Movimiento', detail: 'Próximamente' });
                }
            },
            {
                icon: 'pi pi-file-export',
                tooltipOptions: { tooltipLabel: 'Exportar reporte' },
                command: () => {
                    this.messageService.add({ severity: 'info', summary: 'Exportar', detail: 'Próximamente' });
                }
            },
        ];
    }
}