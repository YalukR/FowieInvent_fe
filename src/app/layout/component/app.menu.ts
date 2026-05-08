import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [CommonModule, AppMenuitem, RouterModule],
    template: `<ul class="layout-menu">
        @for (item of model; track item.label) {
            @if (!item.separator) {
                <li app-menuitem [item]="item" [root]="true"></li>
            } @else {
                <li class="menu-separator"></li>
            }
        }
    </ul>`,
})
export class AppMenu {
    model: MenuItem[] = [];

    ngOnInit() {
        this.model = [
            {
                label: 'General',
                items: [
                    { label: 'Inicio', icon: 'pi pi-fw pi-home', routerLink: ['/system'] },
                ]
            },
            {
                label: 'Módulos',
                items: [
                    {
                        label: 'Inventario',
                        icon: 'pi pi-fw pi-box',
                        path: '/system/inventory',
                        items: [
                            {
                                label: 'Panel',
                                icon: 'pi pi-fw pi-chart-bar',
                                path: '/dashboard',
                                routerLink: ['/system/inventory']
                            },
                            {
                                label: 'Productos',
                                icon: 'pi pi-fw pi-chart-bar',
                                path: '/products',
                                routerLink: ['/system/inventory/products']
                            },
                        ]
                    },
                    { label: 'Punto de venta', icon: 'pi pi-fw pi-shopping-cart', disabled: true },
                    { label: 'Personal', icon: 'pi pi-fw pi-users', disabled: true },
                ]
            },
            {
                label: 'Configuración',
                items: [
                    { label: 'Mi negocio', icon: 'pi pi-fw pi-building', routerLink: ['/system/bussines'] },
                    { label: 'Usuarios y roles', icon: 'pi pi-fw pi-shield', routerLink: ['/system/users'] },
                ]
            },
        ];
    }
}