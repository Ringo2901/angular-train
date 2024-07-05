import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {KeyValuePipe, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    KeyValuePipe,
    NgForOf,
    NgIf
  ],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css'
})
export class FiltersComponent {
  filterForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute) {
    this.filterForm = this.fb.group({
      priceFrom: [''],
      priceTo: [''],
      ratingFrom: [''],
      ratingTo: [''],
      inStock: [false],
      hasReviews: [false]
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.filterForm.setValue({
        priceFrom: params['priceFrom'] || '',
        priceTo: params['priceTo'] || '',
        ratingFrom: params['ratingFrom'] || '',
        ratingTo: params['ratingTo'] || '',
        inStock: params['inStock'] === 'true',
        hasReviews: params['hasReviews'] === 'true'
      });
    });
  }

  applyFilters() {
    const filters = this.filterForm.value;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: filters,
      queryParamsHandling: 'merge'
    });
  }
}
