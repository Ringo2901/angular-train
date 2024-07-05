import {Component, inject} from '@angular/core';
import {ProductDetailsTileComponent} from "../../components/product-details-tile/product-details-tile.component";
import {ActivatedRoute} from "@angular/router";
import {ProductModel} from "../../models/product.model";
import {ProductService} from "../../services/products.service";

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    ProductDetailsTileComponent
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  product!: ProductModel;
  productService:ProductService = inject(ProductService);
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    let routeParams = this.route.snapshot.paramMap;
    let productIdFromRoute = Number(routeParams.get('productId'));
    this.productService.getProductById(productIdFromRoute).subscribe(
      value => {
        this.product = value;
      }
    )
  }
}
