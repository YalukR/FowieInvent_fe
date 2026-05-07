// src/app/pages/home/home.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { DividerModule } from 'primeng/divider';
import { AuthService } from '../../core/service/auth.service';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule, RouterModule, ButtonModule, CardModule, TagModule, DividerModule],
    templateUrl: './home.html',
})
export class Home {
    authService = inject(AuthService);

    moduleCards = [
        {
            icon: 'pi-box',
            title: 'Inventario',
            desc: 'Control de productos, movimientos, categorías y alertas de stock.',
            status: 'En desarrollo',
            active: true,
            route: '/system/inventory/',
        },
        {
            icon: 'pi-shopping-cart',
            title: 'Punto de venta',
            desc: 'Registra ventas y descuenta stock automáticamente.',
            status: 'Próximamente',
            active: false,
            route: null,
        },
        {
            icon: 'pi-users',
            title: 'Personal',
            desc: 'Gestión de empleados y trazabilidad de movimientos por usuario.',
            status: 'Próximamente',
            active: false,
            route: null,
        },
    ];
}