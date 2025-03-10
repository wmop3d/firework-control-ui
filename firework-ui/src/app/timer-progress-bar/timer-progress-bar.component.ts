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
  FireworkList: FireworkCountdown[] = fireworks as FireworkCountdown[];
  progressTime = 0;
  currentTimeInSeconds: number = 0;
  nextEventTimeInSeconds: number = 0;
  completedFireworks: FireworkCountdown[] = [];
  previousFireworkName: FireworkCountdown = {
    id: 0,
    name: '',
    firetime: 0
  } || undefined;
  showComplete = false;
  nextFireworkName: FireworkCountdown = {
    id: 0,
    name: '',
    firetime: 0
  } || undefined;
  private intervalId: any;
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
        this.showStarted = true;
        this.startShowSteps();
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

  startShowSteps(): void {
    this.startTimeInSeconds = 0;
    this.currentTimeInSeconds = this.startTimeInSeconds;
    this.eventTimes = this.FireworkList.map(firework => firework.firetime);
    this.eventTimes.sort((a, b) => a - b);
    this.updateNextEventTime();
    this.intervalId = setInterval(() => this.updateTime(), 1000);
    this.showStarted = true;
  }

  ngOnInit(): void {
    this.fireworkService.latestNodeData.pipe(skip(1)).subscribe((data) => {
      console.log(data);
      this.launcherNodes = data;
    })

    this.fireworkService.getNodes();
  }

  refreshData() {
    this.fireworkService.getNodes();
  }

  pauseShow() {
    this.pause = !this.pause;
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private updateTime(): void {
    if (!this.pause) {
      this.pauseBtnText = "Pause";
      if (!this.showComplete) {
        this.currentTimeInSeconds++;
        this.updateNextEventProgress();

        // Fire all fireworks scheduled for the current time
        const fireworksToFire = this.FireworkList.filter(firework => firework.firetime === this.currentTimeInSeconds);
        fireworksToFire.forEach(firework => {
          //this.fireworkService.fireFirework(firework);
          this.completedFireworks.push(firework);
        });

        this.updateNextEventTime();
      } else {
        clearInterval(this.intervalId);
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
    this.nextFireworkName = this.FireworkList.find(firework => firework.firetime === this.nextEventTimeInSeconds) as FireworkCountdown;

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
