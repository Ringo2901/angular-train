import { Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {ProductDetailsComponent} from "./pages/product-details/product-details.component";

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'products',
  },
  {
    path: 'products',
    component: HomeComponent,
  },
  {
    path: 'products/:productId',
    component: ProductDetailsComponent,
  },
];
