// firework.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FireworkCountdown, LauncherNode, ShowState, UploadResponse } from './models/firework';

@Injectable({
  providedIn: 'root',
})

export class FireworkService {

  latestNodeData = new BehaviorSubject<LauncherNode[]>([{
    Letter: '',
    RSSI: 0,
    BatteryPercent: 0,
    MAC: ''
  }]);



  showStarted = new BehaviorSubject<boolean>(false);
  showComplete = new BehaviorSubject<boolean>(false);
  armed = new BehaviorSubject<boolean>(false);
  showPaused = new BehaviorSubject<boolean>(false);
  timeElapsed = new BehaviorSubject<number>(0);
  restoreState = new BehaviorSubject<ShowState | null>(null)
  constructor(private http: HttpClient) { }

  pingMaster() {
    this.http.get('http://192.168.18.115/ping').subscribe((data) => {
      console.log(data);
    });

  }

  getNodes() {
    this.http.get<LauncherNode[]>('http://192.168.18.115:80/nodes').subscribe((data) => {
      this.latestNodeData.next(data);
      this.getElapsedTime();
    });

  }

  startShow() {
    this.http.get('http://192.168.18.115:80/start').subscribe({
      next: (data) => {
        this.showStarted.next(true);
        this.showPaused.next(false);
        console.log(data);
      },
      error: (error) => {
        // Handle the error
        alert('An error occurred: ' + error.error.message);
        console.error('An error occurred:', error);
      }
    });
  }

  pauseShow() {
    this.http.get<any>('http://192.168.18.115:80/pause').subscribe({
      next: (data) => {

        this.showPaused.next(true);

        console.log(data);
        console.log('Data received:', data);
      },
      error: (error) => {
        // Handle the error
        if (error.status === 400) {
          console.log("Show is already paused or not running");
          this.showPaused.next(true);
        }
        //console.error('An error occurred:', error);
      },
      complete: () => {
        this.showPaused.next(true);
        console.log('Request completed');
      }
    });
  }

  resumeShow() {
    this.http.get<string>('http://192.168.18.115:80/resume').subscribe({
      next: (data) => {
        this.showPaused.next(false);
        console.log(data);
      },
      error: (error) => {

        this.showPaused.next(false);

      }
    })
  }


  getElapsedTime() {
    this.http.get('http://192.168.18.115:80/elapsed').subscribe((data) => {
      this.timeElapsed.next(data as number);
      //console.log(data);
    }
    );
  }

  resumeShowAtTime(time: number) {
    this.http.post('http://192.168.18.115:80/resumeAt', time.toString(), { headers: { "content-type": "text/plain" } }).subscribe({
      next: (data) => {
        this.startShow();
        console.log(data);
      },
      error: (error) => {
        this.startShow();
        console.log(error);
      }
    });
  }

  getshowState() {
    this.http.get<ShowState>('http://192.168.18.115:80/showState').subscribe((data) => {
      console.log(data);
      this.showPaused.next(data.showPaused);
      this.timeElapsed.next(data.elapsedTime);
      this.showComplete.next(data.fireworkCount == data.fireworksFired);
      this.restoreState.next(data);
    }
    );
  }

  uploadShow(fireworksSchedule: FireworkCountdown[]) {
    this.http.post<UploadResponse>('http://192.168.18.115:80/upload', fireworksSchedule).subscribe({
      next: (data) => {
        console.log(data);
        alert("Show uploaded succesfully\n\n" + "Fireworks Parsed: " + data.fireworkCount + "\nShow length (seconds): " + data.maxfireTime);
      },
      error: (error) => {
        // Handle the error
        alert('An error occurred:' + JSON.stringify(error));
      },
      complete: () => {
        console.log('Request completed');
      }
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
