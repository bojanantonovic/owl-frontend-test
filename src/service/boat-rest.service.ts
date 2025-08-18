import {Injectable, Signal, WritableSignal} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Boat} from '../shared/boat';
import {toSignal} from '@angular/core/rxjs-interop'

@Injectable({providedIn: 'root'})
export class BoatRestService {
  private readonly baseUrl = 'http://localhost:8080/boats';

  constructor(private http: HttpClient) {
  }

  public getAllBoats(boatsSignal: WritableSignal<Boat[]>): void {
    this.http.get<Boat[]>(this.baseUrl).subscribe({
      next: (boats) => {
        boatsSignal.set(boats);
        console.log("getAllBoats: received " + boatsSignal().length + " boats from backend ");
      },
      error: (err: HttpErrorResponse) => {
        this.logHttpErrorResponseToConsole(err)
      }
    });
  }

  public postBoat(newBoat: Boat): void {
    console.log("boat to save: " + JSON.stringify(newBoat));
    this.http.post<Boat>(this.baseUrl, newBoat).subscribe({
      next: (savedBoat) => console.log('Boat saved: ', JSON.stringify(savedBoat)),
      error: (err: HttpErrorResponse) => {
        this.logHttpErrorResponseToConsole(err)
      }
    });
  }

  public updateBoat(updatedBoat: Boat): void {
    console.log("boat to update: " + JSON.stringify(updatedBoat));

    this.http.put<Boat>(`${this.baseUrl}`, updatedBoat).subscribe({
      next: (savedBoat) => console.log('Boat updated: ', JSON.stringify(savedBoat)),
      error: (err: HttpErrorResponse) => {
        this.logHttpErrorResponseToConsole(err);
      }
    });
  }

  public deleteBoat(id: number): void {
    this.http.delete<Boat>(`${this.baseUrl}/${id}`).subscribe({
      next: (deletedBoat) => console.log('Boat deleted: ', id),
      error: (err: HttpErrorResponse) => this.logHttpErrorResponseToConsole(err)
    })
  }

  public deleteBoat2(id: number): Signal<Boat | undefined> {
    const boatObservable = this.http.delete<Boat>(`${this.baseUrl}/${id}`)
    return toSignal(boatObservable);
  }

  private logHttpErrorResponseToConsole(err: HttpErrorResponse) {
    console.error('Status:', err.status);
    console.error('StatusText:', err.statusText);
    console.error('URL:', err.url);
    console.error('Message:', err.message);
    console.error('Error body:', err.error);
  }
}
