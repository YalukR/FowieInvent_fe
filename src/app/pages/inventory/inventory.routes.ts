// inventory.routes.ts
import { Routes } from '@angular/router';
import { Inventory } from './inventory';

export default [
    {
        path: '',
        component: Inventory,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', loadComponent: () => import('./i-dashboard/i-dashboard').then(m => m.IDashboard) },
        ]
    },
] as Routes;