import {Routes} from '@angular/router';
import {Login} from '../app/login/login'
import {BoatsScreen} from '../app/boats-screen/boats-screen'
import {authGuard} from '../shared/authGuard'
import {AddBoatScreen} from '../app/add-boat-screen/add-boat-screen'

export const routes: Routes = [
  /*{
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },*/
  {
    path: 'login',
    component: Login
  },
  {
    path: 'boats',
    component: BoatsScreen,
    canActivate: [authGuard]
  },
  {
    path: 'add-boat',
    component: AddBoatScreen,
    canActivate: [authGuard]
  }
];
