import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NavbarComponent} from './navbar/components/navbar/navbar.component';
import {HomeComponent} from './home/pages/home-page/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, HomeComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'angular-train';
}
