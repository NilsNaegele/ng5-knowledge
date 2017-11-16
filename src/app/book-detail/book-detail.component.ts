import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../book.service';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-book-detail',
  template: `
          <mat-card class="book-card" *ngIf="book">
             <mat-card-header>
               <div mat-card-avatar class="example-header-image"></div>
                <mat-card-title>{{ book[0].title }}</mat-card-title>
                <mat-card-subtitle>{{ book[0].category }}</mat-card-subtitle>
              </mat-card-header>
              <img mat-card-image [src]="book[0].imageUrl" alt="{{ book[0].title }}">
              <mat-card-content>
                <p>
                {{ book[0].description }}
                </p>
              </mat-card-content>
              <mat-card-actions>
                <button mat-raised-button color="accent">LIKE</button>
                <button mat-raised-button color="primary">SHARE</button>
              </mat-card-actions>
            </mat-card>
  `,
  styles: [`
    .book-card {
        width: 400px;
      }
      :host {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
      p  {
          height: 210px;
          overflow: hidden;
        }
    `],
  encapsulation: ViewEncapsulation.Emulated
})
export class BookDetailComponent {
  id = '';
  book;
  bookImageUrl;

  constructor(private activatedRoute: ActivatedRoute,
              private bookService: BookService) {
      this.id = this.activatedRoute.snapshot.paramMap.get('id');
      if (this.id) {
        this.bookService.getBookById(this.id).take(1).subscribe(book => {
           this.book = book;
           this.bookImageUrl = book.imageUrl;
         });
      }
   }

}
