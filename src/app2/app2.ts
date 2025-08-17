import {Component, inject} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router'
import {LoginService} from '../service/login.service'

@Component({
  selector: 'app2',
  imports: [
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './app2.html',
  styleUrl: './app2.css'
})
export class App2 {
  loginService = inject(LoginService);
}
