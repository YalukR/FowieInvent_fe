import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { DividerModule } from 'primeng/divider';
import { AppFloatingConfigurator } from '../../layout/component/app.floatingconfigurator';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [ButtonModule, CheckboxModule, InputTextModule, PasswordModule, FormsModule, RouterModule, RippleModule, DividerModule, AppFloatingConfigurator],
    template: `
        <app-floating-configurator />
        <div class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-screen overflow-hidden">
            <div class="flex flex-col items-center justify-center">
                <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                    <div class="w-full bg-surface-0 dark:bg-surface-900 py-12 px-8 sm:px-20" style="border-radius: 53px">

                        <div class="text-center mb-8">
                            <div class="text-surface-900 dark:text-surface-0 text-3xl font-medium mb-2">Crear cuenta</div>
                            <span class="text-muted-color font-medium">FowieInvent · ShaulaTec</span>
                        </div>

                        <div class="flex flex-col gap-4">

                            <div class="flex gap-4">
                                <div class="flex flex-col gap-2 flex-1">
                                    <label class="block text-surface-900 dark:text-surface-0 font-medium">Nombre</label>
                                    <input pInputText type="text" placeholder="Juan" class="w-full" [(ngModel)]="nombre" />
                                </div>
                                <div class="flex flex-col gap-2 flex-1">
                                    <label class="block text-surface-900 dark:text-surface-0 font-medium">Apellido</label>
                                    <input pInputText type="text" placeholder="García" class="w-full" [(ngModel)]="apellido" />
                                </div>
                            </div>

                            <div class="flex flex-col gap-2">
                                <label class="block text-surface-900 dark:text-surface-0 font-medium">Correo electrónico</label>
                                <input pInputText type="email" placeholder="correo@ejemplo.com" class="w-full" [(ngModel)]="email" />
                            </div>

                            <div class="flex flex-col gap-2">
                                <label class="block text-surface-900 dark:text-surface-0 font-medium">Nombre del negocio</label>
                                <input pInputText type="text" placeholder="Mi Tienda S.A." class="w-full" [(ngModel)]="negocio" />
                            </div>

                            <div class="flex flex-col gap-2">
                                <label class="block text-surface-900 dark:text-surface-0 font-medium">Contraseña</label>
                                <p-password [(ngModel)]="password" placeholder="Contraseña" [toggleMask]="true" [fluid]="true" promptLabel="Ingresa una contraseña" weakLabel="Débil" mediumLabel="Media" strongLabel="Fuerte"></p-password>
                            </div>

                            <div class="flex flex-col gap-2">
                                <label class="block text-surface-900 dark:text-surface-0 font-medium">Confirmar contraseña</label>
                                <p-password [(ngModel)]="confirmPassword" placeholder="Repite tu contraseña" [toggleMask]="true" [fluid]="true" [feedback]="false"></p-password>
                            </div>

                            <div class="flex items-center gap-2 mt-2">
                                <p-checkbox [(ngModel)]="aceptaTerminos" id="terminos" binary></p-checkbox>
                                <label for="terminos" class="text-sm text-muted-color">
                                    Acepto los <a class="text-primary cursor-pointer font-medium">términos de servicio</a> y la <a class="text-primary cursor-pointer font-medium">política de privacidad</a>
                                </label>
                            </div>

                            <p-button label="Crear cuenta" styleClass="w-full mt-2" [disabled]="!aceptaTerminos" (onClick)="onRegister()"></p-button>

                            <p-divider></p-divider>

                            <div class="text-center text-muted-color text-sm">
                                ¿Ya tienes cuenta?
                                <a routerLink="/auth/login" class="text-primary font-medium cursor-pointer ml-1">Inicia sesión</a>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
})
export class Register {
    nombre = '';
    apellido = '';
    email = '';
    negocio = '';
    password = '';
    confirmPassword = '';
    aceptaTerminos = false;

    onRegister() {
        // TODO: conectar con el backend
        console.log({ nombre: this.nombre, apellido: this.apellido, email: this.email, negocio: this.negocio });
    }
}