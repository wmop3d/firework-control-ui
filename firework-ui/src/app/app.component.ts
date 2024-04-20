import { Component } from '@angular/core';
import { FireworkCountdown } from './models/firework';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'firework-ui';

  fireworkList: FireworkCountdown[] = [
    {
      id: 120,
      name: 'Cool Firework',
      firetime: 3
    },
    {
      id: 115,
      name: 'Even Nicer Firework',
      firetime: 10
    },
    {
      id: 110,
      name: 'Crappy Firework',
      firetime: 15
    },
    {
      id: 10,
      name: 'Final Firework',
      firetime: 21
    }
  ];


handleTimeEvent(event: string): void {
  const firework = JSON.parse(event);


  console.log(firework);
}

}

