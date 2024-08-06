import {Component, inject} from '@angular/core';
import {RouterLink} from '@angular/router';
import {FaIconLibrary, FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {faSearch, faShoppingCart, faSignOutAlt, faUser} from '@fortawesome/free-solid-svg-icons';
import {CommonModule} from '@angular/common';
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterLink
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  userService: UserService = inject(UserService);
  isAuthenticated = false;
  userEmail: string | null = null;

  constructor(library: FaIconLibrary) {
    library.addIcons(faSignOutAlt, faShoppingCart, faSearch, faUser);
  }

  ngOnInit() {
    this.userService.user$.subscribe(user => {
      this.isAuthenticated = !!user;
      this.userEmail = user ? user.email : null;
    });
  }

  logout() {
    this.userService.logout();
  }
}
