import { Component } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule],
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss'
})
export class FaqComponent {
  dataSource = ELEMENT_DATA;
  columnsToDisplay = ['question'];
  columnsToDisplayWithExpand = ['expand',...this.columnsToDisplay];
  expandedElement: Question | null | undefined;
}

export interface Question {
  question: string;
  description: string;
}

const ELEMENT_DATA: Question[] = [
  {
    question: 'How to donate online?',
    description: 'You can donate any amount via an e-transfer to helpinghands@bellaliant.com',
  }
];
