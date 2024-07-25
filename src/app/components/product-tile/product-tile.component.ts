import {Component, EventEmitter, Input, Output} from '@angular/core';
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
  @Input() count!: number;
  @Output() delete = new EventEmitter<void>();

  deleteProduct() {
    this.delete.emit();
  }
}
