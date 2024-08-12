import {Component, inject} from '@angular/core';
import {ProductDetailsTileComponent} from "../../components/product-details-tile/product-details-tile.component";
import {ActivatedRoute} from "@angular/router";
import {ProductModel} from "../../../shared/models/product.model";
import {ProductService} from "../../../shared/services/products.service";
import {CartService} from "../../../shared/services/cart.service";
import {CartModel} from "../../../shared/models/cart.model";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-product-details-page',
  standalone: true,
  imports: [
    ProductDetailsTileComponent,
    NgIf
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  product!: ProductModel;
  productService: ProductService = inject(ProductService);
  cartService: CartService = inject(CartService);
  cart: CartModel[] = [];

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    let routeParams = this.route.snapshot.paramMap;
    let productIdFromRoute = Number(routeParams.get('productId'));
    this.productService.getProductById(productIdFromRoute).subscribe(
      value => {
        this.product = value;
      }
    )
    this.cartService.fetchCart().subscribe(cart => {
      this.cart = cart;
    })
  }

  getCountById(id: number) {
    const order = this.cart.find(order => order.id === id);
    return order?.count || 0;
  }
}
