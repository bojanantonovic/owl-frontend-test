import {Injectable} from '@angular/core';
import {BoatCredential} from '../shared/BoatCredential'

@Injectable({providedIn: 'root'})
export class LoginService {

  // some valid credentials for testing
  private validCredentials: BoatCredential[] = [
    new BoatCredential(1, 'Donald', 'Duck'),
    new BoatCredential(2, 'Mickey', 'Mouse')];

  areCredentialsValid(name: String, password: String): boolean {
    return this.validCredentials.some(
      credentials => credentials.userName === name && credentials.password === password);
  }
}
