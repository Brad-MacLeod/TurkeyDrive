import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProgressComponent } from "./tools/progress/progress.component";
import { LocationsComponent } from './tools/locations/locations.component';
import { SiteConfig } from './tools/model/SiteConfig';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NumberCounterComponent } from "./tools/number-counter/number-counter.component";
import { formatDate, isPlatformBrowser } from '@angular/common';



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
  progress:number = 0;
  duration:number = 5;

  
  siteConfig: SiteConfig = new SiteConfig;
  configUrl = '/data/SiteConfig.json';
  lastUpdated:string | undefined;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    //console.info( this.http)
    this.http.get<SiteConfig>(this.configUrl).subscribe({
      next: (result)=> {
        this.siteConfig = result;
        this.lastUpdated = this.getLastUpdated();
      },
      error: (error)=>console.error(error),
      complete: () => console.info("JSON Downloaded")
    });
    
    
  
  }

  
  getProgress():number{
    
    //console.info(Math.round(this.getDonated() / this.siteConfig.main_goal*100));
    return Math.round(this.getDonated() / this.siteConfig.main_goal*100);
  }

  getItemProgress(item:Campaign):number{
    
    //console.info(Math.round(this.getDonated() / this.siteConfig.main_goal*100));
    return Math.round(item.progress / item.goal*100);
  }

  getDonated():number{
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

  isMoney(item:Campaign){
    if(item.units == "money"){
      return true;
    }
    return false;
  }

  getLastUpdated(){
    var d = new Date(this.siteConfig.last_updated);
    return formatDate(d, "MMM dd - hh:mm:a", "en-CA"); // hh:mm:ampm
  }

}

interface Campaign{
  name:string;
  progress:number;
  combine:boolean;
  goal:number;
  show:boolean;
  units:string;
}
