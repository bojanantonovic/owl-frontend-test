import {Component, Injectable, OnInit, signal, WritableSignal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Boat} from './Boat' // 👈 here
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
@Injectable({providedIn: 'root'})
export class App implements OnInit {

  private readonly baseUrl = 'http://localhost:8080/boats';

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    // Fetch initial boats from the backend
    this.http.get<Boat[]>(this.baseUrl).subscribe({
      next: (boats) => {
        this.boats.set(boats);
      },
      error: (err) => {
        console.error('Status:', err.status);         // z. B. 404
        console.error('StatusText:', err.statusText); // z. B. Not Found
        console.error('URL:', err.url);               // z. B. http://localhost:8080/boats
        console.error('Message:', err.message);       // z. B. Http failure response ...
        console.error('Error body:', err.error);      // JSON oder Text vom Backend
      }
    });
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
      this.boats.update(boats => [...boats, newBoat]);
      this.http.post<Boat>(this.baseUrl, newBoat).subscribe({
        next: saved => {
          console.log('Boat saved:', saved);
        },
        error: (err) => {
          console.error('Status:', err.status);         // z. B. 404
          console.error('StatusText:', err.statusText); // z. B. Not Found
          console.error('URL:', err.url);               // z. B. http://localhost:8080/boats
          console.error('Message:', err.message);       // z. B. Http failure response ...
          console.error('Error body:', err.error);      // JSON oder Text vom Backend
        }
      });
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
