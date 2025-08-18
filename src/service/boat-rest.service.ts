import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Boat} from '../shared/boat';

@Injectable({providedIn: 'root'})
export class BoatRestService {
  private readonly baseUrl = 'http://localhost:8080/boats';
  private http: HttpClient = inject(HttpClient);
  public numberOfOngoingOperations: WritableSignal<number> = signal(0);

  public getAllBoats(boatsSignal: WritableSignal<Boat[]>): void {
    this.http.get<Boat[]>(this.baseUrl).subscribe({
      next: (boats) => {
        boatsSignal.set(boats);
        console.log("getAllBoats: received " + boatsSignal().length + " boats from backend ");
        console.log("getAllBoats: boats: " + JSON.stringify(boatsSignal()));
      },
      error: (err: HttpErrorResponse) => {
        this.logHttpErrorResponseToConsole(err)
      }
    });
  }

  public postBoat(newBoat: Boat): void {
    console.log("boat to save in BoatRestService: " + JSON.stringify(newBoat));

    this.http.post<Boat>(this.baseUrl, newBoat).subscribe({
      next: (savedBoat) => {
        this.numberOfOngoingOperations.update(
          x => x + 1
        )
        console.log('Boat saved: ', JSON.stringify(savedBoat))
      },
      error: (err: HttpErrorResponse) => {
        this.logHttpErrorResponseToConsole(err)
      }
    });
  }

  public updateBoat(updatedBoat: Boat): void {
    console.log("boat to update in BoatRestService: " + JSON.stringify(updatedBoat));

    this.http.put<Boat>(`${this.baseUrl}`, updatedBoat).subscribe({
      next: (savedBoat) => {
        this.numberOfOngoingOperations.update(
          x => x + 1
        )
        console.log('Boat updated: ', JSON.stringify(savedBoat))
      },
      error: (err: HttpErrorResponse) => {
        this.logHttpErrorResponseToConsole(err);
      }
    });
  }

  public deleteBoat(id: number): void {
    console.log("boat to delete in BoatRestService: " + id);

    this.http.delete<Boat>(`${this.baseUrl}/${id}`).subscribe({
      next: (deletedBoat) => {
        this.numberOfOngoingOperations.update(
          x => x + 1
        )
        console.log('Boat deleted: ', id)
      },
      error: (err: HttpErrorResponse) => this.logHttpErrorResponseToConsole(err)
    })
  }

  private logHttpErrorResponseToConsole(err: HttpErrorResponse) {
    console.error('Status:', err.status);
    console.error('StatusText:', err.statusText);
    console.error('URL:', err.url);
    console.error('Message:', err.message);
    console.error('Error body:', err.error);
  }
}
