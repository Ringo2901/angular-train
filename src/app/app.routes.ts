import {Routes} from '@angular/router';
import {HomeComponent} from "./home/pages/home-page/home.component";
import {ProductDetailsComponent} from "./product-details/pages/product-details-page/product-details.component";
import {ProductEditComponent} from "./product-edit/pages/product-edit-page/product-edit.component";
import {CartComponent} from "./cart/pages/cart-page/cart.component";
import {AuthComponent} from "./auth/pages/auth-page/auth.component";
import {authGuard} from "./auth/pages/auth-page/auth.guard";

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
    canActivate: [authGuard]
  },
  {
    path: 'cart-page',
    component: CartComponent,
  },
  {
    path: 'auth-page',
    component: AuthComponent
  }
];
