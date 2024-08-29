import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {UserService} from "../../../shared/services/user.service";
import {map, take} from "rxjs";

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(UserService);
  const router = inject(Router);

  return authService.userSubject.pipe(
    take(1),
    map(user => {
      const isAuth = !!user;
      if (isAuth) {
        return true;
      }
      return router.createUrlTree(['/auth-page']);
    })
  );
};
