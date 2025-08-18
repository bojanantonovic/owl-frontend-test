import {Component, inject} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router'
import {LoginService} from '../service/login.service'

@Component({
  selector: 'app',
  imports: [
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  loginService = inject(LoginService);
}
