import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProgressComponent } from "./tools/progress/progress.component";
import { LocationsComponent } from './tools/locations/locations.component';
import { SiteConfig } from './tools/model/SiteConfig';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NumberCounterComponent } from "./tools/number-counter/number-counter.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProgressComponent, LocationsComponent, HttpClientModule, NumberCounterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'turkey-drive';
  goal:number = 150;
  progress:number = 28;
  duration:number = 2;
  
  siteConfig: SiteConfig = new SiteConfig;
  configUrl = 'data/SiteConfig.json';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<SiteConfig>(this.configUrl).subscribe((results) => 
      {
        this.siteConfig = results;  

      });
  }

  getProgress():number{
    var progress = 0;

    if(this.siteConfig.donated.length>0){
      this.siteConfig.donated
        .filter(d=> d.combine)
        .map(d => {
          progress += d.progress
      });
      return progress;
    }else{
      return this.progress;
    }
  }
}
