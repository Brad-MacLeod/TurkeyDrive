import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProgressComponent } from "./tools/progress/progress.component";
import { LocationsComponent } from './tools/locations/locations.component';
import { SiteConfig } from './tools/model/SiteConfig';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NumberCounterComponent } from "./tools/number-counter/number-counter.component";
import { formatDate, isPlatformBrowser } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProgressComponent, LocationsComponent, HttpClientModule, NumberCounterComponent, MatIconModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'turkey-drive';
  goal:number = 150;
  prev_goal:number= 0;
  donated:number = 0;
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
        this.donated = this.getDonated(result);
        if(this.donated >= this.goal){
          this.goal = 250;
          this.prev_goal = 150;
        }
        this.progress = Math.round(this.donated / this.goal*100);
        
        //this.lastUpdated = this.getLastUpdated();
      },
      error: (error)=>console.error(error),
      complete: () => console.info("JSON Downloaded")
    });
    
    
  
  }

  getItemProgress(item:Campaign):number{
    
    //console.info(Math.round(this.getDonated() / this.siteConfig.main_goal*100));
    return Math.round(item.progress / item.goal*100);
  }

  private getDonated(result:SiteConfig):number{
    var progress = 0;

    if(result.donated.length>0){
      result.donated
        .filter(d=> d.combine)
        .map(d => {
          progress += d.progress
      });
      return progress;
    }else{
      return 0;
    }
  }  

  isMoney(item:Campaign){
    if(item.units == "money"){
      return true;
    }
    return false;
  }

  // getLastUpdated(){
  //   var d = new Date(this.siteConfig.last_updated);
  //   return formatDate(d, "MMM dd - hh:mm:a", "en-CA"); // hh:mm:ampm
  // }

}

interface Campaign{
  name:string;
  progress:number;
  combine:boolean;
  goal:number;
  show:boolean;
  units:string;
}
