import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// PrimeNG
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { DrawerModule } from 'primeng/drawer';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { DividerModule } from 'primeng/divider';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenuItem } from 'primeng/api';
import { PrimeNG } from 'primeng/config';
import { TooltipModule } from 'primeng/tooltip';

type ColorScheme = 'light' | 'dark';
type PrimaryColor = { name: string; palette: Record<string, string> };

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule, RouterOutlet, FormsModule,
    ToolbarModule, ButtonModule, AvatarModule,
    DrawerModule, SelectButtonModule, ToggleSwitchModule,
    DividerModule, PanelMenuModule, TooltipModule
  ],
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss'],
})
export class AppLayoutComponent implements OnInit {

  configVisible = false;
  isDarkMode = false;

  colorScheme: ColorScheme = 'light';

  primaryColors: PrimaryColor[] = [
    { name: 'emerald', palette: { 50: '#ecfdf5', 100: '#d1fae5', 200: '#a7f3d0', 300: '#6ee7b7', 400: '#34d399', 500: '#10b981', 600: '#059669', 700: '#047857', 800: '#065f46', 900: '#064e3b', 950: '#022c22' } },
    { name: 'green', palette: { 50: '#f0fdf4', 100: '#dcfce7', 200: '#bbf7d0', 300: '#86efac', 400: '#4ade80', 500: '#22c55e', 600: '#16a34a', 700: '#15803d', 800: '#166534', 900: '#14532d', 950: '#052e16' } },
    { name: 'blue', palette: { 50: '#eff6ff', 100: '#dbeafe', 200: '#bfdbfe', 300: '#93c5fd', 400: '#60a5fa', 500: '#3b82f6', 600: '#2563eb', 700: '#1d4ed8', 800: '#1e40af', 900: '#1e3a8a', 950: '#172554' } },
    { name: 'indigo', palette: { 50: '#eef2ff', 100: '#e0e7ff', 200: '#c7d2fe', 300: '#a5b4fc', 400: '#818cf8', 500: '#6366f1', 600: '#4f46e5', 700: '#4338ca', 800: '#3730a3', 900: '#312e81', 950: '#1e1b4b' } },
    { name: 'violet', palette: { 50: '#f5f3ff', 100: '#ede9fe', 200: '#ddd6fe', 300: '#c4b5fd', 400: '#a78bfa', 500: '#8b5cf6', 600: '#7c3aed', 700: '#6d28d9', 800: '#5b21b6', 900: '#4c1d95', 950: '#2e1065' } },
    { name: 'purple', palette: { 50: '#faf5ff', 100: '#f3e8ff', 200: '#e9d5ff', 300: '#d8b4fe', 400: '#c084fc', 500: '#a855f7', 600: '#9333ea', 700: '#7e22ce', 800: '#6b21a8', 900: '#581c87', 950: '#3b0764' } },
    { name: 'pink', palette: { 50: '#fdf2f8', 100: '#fce7f3', 200: '#fbcfe8', 300: '#f9a8d4', 400: '#f472b6', 500: '#ec4899', 600: '#db2777', 700: '#be185d', 800: '#9d174d', 900: '#831843', 950: '#500724' } },
    { name: 'orange', palette: { 50: '#fff7ed', 100: '#ffedd5', 200: '#fed7aa', 300: '#fdba74', 400: '#fb923c', 500: '#f97316', 600: '#ea580c', 700: '#c2410c', 800: '#9a3412', 900: '#7c2d12', 950: '#431407' } },
    { name: 'amber', palette: { 50: '#fffbeb', 100: '#fef3c7', 200: '#fde68a', 300: '#fcd34d', 400: '#fbbf24', 500: '#f59e0b', 600: '#d97706', 700: '#b45309', 800: '#92400e', 900: '#78350f', 950: '#451a03' } },
    { name: 'teal', palette: { 50: '#f0fdfa', 100: '#ccfbf1', 200: '#99f6e4', 300: '#5eead4', 400: '#2dd4bf', 500: '#14b8a6', 600: '#0d9488', 700: '#0f766e', 800: '#115e59', 900: '#134e4a', 950: '#042f2e' } },
    { name: 'cyan', palette: { 50: '#ecfeff', 100: '#cffafe', 200: '#a5f3fc', 300: '#67e8f9', 400: '#22d3ee', 500: '#06b6d4', 600: '#0891b2', 700: '#0e7490', 800: '#155e75', 900: '#164e63', 950: '#083344' } },
    { name: 'rose', palette: { 50: '#fff1f2', 100: '#ffe4e6', 200: '#fecdd3', 300: '#fda4af', 400: '#fb7185', 500: '#f43f5e', 600: '#e11d48', 700: '#be123c', 800: '#9f1239', 900: '#881337', 950: '#4c0519' } },
  ];

  surfaceColors = {
    light: { ground: '#f8f9fa', section: '#ffffff', card: '#ffffff', overlay: '#ffffff', border: '#dee2e6', hover: '#e9ecef' },
    dark: { ground: '#13131a', section: '#1e1e2d', card: '#1e1e2d', overlay: '#1e1e2d', border: '#383860', hover: '#2a2a3d' },
  };

  selectedPrimary = this.primaryColors[2]; // blue por defecto

  menuItems: MenuItem[] = [
    { label: 'Dashboard', icon: 'pi pi-home', routerLink: ['/dashboard'] },
    { label: 'Inventario', icon: 'pi pi-box', routerLink: ['/inventory'] },
    { label: 'Productos', icon: 'pi pi-tag', routerLink: ['/products'] },
    { label: 'Reportes', icon: 'pi pi-chart-bar', routerLink: ['/reports'] },
  ];

  constructor(private primeng: PrimeNG) { }

  ngOnInit(): void {
    this.applyTheme();
  }

  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    this.colorScheme = this.isDarkMode ? 'dark' : 'light';
    this.applyTheme();
  }

  selectPrimary(color: PrimaryColor): void {
    this.selectedPrimary = color;
    this.applyTheme();
  }

  private applyTheme(): void {
    const root = document.documentElement;

    // Color scheme
    if (this.isDarkMode) {
      root.classList.add('p-dark');
    } else {
      root.classList.remove('p-dark');
    }

    // Primary palette
    const p = this.selectedPrimary.palette as Record<string, string>;
    Object.entries(p).forEach(([stop, value]) => {
      root.style.setProperty(`--p-primary-${stop}`, value);
    });
    root.style.setProperty('--p-primary-color', p['500']);
    root.style.setProperty('--p-primary-contrast-color', '#ffffff');
    root.style.setProperty('--p-primary-hover-color', p['400']);
    root.style.setProperty('--p-primary-active-color', p['600']);

    // Surface
    const s = this.surfaceColors[this.colorScheme];
    root.style.setProperty('--p-surface-ground', s.ground);
    root.style.setProperty('--p-surface-section', s.section);
    root.style.setProperty('--p-surface-card', s.card);
    root.style.setProperty('--p-surface-overlay', s.overlay);
    root.style.setProperty('--p-surface-border', s.border);
    root.style.setProperty('--p-surface-hover', s.hover);
  }
}