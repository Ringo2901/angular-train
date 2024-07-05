import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {ProductModel} from "../models/product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrlBase = 'http://localhost:8000';
  private httpClient:HttpClient = inject(HttpClient);

  getProducts(filters: any): Observable<ProductModel[]> {
    let params = new HttpParams();

    if (filters.priceFrom && filters.priceTo) {
      params = params.set('price_gte', filters.priceFrom);
    } else {
      if (filters.priceFrom) {
        params = params.set('price_gte', filters.priceFrom);
      }
      if (filters.priceTo) {
        params = params.set('price_lte', filters.priceTo);
      }
    }

    if (filters.ratingFrom && filters.ratingTo) {
      params = params.set('rating.rate_gte', filters.ratingFrom);
    } else {
      if (filters.ratingFrom) {
        params = params.set('rating.rate_gte', filters.ratingFrom);
      }
      if (filters.ratingTo) {
        params = params.set('rating.rate_lte', filters.ratingTo);
      }
    }

    if (filters.inStock) {
      params = params.set('stock_gt', '0');
    }
    if (filters.hasReviews) {
      params = params.set('rating.count_gt', '0');
    }

    console.log(this.apiUrlBase + "/products?" + params.toString());

    const observable = this.httpClient.get<ProductModel[]>(this.apiUrlBase + "/products", { params });

    return observable.pipe(
      map(products => {
        if (filters.priceTo) {
          products = products.filter(product => product.price <= filters.priceTo);
        }
        if (filters.ratingTo) {
          products = products.filter(product => product.rating.rate <= filters.ratingTo);
        }
        return products;
      })
    );
  }

  getProductById(id: number): Observable<ProductModel> {
    return this.httpClient.get<ProductModel>(`${this.apiUrlBase}/products/${id}`);
  }
}
