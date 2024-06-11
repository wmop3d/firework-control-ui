// firework.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface FireworkCountdown {
  id: number;
  name: string;
  firetime: number;
}

@Injectable({
  providedIn: 'root',
})
export class FireworkService {

  constructor(private http: HttpClient) { }

  armFirwework() {
    // Send HTTP GET request to firework server http://localhost:5220/api/fireworkcontrol/armFireworks?pin=50&armValue=false
    this.http.get('http://localhost:5220/api/fireworkcontrol/armFireworks?pin=1&armValue=true').subscribe((data) => {
      console.log(data);
    }
    );
    console.log('Firework armed');
  }

 

  disarmFirework() {
       // Send HTTP GET request to firework server http://localhost:5220/api/fireworkcontrol/armFireworks?pin=50&armValue=false
       this.http.get('http://localhost:5220/api/fireworkcontrol/armFireworks?pin=1&armValue=false').subscribe((data) => {
        console.log(data);
      }
      );
  
    console.log('Firework disarmed');
  }



  fireFirework(firework: FireworkCountdown): number {
    console.log(firework.name + ' fired');
  
    // Send HTTP GET request to arm the firework
    this.http.get('http://localhost:5220/api/fireworkcontrol/armFireworks?pin=' + firework.id + "&armValue=true").subscribe((data) => {
      console.log(data);
    });
  
    // Set armValue to false after 1 second
    setTimeout(() => {
      this.http.get('http://localhost:5220/api/fireworkcontrol/armFireworks?pin=' + firework.id + "&armValue=false").subscribe((data) => {
        console.log(data);
      });
    }, 1000);
  
    return 1;
  }
  

}
