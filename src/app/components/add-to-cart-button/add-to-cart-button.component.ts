import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-to-cart-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-to-cart-button.component.html',
  styleUrls: ['./add-to-cart-button.component.css']
})
export class AddToCartButtonComponent {
  showCounter: boolean = false;
  showAddToCartButton: boolean = true;
  count: number = 1;
  @Input() isDisabled: boolean = false;

  addToCart() {
    this.showCounter = true;
    this.showAddToCartButton = false;
  }
  increment() {
    this.count++;
  }

  decrement() {
    if (this.count > 1) {
      this.count--;
    }
  }
}
