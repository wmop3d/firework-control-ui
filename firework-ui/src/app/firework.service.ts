// firework.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface FireworkCountdown {
  id: number;
  name: string;
  firetime: number;
}

@Injectable({
  providedIn: 'root',
})
export class FireworkService {
 


  constructor() {}

  armFirwework(){
    console.log('Firework armed');
  }

  disarmFirework(){
    console.log('Firework disarmed');
  }

  fireFirework(firework: FireworkCountdown): number{
    console.log(firework.name + ' fired');

    return 1;
  }

}
