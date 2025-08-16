import {Injectable, WritableSignal} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Boat} from './Boat';


@Injectable({providedIn: 'root'})
export class BoatRestService {
  private readonly baseUrl = 'http://localhost:8080/boats';

  constructor(private http: HttpClient) {
  }

  public getAllBoats(boatsSignal: WritableSignal<Boat[]>): void {
    this.http.get<Boat[]>(this.baseUrl).subscribe({
      next: (boats) => boatsSignal.set(boats),
      error: (err: HttpErrorResponse) => {
        this.logHttpErrorResponseToConsole(err)
      }
    });
  }

  public postBoat(newBoat: Boat): void {
    this.http.post<Boat>(this.baseUrl, newBoat).subscribe({
      next: (saved) => console.log('Boat saved:', saved),
      error: (err: HttpErrorResponse) => {
        this.logHttpErrorResponseToConsole(err)
      }
    });
  }

  private logHttpErrorResponseToConsole(err: HttpErrorResponse) {
    console.error('Status:', err.status);
    console.error('StatusText:', err.statusText);
    console.error('URL:', err.url);
    console.error('Message:', err.message);
    console.error('Error body:', err.error);
  }
}
