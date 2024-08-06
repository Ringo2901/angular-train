import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ReviewModel} from "../models/review.model";

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private apiUrlBase = 'http://localhost:8000';
  private httpClient: HttpClient = inject(HttpClient);

  getReviewsByProductId(productId: number): Observable<ReviewModel[]> {
    return this.httpClient.get<ReviewModel[]>(`${this.apiUrlBase}/reviews?productId=${productId}`);
  }
}
