
import { Component, Input, OnInit } from '@angular/core';
import { Firework } from '../models/firework';

@Component({
  selector: 'app-firework-card',
  templateUrl: './firework-card.component.html',
  styleUrls: ['./firework-card.component.css']
})
export class FireworkCardComponent implements OnInit {
  @Input() firework!: Firework



  ngOnInit(): void {
    
  }

}
