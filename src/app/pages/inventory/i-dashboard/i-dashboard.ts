// src/app/pages/inventory/i-dashboard/i-dashboard.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-i-dashboard',
    standalone: true,
    imports: [ButtonModule],
    templateUrl: './i-dashboard.html',
    styleUrl: './i-dashboard.scss',
})
export class IDashboard {

    constructor(private router: Router) {}

    goToProductos() {
        this.router.navigate(['/system/inventory/products']);
    }
}