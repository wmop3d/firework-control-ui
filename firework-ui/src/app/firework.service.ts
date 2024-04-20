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
  private fireworkListSubject = new BehaviorSubject<FireworkCountdown[]>([]);
  fireworkList$ = this.fireworkListSubject.asObservable();

  constructor() {}

  setFireworkList(fireworks: FireworkCountdown[]) {
    this.fireworkListSubject.next(fireworks);
  }

  addFirework(firework: FireworkCountdown) {
    const current = this.fireworkListSubject.value;
    this.fireworkListSubject.next([...current, firework]);
  }

  saveFireworkList(): string {
    return JSON.stringify(this.fireworkListSubject.value);
  }

  loadFireworkList(jsonString: string) {
    try {
      const fireworks = JSON.parse(jsonString);
      this.setFireworkList(fireworks);
    } catch (e) {
      console.error('Error parsing JSON', e);
    }
  }
}
