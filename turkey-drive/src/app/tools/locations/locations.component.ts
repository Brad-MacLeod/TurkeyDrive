import { Component } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-locations',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './locations.component.html',
  styleUrl: './locations.component.scss',
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class LocationsComponent {
  dataSource = ELEMENT_DATA;
  columnsToDisplay = ['location'];
  columnsToDisplayWithExpand = ['expand',...this.columnsToDisplay];
  expandedElement: Location | null | undefined;
}

export interface Location {
  site: string;
  address: string;
}

const ELEMENT_DATA: Location[] = [
  {
    site: 'Salisbury Fire Rescue',
    address: '56 Douglas St, Salisbury, NB E4J 3E3',
  },
  {
    site: 'Salisbury Helping Hands',
    address: '64 Douglas St, Salisbury, NB E4J 3E3',
  }
];
