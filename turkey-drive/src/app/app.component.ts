import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FaqComponent } from "./tools/faq/faq.component";
import { ProgressComponent } from "./tools/progress/progress.component";
import { ScheduleComponent } from "./tools/schedule/schedule.component";
import { LocationsComponent } from './tools/locations/locations.component';
import { FireComponent } from "./tools/fire/fire.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FaqComponent, ProgressComponent, ScheduleComponent, LocationsComponent, FireComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'turkey-drive';
  goal:number = 150;
  progress:number = 11;
}
