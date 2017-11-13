import { Component, ViewEncapsulation } from '@angular/core';

import { BookService } from '../../book.service';
import { CategoryService } from '../../category.service';


@Component({
  selector: 'app-book-form',
  template: `
            <form #bookForm="ngForm" (ngSubmit)="save(bookForm.value)" class="book-container">
              <mat-form-field>
                  <input ngModel name="title" matInput placeholder="Title">
              </mat-form-field>
              <mat-form-field>
                  <span matPrefix>€ &nbsp;</span>
                  <input ngModel name="price" matInput type="number" placeholder="Price">
              </mat-form-field>
              <mat-form-field>
                  <mat-select ngModel name="category" placeholder="Categories">
                      <mat-option
                      *ngFor="let cat of categories$ | async " value="{{ cat.key }}">
                      {{ cat.name }}
                      </mat-option>
                  </mat-select>
              </mat-form-field>
              <mat-form-field>
                <textarea ngModel name="description" matInput placeholder="Description"></textarea>
              </mat-form-field>
              <mat-form-field>
                  <input ngModel name="imageUrl" matInput type="url" placeholder="Image URL">
              </mat-form-field>
              <div>
                <button mat-raised-button color="primary">Save</button>
              </div>
            </form>
  `,
  styles: [`
        .book-container {
          display: flex;
          flex-direction: column;
        }
        .book-container > * {
          width: 50%;
        }
        .mat-select-value {
          color: rgb(0, 0, 0);
        }
    `],
  encapsulation: ViewEncapsulation.None
})
export class BookFormComponent {
  categories$;

  constructor(private categoryService: CategoryService, private bookService: BookService) {
    this.categories$ = categoryService.getCategories();
   }

   save(book) {
     console.log(book);
     this.bookService.create(book);
   }

}
