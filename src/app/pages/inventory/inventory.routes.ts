import { Routes } from '@angular/router';
import { Inventory } from './inventory';

export default [
    {
        path: '',
        component: Inventory,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', loadComponent: () => import('./i-dashboard/i-dashboard').then(m => m.IDashboard) },
            { path: 'products', loadComponent: () => import('./i-products/i-products').then(m => m.IProducts) },
            { path: 'detail', loadComponent: () => import('./i-detail/i-detail').then(m => m.IDetail) },
            { path: 'modal', loadComponent: () => import('./i-pmodal/i-modal').then(m => m.IModal) },
        ]
    },
] as Routes;