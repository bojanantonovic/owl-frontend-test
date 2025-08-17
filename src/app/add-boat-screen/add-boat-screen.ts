import {Component, inject} from '@angular/core';
import {BoatRestService} from '../../service/boat-rest.service'
import {Boat} from '../../shared/boat'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {Router} from '@angular/router'

@Component({
  selector: 'app-add-boat-screen',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-boat-screen.html',
  styleUrl: './add-boat-screen.css'
})
export class AddBoatScreen {
  boatRestService: BoatRestService = inject(BoatRestService);
  router: Router = inject(Router);
  newBoatName: string = '';
  newBoatDescription = '';

  addBoat() {
    if (this.newBoatName && this.newBoatDescription) {
      const newBoat: Boat = {
        id: 0, // here not relevant, as the backend will assign it
        name: this.newBoatName,
        description: this.newBoatDescription
      };
      this.boatRestService.postBoat(newBoat);
      // Reset the input fields
      this.newBoatName = '';
      this.newBoatDescription = '';
    }

    this.router.navigate(['/boats']);
  }
}
