import { Routes } from '@angular/router';
import { Rbac } from './rbac';

export default [
    {
        path: '',
        component: Rbac,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', loadComponent: () => import('./rbac-dashboard/rbac-dashboard').then(m => m.RbacDashboard) },
            { path: 'dashboard', loadComponent: () => import('./rbac').then(m => m.Rbac) },
        ]
    },
] as Routes;