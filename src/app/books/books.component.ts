import { Component, ViewEncapsulation } from '@angular/core';

import { BookService } from '../book.service';

@Component({
  selector: 'app-books',
  template: `
          <mat-grid-list cols="3">
          <div class="container-loading-shade" *ngIf="isLoadingResults">
            <mat-spinner color="accent" *ngIf="isLoadingResults"></mat-spinner>
          </div>
            <mat-grid-tile *ngFor="let book of books$ | async">
            <mat-card class="book-collection-card">
             <a [routerLink]="['/book/', book.key]">
              <img mat-card-image [src]="book.imageUrl" alt="book.title">
             </a>
              <mat-card-content>
              </mat-card-content>
            </mat-card>
            </mat-grid-tile>
          </mat-grid-list>
  `,
  styles: [`
    .book-collection-card {
      width: 100%;
    }
    `],
  encapsulation: ViewEncapsulation.None
})
export class BooksComponent {
  isLoadingResults = true;
  books$;

  constructor(private bookService: BookService) {
    this.books$ = bookService.getAllBooks();
    this.isLoadingResults = false;
  }

}
