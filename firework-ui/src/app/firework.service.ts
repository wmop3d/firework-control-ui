// firework.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LauncherNode } from './models/firework';

export interface FireworkCountdown {
  id: number;
  name: string;
  firetime: number;
}

@Injectable({
  providedIn: 'root',
})
export class FireworkService {

  latestNodeData = new BehaviorSubject<LauncherNode[]>([{
    Letter: '',
    RSSI: 0,
    Battery: 0,
    MAC: ''
  }]);

  constructor(private http: HttpClient) { }

  pingMaster() {
    this.http.get('http://192.168.18.115/ping').subscribe((data) => {
      console.log(data);
    });

  }

  getNodes() {
    this.http.get<LauncherNode[]>('http://192.168.18.115:80/nodes').subscribe((data) => {
      this.latestNodeData.next(data);

    });

  }

  armFirwework() {
    /*   // Send HTTP GET request to firework server http://localhost:5220/api/fireworkcontrol/armFireworks?pin=50&armValue=false
      this.http.get('http://localhost:5220/api/fireworkcontrol/armFireworks?pin=1&armValue=true').subscribe((data) => {
        console.log(data);
      }
      ); */
    console.log('Firework armed');
  }



  disarmFirework() {
    /*     // Send HTTP GET request to firework server http://localhost:5220/api/fireworkcontrol/armFireworks?pin=50&armValue=false
        this.http.get('http://localhost:5220/api/fireworkcontrol/armFireworks?pin=1&armValue=false').subscribe((data) => {
         console.log(data);
       }
       ); */

    console.log('Firework disarmed');
  }



}
