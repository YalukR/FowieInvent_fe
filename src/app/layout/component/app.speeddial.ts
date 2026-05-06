// src/app/layout/component/app.speeddial.ts
import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SpeedDialModule } from 'primeng/speeddial';
import { ToastModule } from 'primeng/toast';
import { MenuItem, MessageService } from 'primeng/api';

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
            [style]="{ position: 'fixed', right: '2rem', bottom: '2rem', zIndex: 1000 }">
        </p-speeddial>
    `
})
export class AppSpeeddial implements OnInit {
    private messageService = inject(MessageService);

    items: MenuItem[] = [];

    ngOnInit() {
        this.items = [
            {
                icon: 'pi pi-plus',
                tooltipOptions: { tooltipLabel: 'Nuevo producto' },
                command: () => {
                    this.messageService.add({ severity: 'info', summary: 'Nuevo', detail: 'Próximamente' });
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