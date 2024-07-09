import { Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {ProductDetailsComponent} from "./pages/product-details/product-details.component";
import {ProductEditComponent} from "./pages/product-edit/product-edit.component";
import {CartComponent} from "./pages/cart/cart.component";

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
  {
    path: 'product/edit/:id',
    component: ProductEditComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
  },
];
