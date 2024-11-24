import { CommonModule } from '@angular/common';
import { Component, Input,AfterViewInit,
  OnChanges,
  SimpleChanges } from '@angular/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { BehaviorSubject } from 'rxjs';
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [MatProgressBarModule, CommonModule, MatProgressSpinnerModule],
  templateUrl: './progress.component.html',
  styleUrl: './progress.component.scss'
})
export class ProgressComponent implements OnChanges, AfterViewInit {
  @Input() progress: number = 0;
  @Input() goal: number = 150;
  @Input() duration: number = 150;
  @Input() type:string="bar";
  progressColor = 'primary';  // Initial color
  isLoading = true;  // Control spinner visibility

  // async getProgress(){
  //   return this.progress/this.goal*100;
  // }

  counter = new BehaviorSubject<string>("0");

  constructor() { 
    //this.updateProgress();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['progress'] && changes['duration']) {
      this.counterFunc();
    }
  }
  
  ngAfterViewInit() {}

  counterFunc() {
    let start = 0;
    let end = parseInt(String(this.progress).substring(0, 3));

    if (start === end) {
      return;
    }

    // find duration per increment
    let totalMilSecDur = this.duration;
    let incrementTime = (totalMilSecDur / end) * 1000;

    let timer = setInterval(() => {
      start += 1;
      this.counter.next(String(start) + this.progress.toString().substring(3));
      this.updateProgress();
      //this.counter = String(start) + this.number.toString().substring(3);
      if (start === end) {
        clearInterval(timer);
      }
    }, incrementTime);
  }

  updateProgress() {
    
    let c = parseInt(String(this.counter.value).substring(0, 3));
    c += 10;
    if (c <= 40) {
      this.progressColor = 'warn';  // Red for low progress
    } else if (this.progress <= 80) {
      this.progressColor = 'accent';  // Blue for medium progress
    } else {
      this.progressColor = 'primary';  // Green for high progress
    }
  }
  
}
