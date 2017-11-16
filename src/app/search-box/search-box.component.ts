import { Component, ViewEncapsulation, OnInit,
         Output, EventEmitter, ElementRef } from '@angular/core';

import { YouTubeSearchService } from '../you-tube-search.service';
import { SearchResult } from '../models/search-result';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switch';

@Component({
  selector: 'app-search-box',
  template: `
  <mat-form-field class="search-box">
      <input matInput placeholder="Search" value="Angular 5" autofocus>
  </mat-form-field>
  `,
  styles: [`
    .search-box {
      min-width: 150px;
      max-width: 500px;
      width: 100%;
    }
    `],
  encapsulation: ViewEncapsulation.None
})
export class SearchBoxComponent implements OnInit {
  @Output() loading: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() results: EventEmitter<SearchResult[]> = new EventEmitter<SearchResult[]>();

  constructor(private youTubeSearchService: YouTubeSearchService, private el: ElementRef) { }

  ngOnInit() {
    Observable.fromEvent(this.el.nativeElement, 'keyup')
              .map((e: any) => e.target.value)
              .filter((text: string) => text.length > 1)
              .debounceTime(300)
              .do(() => this.loading.emit(true))
              .map((query: string) => this.youTubeSearchService.search(query))
              .switch()
              .subscribe((results: SearchResult[]) => {
                  this.loading.emit(false);
                  this.results.emit(results);
              },
              (err: any) => {
                console.error(err);
                this.loading.emit(false);
              },
              () => {
                this.loading.emit(false);
              }
            );
  }

}
