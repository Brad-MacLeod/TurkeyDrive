import {Component, Input } from '@angular/core';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-locations',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './locations.component.html',
  styleUrl: './locations.component.scss',
  
})
export class LocationsComponent {
  @Input() name: string = "";
  @Input() address: string = "";
  @Input() hours: string[] = [];
  @Input() image: string = "";
  @Input() door: string = "";

  public index:number = 0;


  getImage(){
    return "/images/" + this.image;
  }

  hasHours(){
    return this.hours.length > 0;
  }
}

