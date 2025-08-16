import {Component, signal} from '@angular/core';
import {FormsModule} from '@angular/forms'; // 👈 here

@Component({
  selector: 'app',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  // login properties
  isLoggedIn = signal(false);
  credentialsInvalid = signal(false);
  //name = model('');
  //password = model('');
  name = '';
  password = '';
  validCredentials: string[][] = [['Donald', 'Duck'], ['Mickey', 'Mouse']];

  userName = signal('');

  onSubmit() {
    //this.isLoggedIn.set(true);
    //this.userName.set(this.name());
    //   if (this.validCredentials.includes([this.name, this.password])) {
    if (this.validCredentials.some(
      credentials => credentials[0] === this.name && credentials[1] === this.password)) {
      this.isLoggedIn.set(true);
      this.userName.set(this.name);
      this.credentialsInvalid.set(false);
    } else {
      this.credentialsInvalid.set(true);
    }
  }
}
