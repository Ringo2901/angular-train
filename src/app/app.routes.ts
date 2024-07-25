import {Routes} from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {ProductDetailsComponent} from "./pages/product-details/product-details.component";
import {ProductEditComponent} from "./pages/product-edit/product-edit.component";
import {CartComponent} from "./pages/cart/cart.component";
import {AuthComponent} from "./pages/auth/auth.component";
import {authGuard} from "./pages/auth/auth.guard";

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
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'auth',
    component: AuthComponent
  }
];
