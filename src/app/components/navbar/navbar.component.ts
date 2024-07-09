import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faSignOutAlt, faShoppingCart, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';

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
  constructor(private router: Router, library: FaIconLibrary) {
    library.addIcons(faSignOutAlt, faShoppingCart, faSearch, faUser);
  }

  logout() {
    console.log('Выход из аккаунта');
    this.router.navigate(['/auth']);
  }
}
