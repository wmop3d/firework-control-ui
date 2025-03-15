import { Component, Input, OnInit } from '@angular/core';
import { FireworkCountdown } from '../models/firework';


@Component({
  selector: 'app-firework-countdown-card',
  templateUrl: './firework-countdown-card.component.html',
  styleUrls: ['./firework-countdown-card.component.css']
})
export class FireworkCountdownCardComponent implements OnInit {

  @Input() fireworkCountdown!: FireworkCountdown;


  constructor() { }

  ngOnInit(): void {
 
  }


}
