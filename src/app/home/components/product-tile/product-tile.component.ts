import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ProductModel} from '../../../shared/models/product.model';
import {AddToCartButtonComponent} from '../../../shared/components/add-to-cart-button/add-to-cart-button.component';
import {RouterLink} from "@angular/router";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-product-tile',
  standalone: true,
  imports: [AddToCartButtonComponent, RouterLink, NgIf],
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
