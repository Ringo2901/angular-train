import {Component, inject} from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import {UserModel} from "../../models/user.model";
import {UserService} from "../../../shared/services/user.service";
import {NgClass, NgIf} from "@angular/common";

@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [
    FormsModule,
    NgClass,
    NgIf
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  userService: UserService = inject(UserService);

  isAuthentication: boolean = true;
  isAuthed: boolean = false;

  onSubmit(form: NgForm) {
    const user: UserModel = {email: form.controls['email'].value, password: form.controls['password'].value};
    if (this.isAuthentication) {
      this.userService.login(user);
    } else {
      this.userService.signUp(user);
    }

    this.isAuthed = this.userService.isAuth.value;
  }

  onChangeAuth() {
    this.isAuthentication = !this.isAuthentication;
  }
}
