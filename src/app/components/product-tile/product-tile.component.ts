import { Component, Input } from '@angular/core';
import { ProductModel } from '../../models/product.model';
import { AddToCartButtonComponent } from '../add-to-cart-button/add-to-cart-button.component';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-product-tile',
  standalone: true,
  imports: [AddToCartButtonComponent, RouterLink],
  templateUrl: './product-tile.component.html',
  styleUrls: ['./product-tile.component.css']
})
export class ProductTileComponent {
  @Input() product!: ProductModel;

  editProduct() {
    console.log(`Editing ${this.product.title}`);
  }

  deleteProduct() {
    console.log(`Deleted ${this.product.title}`);
  }
}
