import { Component, Input, OnInit, OnDestroy } from '@angular/core';

export class LauncherNode {
  Letter: string = '';
  RSSI: number = 0;
  BatteryPercent: number = 0;
  MAC: string = '';
}

@Component({
  selector: 'app-launcher-node-card',
  templateUrl: './launcher-node-card.component.html',
  styleUrls: ['./launcher-node-card.component.css']
})
export class LauncherNodeCardComponent implements OnInit, OnDestroy {
  @Input() launcherNode: LauncherNode = new LauncherNode();
  
  secondsSinceUpdate: number = 0;
  private intervalId: any;
  private lastUpdate: Date = new Date();

  ngOnInit(): void {
    console.log(this.launcherNode)
    // Update the seconds counter every second
    this.intervalId = setInterval(() => {
      this.secondsSinceUpdate = Math.floor((new Date().getTime() - this.lastUpdate.getTime()) / 1000);
    }, 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  convertBatteryToFixed(number: number): number {
    return parseFloat(number?.toFixed(0));
  }

  getBatteryPercentage(): any {
    if(this.launcherNode?.BatteryPercent < 0) {
      return "UNK";
    }
    return this.convertBatteryToFixed(this.launcherNode?.BatteryPercent) + "%";
  }

  getRssi(): any {
    if(this.launcherNode?.RSSI <= -999) {
      return "UNK";
    }
    return this.launcherNode?.RSSI + "%"
  }

  // Call this method whenever you update the node data from a parent component.
  updateNodeData(node: LauncherNode): void {
    this.launcherNode = node;
    this.lastUpdate = new Date();
    this.secondsSinceUpdate = 0; // Reset counter on update
  }
}
