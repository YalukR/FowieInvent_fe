import { Component, inject } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StyleClassModule } from 'primeng/styleclass';
import { AppConfigurator } from './app.configurator';
import { LayoutService } from '@/app/layout/service/layout.service';
import { DrawerModule } from 'primeng/drawer';
import { AuthService } from '@/app/core/service/auth.service';

@Component({
    selector: 'app-topbar',
    standalone: true,
    imports: [RouterModule, CommonModule, StyleClassModule, AppConfigurator, DrawerModule],
    template: `
    <div class="layout-topbar">
        <div class="layout-topbar-logo-container">
            <button class="layout-menu-button layout-topbar-action" (click)="layoutService.onMenuToggle()">
                <i class="pi pi-bars"></i>
            </button>
            <a class="layout-topbar-logo" routerLink="/sistema">
                <span class="w-2rem h-2rem border-circle bg-primary flex align-items-center justify-content-center">
                    <i class="pi pi-box text-white text-xs"></i>
                </span>
                <span>FowieInvent</span>
            </a>
        </div>

        <div class="layout-topbar-actions">
            <div class="layout-config-menu">
                <button type="button" class="layout-topbar-action" (click)="toggleDarkMode()">
                    <i [ngClass]="{ 'pi': true, 'pi-moon': layoutService.isDarkTheme(), 'pi-sun': !layoutService.isDarkTheme() }"></i>
                </button>
            <div class="relative">
                <button type="button" class="layout-topbar-action layout-topbar-action-highlight"
                    pStyleClass="@next"
                    enterFromClass="hidden" enterActiveClass="animate-scalein"
                    leaveToClass="hidden" leaveActiveClass="animate-fadeout"
                    [hideOnOutsideClick]="true">
                    <i class="pi pi-palette"></i>
                </button>
                <app-configurator />
            </div>

            <button class="layout-topbar-menu-button layout-topbar-action" pStyleClass="@next"
                enterFromClass="hidden" enterActiveClass="animate-scalein"
                leaveToClass="hidden" leaveActiveClass="animate-fadeout"
                [hideOnOutsideClick]="true">
                <i class="pi pi-ellipsis-v"></i>
            </button>

            <div class="layout-topbar-menu hidden lg:block">
                <div class="layout-topbar-menu-content">

                    <!-- Usuario actual -->
                    @if (authService.currentUser(); as user) {
                    <div class="layout-topbar-action" style="cursor:default; gap: 0.5rem;">
                        <div style="width:2rem; height:2rem; border-radius:50%; background:var(--p-primary-500);
                            display:flex; align-items:center; justify-content:center; flex-shrink:0;">
                            <span style="color:white; font-size:0.7rem; font-weight:700;">
                                {{ user.email[0].toUpperCase() }}
                            </span>
                        </div>
                        <div style="display:flex; flex-direction:column; align-items:flex-start; line-height:1.2;">
                            <span style="font-size:0.8rem; font-weight:600;">{{ user.email }}</span>
                            <span style="font-size:0.7rem; opacity:0.6;">{{ user.rol }}</span>
                        </div>
                    </div>
                    }

                    <!-- Logout -->
                    <button type="button" class="layout-topbar-action" (click)="logout()"
                        style="color: var(--p-red-500);">
                        <i class="pi pi-sign-out"></i>
                        <span>Salir</span>
                    </button>

                </div>
            </div>
        </div>
    </div>`
})
export class AppTopbar {
    items!: MenuItem[];
    configVisible = false;

    layoutService = inject(LayoutService);
    authService = inject(AuthService);

    toggleDarkMode() {
        this.layoutService.layoutConfig.update(state => ({
            ...state,
            darkTheme: !state.darkTheme
        }));
    }

    logout() {
        this.authService.logout();
    }
}