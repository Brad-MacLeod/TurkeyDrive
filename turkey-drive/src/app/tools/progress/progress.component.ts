import { Component, Input } from '@angular/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';

@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [MatProgressBarModule],
  templateUrl: './progress.component.html',
  styleUrl: './progress.component.scss'
})
export class ProgressComponent {
  @Input() turkeys: number = 0;
  @Input() goal: number = 150;

  getProgress(){
    return this.turkeys/this.goal*100;
  }

}
