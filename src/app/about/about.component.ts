import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { SearchResult } from '../models/search-result';

@Component({
  selector: 'app-about',
  template: `
          <h1>YouTube Search</h1>
          <div class="container-loading-shade" *ngIf="loading">
            <mat-spinner color="accent" *ngIf="loading"></mat-spinner>
          </div>
          <app-search-box
                  (loading)="loading = $event"
                  (results)="updateResults($event)">
          </app-search-box>
          <div class="flex-container">
          <app-search-result class="flex-item" *ngFor="let result of results"
                              [result]="result">
          </app-search-result>
          </div>
  `,
  styles: [`
    .flex-container {
      display: flex;
      flex-wrap: wrap;
    }
    .flex-item {
      margin: 10px;
    }

    `],
  encapsulation: ViewEncapsulation.None
})
export class AboutComponent implements OnInit {
  results: SearchResult[];
  loading: boolean;

  constructor() { }
  ngOnInit() { }

  updateResults(results: SearchResult[]): void {
    this.results = results;
    // console.log('results', results);
  }

}
