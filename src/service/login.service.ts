import {Injectable, signal, WritableSignal} from '@angular/core';
import {BoatCredential} from '../shared/boat-credential'

@Injectable({providedIn: 'root'})
export class LoginService {

  isLoggedIn: WritableSignal<boolean> = signal(false);
  userName: WritableSignal<String> = signal('');

  // some valid credentials for testing
  private validCredentials: BoatCredential[] = [
    new BoatCredential(1, 'Donald', 'Duck'),
    new BoatCredential(2, 'Mickey', 'Mouse')];

  areCredentialsValid(name: String, password: String): boolean {
    return this.validCredentials.some(
      credentials => credentials.userName === name && credentials.password === password);
  }
}
