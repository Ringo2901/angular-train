import {Component, inject, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductModel} from "../../models/product.model";
import {ProductService} from "../../services/products.service";
import {CartService} from "../../services/cart.service";

@Component({
  selector: 'app-add-to-cart-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-to-cart-button.component.html',
  styleUrls: ['./add-to-cart-button.component.css']
})
export class AddToCartButtonComponent {
  isAddToCartBtnClicked: boolean = false;
  @Input() count!: number;
  @Input() productID!: number;
  @Input() isDisabled: boolean = false;
  product!: ProductModel;
  productService: ProductService = inject(ProductService);
  cartService: CartService = inject(CartService);

  addToCart() {
    this.count++;
    this.isAddToCartBtnClicked = true;

    let newCartItem = {
      id: this.product.id,
      title: this.product.title,
      count: this.count,
      price: this.product.price
    }
    debugger;
    this.cartService.addToCart(newCartItem);
  }

  ngOnInit() {
    this.productService.getProductById(this.productID).subscribe(
      value => this.product = value
    )
    this.cartService.fetchProductCountInCart(this.productID).subscribe(
      count => this.count = count
    )
  }

  ngOnChanges() {
    this.isAddToCartBtnClicked = !(this.count === 0);
  }

  increment() {
    this.count++;
    this.cartService.updateCart({'count': this.count}, this.productID);

  }

  decrement() {
    this.count--;
    if (this.count >= 1) {
      this.cartService.updateCart({'count': this.count}, this.productID);
    } else if (this.count === 0) {
      this.cartService.deleteCartOrder(this.productID).subscribe();
      this.isAddToCartBtnClicked = false;
    }
  }
}
