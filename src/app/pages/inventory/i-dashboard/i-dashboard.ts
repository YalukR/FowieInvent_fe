// src/app/pages/inventory/i-dashboard/i-dashboard.ts
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-i-dashboard',
    standalone: true,
    imports: [
        ButtonModule,
    ],
    templateUrl: './i-dashboard.html',
    styleUrl: './i-dashboard.scss',
})
export class IDashboard {

}