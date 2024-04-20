import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FireworkCountdown } from '../models/firework';

@Component({
    selector: 'app-timer-progress-bar',
    templateUrl: './timer-progress-bar.component.html',
    styleUrls: ['./timer-progress-bar.component.css']
})
export class TimerProgressBarComponent implements OnInit, OnDestroy {

    startTimeInSeconds: number = 0;

    @Input() FireworkList: FireworkCountdown[] = [];
    @Output() timeEvent = new EventEmitter<string>();
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

    ngOnInit(): void {

        this.startTimeInSeconds = 0;

        this.currentTimeInSeconds = this.startTimeInSeconds;
        this.eventTimes = this.FireworkList.map(firework => firework.firetime);

        // Sort eventTimes in descending order to efficiently find the next event time
        this.eventTimes.sort((a, b) => b + a);

        this.updateNextEventTime();

        this.intervalId = setInterval(() => this.updateTime(), 1000);

        this.startTimeInSeconds = this.eventTimes[this.eventTimes.length - 1];
    }

    ngOnDestroy(): void {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
    }

    private updateTime(): void {
        if (!this.showComplete) {
            this.currentTimeInSeconds++;
            this.updateNextEventProgress();

            if (this.eventTimes.includes(this.currentTimeInSeconds)) {
                this.timeEvent.emit(JSON.stringify(this.nextFireworkName));
                this.completedFireworks.push(this.nextFireworkName);
                this.updateNextEventTime();
            }
        } else {
            clearInterval(this.intervalId);
        }
    }

    private updateNextEventTime(): void {

        this.nextEventTimeInSeconds = this.eventTimes?.find(time => time > this.currentTimeInSeconds)?.valueOf() ?? 1;

        this.previousFireworkName = this.nextFireworkName;

        this.nextFireworkName = this.FireworkList.find(firework => firework.firetime === this.nextEventTimeInSeconds) as FireworkCountdown;

        this.updateNextEventProgress(); // Update progress when the next event time is updated
    }


    private updateNextEventProgress(): void {
        this.progressTime = (this.nextEventTimeInSeconds - this.currentTimeInSeconds);

        if (this.progressTime < 0) {
            this.progressTime = 0;
            this.showComplete = true;
        }
    }


}
