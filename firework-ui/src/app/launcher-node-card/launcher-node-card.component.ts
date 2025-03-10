import { Component, Input, OnInit, OnDestroy } from '@angular/core';

export class LauncherNode {
  Letter: string = '';
  RSSI: number = 0;
  Battery: number = 0;
  MAC: string = '';
}

@Component({
  selector: 'app-launcher-node-card',
  template: `
    <div class="card">
      <div class="card-header">
        <h2>🚀 Firework Launcher Node <span class="node-letter">{{ launcherNode.Letter }}</span></h2>
      </div>
      <div class="card-body">
        <p>📶 <strong>RSSI:</strong> {{ launcherNode.RSSI }}%</p>
        <p>🔋 <strong>Battery:</strong> {{ launcherNode.Battery }}%</p>
        <p>🔗 <strong>MAC:</strong> {{ launcherNode.MAC }}</p>
      </div>
      <div class="card-footer">
        <small>Last update: {{ secondsSinceUpdate }} seconds ago</small>
      </div>
    </div>
  `,
  styles: [`
    .card {
      border: 1px solid #ccc;
      border-radius: 8px;
      padding: 16px;
      margin: 16px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      max-width: 300px;
      background-color: #f9f9f9;
    }
    .card-header {
      border-bottom: 1px solid #eee;
      margin-bottom: 12px;
    }
    .card-body p {
      margin: 8px 0;
      font-size: 1.1em;
    }
    .card-footer {
      text-align: right;
      font-size: 0.9em;
      color: #666;
    }
    .node-letter {
      color: #d9534f;
    }
  `]
})
export class LauncherNodeCardComponent implements OnInit, OnDestroy {
  @Input() launcherNode: LauncherNode = new LauncherNode();
  
  secondsSinceUpdate: number = 0;
  private intervalId: any;
  private lastUpdate: Date = new Date();

  ngOnInit(): void {
    // Update the seconds counter every second
    this.intervalId = setInterval(() => {
      this.secondsSinceUpdate = Math.floor((new Date().getTime() - this.lastUpdate.getTime()) / 1000);
    }, 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  // Call this method whenever you update the node data from a parent component.
  updateNodeData(node: LauncherNode): void {
    this.launcherNode = node;
    this.lastUpdate = new Date();
    this.secondsSinceUpdate = 0; // Reset counter on update
  }
}
