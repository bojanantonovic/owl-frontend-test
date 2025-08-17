import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {Boat} from '../../shared/boat'
import {BoatRestService} from '../../service/boat-rest.service'
import {LoginService} from '../../service/login.service'
import {RouterLink} from '@angular/router'

@Component({
  selector: 'app-boats-screen',
  imports: [
    RouterLink
  ],
  templateUrl: './boats-screen.html',
  styleUrl: './boats-screen.css'
})
export class BoatsScreen implements OnInit {
  boatRestService: BoatRestService = inject(BoatRestService);
  loginService: LoginService = inject(LoginService);

  boats: WritableSignal<Boat[]> = signal([]);

  ngOnInit(): void {
    this.boatRestService.getAllBoats(this.boats)
    console.log("boats after initialisation: " + JSON.stringify(this.boats()));
  }

  reloadBoats() {
    this.boatRestService.getAllBoats(this.boats);
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
    console.log(this.boats().length + " boats after internal deletion");
    this.boatRestService.deleteBoat(index);
    //this.boatRestService.getAllBoats(this.boats); // reload the list of boats
    console.log(this.boats().length + " boats after deletion");
  }
}
