import {Component, signal, WritableSignal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Boat} from './Boat' // 👈 here

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

  userName: WritableSignal<String> = signal('');
  boats: WritableSignal<Boat[]> = signal([]);
  newBoatName: string = '';
  newBoatDescription = '';

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

  addBoat() {
    if (this.newBoatName && this.newBoatDescription) {
      const newBoat: Boat = {
        name: this.newBoatName,
        description: this.newBoatDescription
      };
      this.boats.update(boats => [...boats, newBoat]);
      this.newBoatName = '';
      this.newBoatDescription = '';
    }
  }

  deleteBoat(index: number) {
    this.boats.update(boats => {
      const updatedBoats = [...boats];
      updatedBoats.splice(index, 1);
      return updatedBoats;
    });

  }
}
