import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CartModel} from "../models/cart.model";
import {catchError, map, Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrlBase = 'http://localhost:8000';
  private httpClient: HttpClient = inject(HttpClient);

  fetchCart(): Observable<CartModel[]> {
    return this.httpClient
      .get<CartModel[]>(`${this.apiUrlBase}/cart`);
  }

  addToCart(newOrder: { [key: string]: string | number }) {
    return this.httpClient
      .post<CartModel>(`${this.apiUrlBase}/cart`, {
        ...newOrder
      }).subscribe();
  }

  updateCart(newOrder: { [key: string]: number }, id: number){
    return this.httpClient
      .patch<CartModel>(`${this.apiUrlBase}/cart/${id}`, {
        ...newOrder
      }).subscribe();
  }

  deleteCartOrder(id: number) {
    return this.httpClient
      .delete(`${this.apiUrlBase}/cart/${id}`);
  }

  fetchProductCountInCart(id: number): Observable<number> {
    return this.httpClient
      .get<CartModel>(`${this.apiUrlBase}/cart/${id}`)
      .pipe(
        map(order => order.count),
        catchError(error => {
          return of(0);
        })
      );
  }
}
