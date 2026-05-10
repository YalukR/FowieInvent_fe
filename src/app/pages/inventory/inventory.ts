import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ConfirmInputDialog } from '@/app/shared/confirm-input-dialog';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule, RouterModule, ConfirmInputDialog],
  templateUrl: './inventory.html',
  styleUrls: ['./inventory.scss']
})
export class Inventory {}