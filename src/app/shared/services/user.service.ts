import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserModel} from "../../auth/models/user.model";
import {BehaviorSubject, catchError, map, of} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrlBase = 'http://localhost:8000';
  private httpClient: HttpClient = inject(HttpClient);

  userSubject = new BehaviorSubject<any>(null);
  isAuth = new BehaviorSubject<boolean>(false);
  user$ = this.userSubject.asObservable();

  constructor(private router: Router) {
  }

  signUp(user: UserModel) {
    this.httpClient
      .post<UserModel>(`${this.apiUrlBase}/users`, {...user})
      .pipe(
        map((user: UserModel) => {
          this.handleAuthentication(user.email, user.id);
          this.isAuth.next(true);
          this.router.navigate(['/']);
        }),
        catchError((error) => {
          this.isAuth.next(false);
          return of(null);
        })
      )
      .subscribe();
  }

  login(user: UserModel) {
    this.httpClient
      .get<UserModel[]>(`${this.apiUrlBase}/users?email=${user.email}&password=${user.password}`)
      .pipe(
        map((users: UserModel[]) => {
          if (users.length) {
            const userData = users[0];
            sessionStorage.setItem('userData', JSON.stringify({email: userData.email, id: userData.id}));
            this.userSubject.next(userData);
            this.isAuth.next(true);
            this.router.navigate(['/products']);
          }
        }),
        catchError((error) => {
          this.isAuth.next(false);
          return of(null);
        })
      )
      .subscribe();
  }

  logout() {
    this.userSubject.next(null);
    sessionStorage.removeItem('userData');
    this.router.navigate(['/']);
  }

  private handleAuthentication(email: string, id?: number) {
    const user = new UserModel(email, id);
    user.email = email;
    user.id = id;
    this.userSubject.next(user);
    sessionStorage.setItem('userData', JSON.stringify(user));
  }
}
