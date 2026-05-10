import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule, RouterModule, ],
  templateUrl: './inventory.html',
  styleUrls: ['./inventory.scss']
})
export class Inventory {}