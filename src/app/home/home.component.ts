import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
          <mat-grid-list cols="4" rowHeight="200px">
              <mat-grid-tile *ngFor="let dog of dogs" [rowspan]="dog.rows">
              <img src="assets/{{ dog.name }}.png" alt="photo of {{ dog.name }}">
                <mat-grid-tile-footer>
                    <h3 mat-line>{{ dog.name }}</h3>
                    <span mat-line>Human: {{ dog.human }}</span>
                    <span mat-line>Age: {{ dog.age }}</span>
                    <button mat-icon-button>
                      <mat-icon>info</mat-icon>
                    </button>
                </mat-grid-tile-footer>
              </mat-grid-tile>
          </mat-grid-list>
  `,
  styles: [`
        mat-grid-list {
          max-width: 1403px;
          margin: 16px;
        }
    `],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent {

  dogs = [
      { rows: 2, name: 'Superman', human: 'Jeremy', age: 6},
      { rows: 1, name: 'Spiderman', human: 'David', age: 6},
      { rows: 1, name: 'Batman', human: 'Alex', age: 9},
      { rows: 2, name: 'Wonderwoman', human: 'Joey', age: '15 months'},
      { rows: 1, name: 'Flash', human: 'Igor', age: 6},
      { rows: 2, name: 'Rubberman', human: 'Kara', age: 4},
      { rows: 1, name: 'Bombasto', human: 'Stephen', age: 9},
      { rows: 1, name: 'Magneta', human: 'Nils', age: 4},
      { rows: 1, name: 'Thor', human: 'Kara', age: 4}
  ];

}
