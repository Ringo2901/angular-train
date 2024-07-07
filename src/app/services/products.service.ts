import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {ProductModel} from "../models/product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrlBase = 'http://localhost:8000';
  private httpClient: HttpClient = inject(HttpClient);
  routerObj: { [key: string]: { route: string, queryParam: string } } = {
    hasReviews: {
      route: 'hasReviews',
      queryParam: 'rating.count_ne'
    },
    inStock: {
      route: 'inStock',
      queryParam: 'stock_ne'
    },
    priceFrom: {
      route: 'priceFrom',
      queryParam: 'price_gte'
    },
    priceTo: {
      route: 'priceTo',
      queryParam: 'price_lte'
    },
    ratingFrom: {
      route: 'ratingFrom',
      queryParam: 'rating.rate_gte'
    },
    ratingTo: {
      route: 'ratingTo',
      queryParam: 'rating.rate_lte'
    }
  }

  filtersTitles: { [key: string]: string } = {
    priceFrom: 'Price from',
    priceTo: 'Price to',
    inStock: 'In stock',
    hasReviews: 'Has reviews',
    ratingFrom: 'Rating from',
    ratingTo: 'Rating to'
  }

  createQueryParams(queryParams: { [key: string]: number | string }) {
    debugger;
    let paramsArr = [];
    for (let key in queryParams) {
      if (this.routerObj[key]) {
        paramsArr.push(this.routerObj[key].queryParam + "=" + (queryParams[key] === 'true' ? 0 : queryParams[key]));
      }
    }
    console.log(paramsArr.join("&"));
    return paramsArr.join("&");
  }


  createBadges(queryParams: any) {
    let filterBadges = [];
    for (let key in queryParams) {
      filterBadges.push(`${this.filtersTitles[key]}:${queryParams[key]}`);
    }
    return filterBadges;
  }

  deleteProduct(id: number) {
    return this.httpClient
      .delete(`${this.apiUrlBase}/products/${id}`);
  }

  filterProducts(filters: string): Observable<ProductModel[]> {
    console.log(`${this.apiUrlBase}/products?${filters}`);
    return this.httpClient
      .get<ProductModel[]>(`${this.apiUrlBase}/products?${filters}`);
  }

  getProductById(id: number): Observable<ProductModel> {
    return this.httpClient.get<ProductModel>(`${this.apiUrlBase}/products/${id}`);
  }

  getProducts(): Observable<ProductModel[]> {
    return this.httpClient.get<ProductModel[]>(`${this.apiUrlBase}/products`);
  }

  updateProduct(newProduct: {[key: string]: string}, id: number): Observable<ProductModel> {
    return this.httpClient
      .patch<ProductModel>(`${this.apiUrlBase}/products/${id}`, {
        ...newProduct
      });
  }
}
