import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';

import { SearchResult } from '../models/search-result';

@Component({
  selector: 'app-search-result',
  template: `
        <mat-card class="video-card">
            <mat-card-header>
            <div mat-card-avatar class="video-header-image"></div>
            <mat-card-title>{{ result.title }}</mat-card-title>
            <mat-card-subtitle>Enjoy the Video</mat-card-subtitle>
            </mat-card-header>
            <img mat-card-image [src]="result.thumbnailUrl" alt="{{ result.title }}">
            <mat-card-content>
              <p>
                  {{ result.description }}
              </p>
            </mat-card-content>
          <mat-card-actions>
            <button type="button" mat-raised-button color="accent">WATCH</button>
         </mat-card-actions>
      </mat-card>

  `,
  styles: [`
    .video-card {
      width: 300px;
      height: 560px;
      }
      .video-header-image {
        background-image: url('https://images.emojiterra.com/emojione/v3/128px/1f61b.png');
        background-size: cover;
      }
    `],
  encapsulation: ViewEncapsulation.None
})
export class SearchResultComponent implements OnInit {
  @Input() result: SearchResult;
  constructor() { }

  ngOnInit() {
  }

}
