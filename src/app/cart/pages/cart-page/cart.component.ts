import {Component, inject} from '@angular/core';
import {CartService} from "../../services/cart-page.service";
import {CartModel} from "../../models/cart-page.model";
import {NgForOf, NgIf} from "@angular/common";
import {animate, keyframes, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
  animations: [
    trigger('flyInOut', [
      transition(':enter', [
        animate('0.5s ease-in', keyframes([
          style({opacity: 0, transform: 'translateX(-100%)', offset: 0}),
          style({opacity: 1, transform: 'translateX(0)', offset: 1.0})
        ]))
      ]),
      transition(':leave', [
        animate('0.5s ease-out', keyframes([
          style({opacity: 1, transform: 'translateX(0)', offset: 0}),
          style({opacity: 0, transform: 'translateX(-100%)', offset: 1.0})
        ]))
      ])
    ])
  ]
})
export class CartComponent {
  cartService: CartService = inject(CartService);
  cart: CartModel[] = [];

  ngOnInit() {
    this.cartService.fetchCart().subscribe(
      value => this.cart = value
    )
  }

  onDelete(id: number) {
    this.cartService.deleteCartOrder(id).subscribe(
      () => {
        this.cart = this.cart.filter(order => order.id !== id);
      }
    )
  }
}
