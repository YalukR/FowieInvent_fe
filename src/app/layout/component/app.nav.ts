import { Component, Input } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

export interface NavItem {
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonModule],
  templateUrl: './app.nav.html',
})
export class AppNav {
  @Input() items: NavItem[] = [];

  constructor(private router: Router, private location: Location) {}

  goBack() { this.location.back(); }

  isActive(route: string): boolean {
    return this.router.url.startsWith(route);
  }
}