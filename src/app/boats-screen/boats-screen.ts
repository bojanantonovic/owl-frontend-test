import {Component, effect, inject, OnInit, signal, WritableSignal} from '@angular/core';
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

  // DO NOT REMOVE !!!
  // listenr pattern with effects
  private boatReloadEffect$ = effect(() => {
    if (this.boatRestService.numberOfOngoingOperations() > 0) {
      this.boatRestService.numberOfOngoingOperations.set(this.boatRestService.numberOfOngoingOperations() - 1);
      this.boatRestService.getAllBoats(this.boats)
      console.log("boats after reloading in effect: " + JSON.stringify(this.boats()));
    }
  })

  ngOnInit(): void {
    this.boatRestService.getAllBoats(this.boats)
    console.log("boats after initialisation: " + JSON.stringify(this.boats()));
  }

  reloadBoats() {
    this.boatRestService.getAllBoats(this.boats);
  }

  deleteBoat(index: number) {
    console.log(this.boats().length + " boats bevor deletion");
    console.log(this.boats().length + " boats after internal deletion");
    this.boatRestService.deleteBoat(index);
    console.log(this.boats().length + " boats after deletion");
  }
}
