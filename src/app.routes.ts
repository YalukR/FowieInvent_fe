// app.routes.ts
import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Landing } from './app/pages/landing/landing';
import { Notfound } from './app/pages/notfound/notfound';
import { authGuard } from './app/core/guards/auth.guard';

export const appRoutes: Routes = [
    // ── Pública: landing ─────────────────────────────────────────────────────
    {
        path: '',
        component: Landing,
    },

    // ── Autenticada: sistema ──────────────────────────────────────────────────
    {
        path: 'sistema',
        component: AppLayout,
        canActivate: [authGuard],
        children: [
            {
                path: '',
                loadComponent: () => import('./app/pages/home/home').then(m => m.Home),
            },
            // Aquí irán los demás módulos
            // { path: 'inventario', loadChildren: () => import('./app/pages/inventario/inventario.routes') },
        ],
    },

    // ── Auth ──────────────────────────────────────────────────────────────────
    {
        path: 'auth',
        loadChildren: () => import('./app/pages/auth/auth.routes'),
    },

    // ── Fallback ──────────────────────────────────────────────────────────────
    { path: 'notfound', component: Notfound },
    { path: '**', redirectTo: '/notfound' },
];