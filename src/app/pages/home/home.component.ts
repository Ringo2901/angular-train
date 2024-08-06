import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {ProductService} from '../../services/products.service';
import {ProductModel} from "../../models/product.model";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {ProductTileComponent} from "../../components/product-tile/product-tile.component";
import {CartModel} from "../../models/cart.model";
import {CartService} from "../../services/cart.service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ProductTileComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  productService: ProductService = inject(ProductService);
  cartService: CartService = inject(CartService);
  filterForm: FormGroup;
  subscription: Subscription;
  products: ProductModel[] = [];
  badgeTiles: string[] = [];
  cart: CartModel[] = [];

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute) {
    this.subscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        let queryParams = this.route.snapshot.queryParams;
        let queryParamsString = this.productService.createQueryParams(queryParams);
        this.badgeTiles = this.productService.createBadges(queryParams);
        this.filterForm.patchValue(queryParams);
        this.productService.filterProducts(queryParamsString).subscribe(value => this.products = value);
      }
    });

    this.filterForm = this.fb.group({
      priceFrom: [null, Validators.min(0)],
      priceTo: [null, Validators.min(0)],
      ratingFrom: [null, [Validators.min(0), Validators.max(5)]],
      ratingTo: [null, [Validators.min(0), Validators.max(5)]],
      inStock: [null],
      hasReviews: [null]
    });
  }

  ngOnInit() {
    this.cartService.fetchCart().subscribe(cart => {
      this.cart = cart;
    })
  }

  getCountById(id: number) {
    const order = this.cart.find(order => order.id === id);
    return order?.count || 0;
  }

  onSubmit() {
    let queryParamsObj: { [key: string]: any } = {};
    for (const key in this.filterForm.value) {
      if (this.filterForm.value[key] !== null && this.filterForm.value[key] !== false) {
        queryParamsObj[key] = this.filterForm.value[key];
      }
    }
    this.router.navigate(['/'], {queryParams: {...queryParamsObj}});
  }

  onClear() {
    this.filterForm.reset();
    this.router.navigate([], {replaceUrl: true});
  }

  removeFilter(index: number) {
    let queryParams = this.route.snapshot.queryParams;
    const removedFilter = Object.keys(queryParams)[index];
    this.filterForm.get(removedFilter)?.reset();
    const {[removedFilter]: removedFilter1, ...restFilters} = queryParams;
    this.router.navigate(['/'], {queryParams: {...restFilters}});
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onDelete(id: number) {
    this.productService.deleteProduct(id).subscribe(
      () => {
        this.productService.getProducts().subscribe(value => this.products = value);
      }
    )
  }
}
