import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router'
import {BoatRestService} from '../../service/boat-rest.service'
import {Boat} from '../../shared/boat'
import {FormsModule} from '@angular/forms'

@Component({
  selector: 'app-boat-update-screen',
  imports: [
    FormsModule
  ],
  templateUrl: './boat-update-screen.html',
  styleUrl: './boat-update-screen.css'
})
export class BoatUpdateScreen implements OnInit {
  boatRestService: BoatRestService = inject(BoatRestService);
  private router: Router = inject(Router);
  private route = inject(ActivatedRoute);
  newBoatName: string = '';
  newBoatDescription = '';

  boatId: string | null = null;
  boats = signal<Boat[]>([]);


  boat = computed(() => {
    const id = this.boatId ? Number(this.boatId) : null;
    const foundBoat = id == null ? null : this.boats().find(b => b.id === id) ?? null
    if (foundBoat) {
      this.newBoatName = foundBoat.name;
      this.newBoatDescription = foundBoat.description;
    }
    return foundBoat;
  });

  ngOnInit() {
    this.boatRestService.getAllBoats(this.boats);
    console.log("boats: " + JSON.stringify(this.boats()));

    this.route.paramMap.subscribe(params => {
      this.boatId = params.get('id');
      console.log("boatId: " + this.boatId);
    });
  }

  updateBoat() {
    const currentBoat = this.boat()
    console.log("boat to update: " + JSON.stringify(currentBoat));
    if (this.newBoatName && this.newBoatDescription) {
      const newBoat: Boat = {
        id: currentBoat ? currentBoat.id : 0,
        name: this.newBoatName,
        description: this.newBoatDescription
      };
      this.boatRestService.updateBoat(newBoat);
      // Reset the input fields
      this.newBoatName = '';
      this.newBoatDescription = '';
    }

    this.router.navigate(['/boats']);
  }
}
