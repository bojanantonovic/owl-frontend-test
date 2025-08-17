import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import {BoatRestService} from '../../service/boat-rest.service'
import {Boat} from '../../shared/boat'

@Component({
  selector: 'app-boat-detail-screen',
  imports: [],
  templateUrl: './boat-detail-screen.html',
  styleUrl: './boat-detail-screen.css'
})
export class BoatDetailScreen implements OnInit {
  private route = inject(ActivatedRoute);
  boatRestService: BoatRestService = inject(BoatRestService);
  boatId: string | null = null;
  boats = signal<Boat[]>([]);

  boat = computed(() => {
    const id = this.boatId ? Number(this.boatId) : null;
    return id == null ? null : this.boats().find(b => b.id === id) ?? null;
  });

  ngOnInit() {
    this.boatRestService.getAllBoats(this.boats);
    console.log("boats: " + JSON.stringify(this.boats()));

    this.route.paramMap.subscribe(params => {
      this.boatId = params.get('id');
      console.log("boatId: " + this.boatId);
    });
  }
}
