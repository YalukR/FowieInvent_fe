import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'

@Injectable({ providedIn: 'root' })
export class InventoryStateService {
    private _openCreateProducto$ = new Subject<void>();
    readonly openCreateProducto$ = this._openCreateProducto$.asObservable();

    triggerCreateProducto() {
        this._openCreateProducto$.next();
    }
}