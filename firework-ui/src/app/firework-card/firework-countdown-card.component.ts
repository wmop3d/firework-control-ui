import { Component, Input, OnInit } from '@angular/core';

export class FireworkCountdown {
  id: number = 0;
  name: string = '';
  firetime: number = 0; // Assuming this is a Unix timestamp
}

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
