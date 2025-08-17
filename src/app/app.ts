import {Component, OnInit, signal, WritableSignal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Boat} from '../shared/Boat' // 👈 here
import {BoatRestService} from '../service/boat-rest.service';
import {LoginService} from '../service/login.service' // 👈 here

@Component({
  selector: 'app',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  constructor(private loginService: LoginService, private boatRestService: BoatRestService) {

  }

  ngOnInit(): void {
    this.boatRestService.getAllBoats(this.boats)
    console.log("boats after initialisation: " + JSON.stringify(this.boats()));
  }

// login properties
  isLoggedIn = signal(false);
  credentialsInvalid = signal(false);
  name = '';
  password = '';

  userName: WritableSignal<String> = signal('');
  boats: WritableSignal<Boat[]> = signal([]);
  newBoatName: string = '';
  newBoatDescription = '';

  onSubmit() {
    if (this.loginService.areCredentialsValid(this.name, this.password)) {
      this.isLoggedIn.set(true);
      this.userName.set(this.name);
      this.credentialsInvalid.set(false);
    } else {
      this.credentialsInvalid.set(true);
    }
  }

  reloadBoats() {
    this.boatRestService.getAllBoats(this.boats);
  }

  addBoat() {
    if (this.newBoatName && this.newBoatDescription) {
      const newBoat: Boat = {
        id: 0, // here not relevant, as the backend will assign it
        name: this.newBoatName,
        description: this.newBoatDescription
      };
      this.boatRestService.postBoat(newBoat);
      this.boatRestService.getAllBoats(this.boats); // reload the list of boats
      // Reset the input fields
      this.newBoatName = '';
      this.newBoatDescription = '';
    }

    console.log("boats after adding a new boat: " + JSON.stringify(this.boats()));
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
    console.log(this.boats().length + " boats bevor deletion");
    /*this.boats.update(boats => {
       const updatedBoats = [...boats];
       updatedBoats.splice(index, 1);
       return updatedBoats;
     });*/
    console.log(this.boats().length + " boats after internal deletion");
    this.boatRestService.deleteBoat(index);
    //this.boatRestService.getAllBoats(this.boats); // reload the list of boats
    console.log(this.boats().length + " boats after deletion");
  }
}
