import {Component, Input} from '@angular/core';
import {ReviewModel} from "../../models/review.model";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})
export class ReviewComponent {
  @Input() review!: ReviewModel;
}
