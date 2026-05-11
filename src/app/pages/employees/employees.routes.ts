import { Routes } from '@angular/router';
import { Employees } from './employees';

export default [
    {
        path: '',
        component: Employees,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
        ]
    },
] as Routes;