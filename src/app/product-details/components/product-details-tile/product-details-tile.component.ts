import {Component, inject, Input} from '@angular/core';
import {AddToCartButtonComponent} from "../../../shared/components/add-to-cart-button/add-to-cart-button.component";
import {ProductModel} from "../../../shared/models/product.model";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {ProductTileComponent} from "../../../home/components/product-tile/product-tile.component";
import {ReviewModel} from "../../models/review.model";
import {ReviewComponent} from "../review/review.component";
import {ReviewService} from "../../services/review.service";
import {AvailabilityColorDirective} from "../../directives/availability-color.directive";

@Component({
  selector: 'app-product-details-page-tile',
  standalone: true,
  imports: [
    AddToCartButtonComponent,
    NgForOf,
    ProductTileComponent,
    ReviewComponent,
    NgIf,
    NgClass,
    AvailabilityColorDirective
  ],
  templateUrl: './product-details-tile.component.html',
  styleUrl: './product-details-tile.component.css'
})
export class ProductDetailsTileComponent {
  @Input() product!: ProductModel;
  @Input() count!: number;
  reviews: ReviewModel[] = [];
  reviewService: ReviewService = inject(ReviewService);

  ngAfterViewInit() {
    this.loadReviews();
  }

  loadReviews() {
    this.reviewService.getReviewsByProductId(this.product.id).subscribe(
      value => {
        this.reviews = value;
      }
    )
  }
}
