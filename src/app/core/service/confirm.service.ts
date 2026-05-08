import { Injectable, inject } from '@angular/core';
import { ConfirmationService } from 'primeng/api';

@Injectable({ providedIn: 'root' })
export class ConfirmService {

    private cs = inject(ConfirmationService);

    delete(options: {
        nombre: string;          // nombre del item a eliminar
        onAccept: () => void;
        onReject?: () => void;
    }) {
        this.cs.confirm({
            header:  '¿Eliminar?',
            message: `Estás a punto de eliminar <strong>${options.nombre}</strong>. Esta acción no se puede deshacer.`,
            icon:    'pi pi-exclamation-triangle',
            acceptLabel:        'Sí, eliminar',
            rejectLabel:        'Cancelar',
            acceptButtonStyleClass: 'p-button-danger',
            rejectButtonStyleClass: 'p-button-secondary p-button-outlined',
            accept: options.onAccept,
            reject: options.onReject,
        });
    }
}