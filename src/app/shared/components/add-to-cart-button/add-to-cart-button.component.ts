import {Component, inject, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductModel} from "../../models/product.model";
import {ProductService} from "../../services/products.service";
import {CartService} from "../../services/cart.service";

@Component({
  selector: 'app-add-to-cart-page-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-to-cart-button.component.html',
  styleUrls: ['./add-to-cart-button.component.css']
})
export class AddToCartButtonComponent {
  isAddToCartBtnClicked: boolean = false;
  @Input() numberOfItems!: number;
  @Input() productID!: number;
  @Input() isDisabled: boolean = false;
  product!: ProductModel;
  productService: ProductService = inject(ProductService);
  cartService: CartService = inject(CartService);

  addToCart() {
    this.numberOfItems++;
    this.isAddToCartBtnClicked = true;

    let newCartItem = {
      id: this.product.id,
      title: this.product.title,
      count: this.numberOfItems,
      price: this.product.price
    }
    this.cartService.addToCart(newCartItem);
  }

  ngOnInit() {
    this.productService.getProductById(this.productID).subscribe(
      value => this.product = value
    )
    this.cartService.fetchProductCountInCart(this.productID).subscribe(
      count => this.numberOfItems = count
    )
  }

  ngOnChanges() {
    this.isAddToCartBtnClicked = !(this.numberOfItems === 0);
  }

  incrementNumberOfItems() {
    this.numberOfItems++;
    this.cartService.updateCart({'count': this.numberOfItems}, this.productID);

  }

  decrementNumberOfItems() {
    this.numberOfItems--;
    if (this.numberOfItems >= 1) {
      this.cartService.updateCart({'count': this.numberOfItems}, this.productID);
    } else if (this.numberOfItems === 0) {
      this.cartService.deleteCartOrder(this.productID).subscribe();
      this.isAddToCartBtnClicked = false;
    }
  }
}
