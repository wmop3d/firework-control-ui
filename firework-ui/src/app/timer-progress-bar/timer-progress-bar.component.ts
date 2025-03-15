import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FireworkCountdown, LauncherNode } from '../models/firework';
import fireworks from '../fireworks.json';
import { FireworkService } from '../firework.service';
import { skip } from 'rxjs';

@Component({
  selector: 'app-timer-progress-bar',
  templateUrl: './timer-progress-bar.component.html',
  styleUrls: ['./timer-progress-bar.component.css']
})

export class TimerProgressBarComponent implements OnInit, OnDestroy {
  constructor(private fireworkService: FireworkService) { }
  pause = false;
  pauseBtnText = "Pause";
  isArmed = false;
  checkArmed: any;
  startTimeInSeconds: number = 0;
  showStarted = false;
  resumeTime: number = 0;
  FireworkList: FireworkCountdown[] = fireworks as FireworkCountdown[];
  progressTime = 0;
  currentTimeInSeconds: number = 0;
  nextEventTimeInSeconds: number = 0;
  completedFireworks: FireworkCountdown[] = [];

  previousFireworkName: FireworkCountdown = {
    id: 0,
    fireworkName: '',
    fireTime: 0,
    triggerWire: ''
  };

  showComplete = false;
  nextFireworkName: FireworkCountdown = {
    id: 0,
    fireworkName: '',
    fireTime: 0,
    triggerWire: ''
  };

  private intervalId: any;
  private syncTime: any;

  serverTimer: number = -1;
  eventTimes: number[] = [];

  launcherNodes: LauncherNode[] = [];

  handleTimeEvent(event: string): void {
    const firework = JSON.parse(event);

    //this.fireworkService.fireFirework(firework);
    console.log(firework);
  }

  StartTheShow() {
    if (this.checkArmed) {
      if (window.confirm("Are you sure you want to start the show?")) {
        if (this.pause) {
          this.syncTimeWithServer();
          this.fireworkService.resumeShow();

        }
        else {
          this.fireworkService.startShow();
        }

      }
    } else {
      alert("Please arm the igniters first");
    }
  }

  armDisarmFirework(event: any) {
    if (event.target.checked) {
      this.fireworkService.armFirwework();
    } else {
      this.fireworkService.disarmFirework();
    }
  }

  uploadShow() {

    this.fireworkService.uploadShow(fireworks);
  }

  startShowSteps(): void {
    //this.startTimeInSeconds = 0;
    this.currentTimeInSeconds = this.startTimeInSeconds;
    this.eventTimes = this.FireworkList.map(firework => firework.fireTime);
    this.eventTimes.sort((a, b) => a - b);
    this.updateNextEventTime();
    clearInterval(this.intervalId);
    this.intervalId = setInterval(() => this.updateTime(), 1000);
    clearInterval(this.syncTime);
    this.syncTime = setInterval(() => this.fireworkService.getElapsedTime(), 1000);
    this.showStarted = true;
  }

  serverInSync() {

    this.currentTimeInSeconds - this.serverTimer;

    if (this.currentTimeInSeconds - this.serverTimer > 1 && this.currentTimeInSeconds - this.serverTimer < 1) {
      return false;
    }

    return true;
  }

  ngOnInit(): void {
    this.fireworkService.latestNodeData.pipe(skip(1)).subscribe((data) => {
      console.log(data);
      this.launcherNodes = data;
    })

    this.fireworkService.showStarted.pipe(skip(1)).subscribe((data) => {
      this.startShowSteps();
    });

    this.fireworkService.showPaused.pipe(skip(1)).subscribe((data) => {
      this.pause = data;
      if (!data) {
        this.startShowSteps();
      }
    });

    this.fireworkService.timeElapsed.pipe(skip(1)).subscribe((data) => {
      this.serverTimer = data;
      this.currentTimeInSeconds = data;
      /*       this.currentTimeInSeconds = data;
            this.updateNextEventTime(); */
    });

    this.fireworkService.restoreState.pipe(skip(1)).subscribe((data) => {
      if (data) {

        if (!data.showStarted) {
          this.showStarted = false;
          this.pause = false;
          this.currentTimeInSeconds = 0;
          if (this.intervalId) {
            clearInterval(this.intervalId);
          }
          return;
        }
        else {


          this.startTimeInSeconds = data.elapsedTime;
          this.currentTimeInSeconds = data.elapsedTime;

          if (data.showStarted && !data.showPaused) {
            this.pauseShow();
          }

          if (!data.showStarted) {
            this.pauseShow();
          }
        }

      }
    });


    this.fireworkService.getNodes();
    this.fireworkService.getshowState();
  }

  refreshData() {
    this.fireworkService.getNodes();
  }

  resumeShowAtTime(time: number) {
    this.fireworkService.resumeShowAtTime(time);
    this.currentTimeInSeconds = time;
  }

  syncTimeWithServer() {
    this.fireworkService.getElapsedTime();
    //this.currentTimeInSeconds = this.serverTimer;
  }

  pauseShow() {
    this.pause = true;
    this.fireworkService.pauseShow();
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private updateTime(): void {
    // if show isn't paused...
    if (!this.pause) {
      this.pauseBtnText = "Pause";
      if (!this.showComplete) {
        this.currentTimeInSeconds++;
        this.updateNextEventProgress();

        // Fire all fireworks scheduled for the current time
        const fireworksToFire = this.FireworkList.filter(firework => firework.fireTime === this.currentTimeInSeconds);
        fireworksToFire.forEach(firework => {
          //this.fireworkService.fireFirework(firework);
          this.completedFireworks.push(firework);
        });

        this.updateNextEventTime();
      }
    } else {
      this.pauseBtnText = "Continue";
    }
  }

  private updateNextEventTime(): void {
    const nextEventTimes = this.eventTimes.filter(time => time > this.currentTimeInSeconds);
    if (nextEventTimes.length > 0) {
      this.nextEventTimeInSeconds = nextEventTimes[0];
    } else {
      this.showComplete = true;
    }

    this.previousFireworkName = this.nextFireworkName;
    this.nextFireworkName = this.FireworkList.find(firework => firework.fireTime === this.nextEventTimeInSeconds) as FireworkCountdown;

    this.updateNextEventProgress();
  }

  private updateNextEventProgress(): void {
    this.progressTime = (this.nextEventTimeInSeconds - this.currentTimeInSeconds);

    if (this.progressTime < 0) {
      this.progressTime = 0;
      this.showComplete = true;
    }
  }
}
