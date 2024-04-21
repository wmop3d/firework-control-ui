import { Component } from '@angular/core';
import { FireworkCountdown } from './models/firework';
import * as fireworks from './fireworks.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'firework-ui';

  fireworkList: FireworkCountdown[] = JSON.parse(JSON.stringify(fireworks));
  



}

