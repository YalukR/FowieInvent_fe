// src/app/core/service/inventory-state.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class InventoryStateService {

    private _openCreateProducto$ = new Subject<void>();
    private _openCreateCategoria$ = new Subject<void>();

    readonly openCreateProducto$ = this._openCreateProducto$.asObservable();
    readonly openCreateCategoria$ = this._openCreateCategoria$.asObservable();

    triggerCreateProducto() { this._openCreateProducto$.next(); }
    triggerCreateCategoria() { this._openCreateCategoria$.next(); }
}