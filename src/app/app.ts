import {Component, OnInit, signal, WritableSignal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Boat} from './Boat' // 👈 here
import {BoatRestService} from './boat-rest.service'; // 👈 here

@Component({
  selector: 'app',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
//@Injectable({providedIn: 'root'})
export class App implements OnInit {

  //private readonly baseUrl = 'http://localhost:8080/boats';

  constructor(/*private http: HttpClient, */private boatRestService: BoatRestService) {

  }

  ngOnInit(): void {
    // Fetch initial boats from the backend
    this.boatRestService.getAllBoats(this.boats)
  }


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
      //this.boats.update(boats => [...boats, newBoat]);
      this.boatRestService.postBoat(newBoat);
      this.boatRestService.getAllBoats(this.boats); // reload the list of boats
      // Reset the input fields
      this.newBoatName = '';
      this.newBoatDescription = '';
    }
  }


  updateBoat(index: number) {
    /*this.boats.update(boats => {
      const updatedBoats = [...boats];
      if (updatedBoats[index]) {
        updatedBoats[index].name = name;
        updatedBoats[index].description = description;
      }
      return updatedBoats;
    });*/
  }

  deleteBoat(index: number) {
    this.boats.update(boats => {
      const updatedBoats = [...boats];
      updatedBoats.splice(index, 1);
      return updatedBoats;
    });
  }
}
