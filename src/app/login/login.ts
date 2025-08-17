import {Component, inject, signal} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {LoginService} from '../../service/login.service'
import {Router} from '@angular/router'

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  router: Router = inject(Router);
  loginService: LoginService = inject(LoginService);

  credentialsInvalid = signal(false);
  name = '';
  password = '';

  onSubmit() {
    if (this.loginService.areCredentialsValid(this.name, this.password)) {
      this.loginService.isLoggedIn.set(true);
      this.loginService.userName.set(this.name);
      this.credentialsInvalid.set(false);
      console.log("Login successful for user: " + this.name);
      this.router.navigate(['/boats']);
    } else {
      this.credentialsInvalid.set(true);
    }
  }
}
