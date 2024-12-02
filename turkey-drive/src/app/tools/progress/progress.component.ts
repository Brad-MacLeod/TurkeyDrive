import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Input,AfterViewInit,
  OnChanges,
  SimpleChanges, 
  Inject,
  PLATFORM_ID} from '@angular/core';
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
  private width:number = 500;
  diameter?:number;
  stroke?:number;
  
  

  private _lg:number = 65;
  private _md:number=40;
  private _sm:number = 25;
  private _lg_stroke:number = 12;
  private _md_stroke:number=9;
  private _sm_stroke:number = 6;

  // async getProgress(){
  //   return this.progress/this.goal*100;
  // }

  counter = new BehaviorSubject<string>("0");

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { 
    //this.updateProgress();
  }

  ngOnInit(){
    if (isPlatformBrowser(this.platformId)) {
      if (typeof visualViewport !== 'undefined') {
        if(visualViewport !=null){
          this.width = visualViewport.width;
          this.diameter = this.getSize();
          this.stroke = this.getStroke();
        }
      } 
    }
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
      //this.updateProgress();
      //this.counter = String(start) + this.number.toString().substring(3);
      if (start === end) {
        clearInterval(timer);
      }
    }, incrementTime);
  }

  // updateProgress() {
    
  //   let c = parseInt(String(this.counter.value).substring(0, 3));
  //   c += 10;
  //   if (c <= 40) {
  //     this.progressColor = 'warn';  // Red for low progress
  //   } else {
  //     this.progressColor = 'primary';  // Green for high progress
  //   }
  // }

  getSize(){
    if(this.width >= 768){
      return this._lg;
    }else if(this.width <= 450){
      return this._sm;
    }else{
      return this._md;
    }
  }

  getStroke(){
    if(this.width >= 768){
      return this._lg_stroke;
    }else if(this.width <= 450){
      return this._sm_stroke;
    }else{
      return this._md_stroke;
    }
  }
  
}
