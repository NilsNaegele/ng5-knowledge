import { Component, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { BookService } from '../../book.service';
import { CategoryService } from '../../category.service';

import 'rxjs/add/operator/take';

@Component({
  selector: 'app-book-form',
  template: `
            <mat-grid-list cols="2">
            <mat-grid-tile *ngFor="let book of books">
            <form #bookForm="ngForm" (ngSubmit)="save(bookForm.value)" class="book-container">
              <mat-form-field>
                  <input matInput #title="ngModel" [(ngModel)]="book.title" name="title"
                         placeholder="Title" required>
                  <mat-error *ngIf="title.touched && title.invalid">
                    Title is <strong>required.</strong>
                  </mat-error>
              </mat-form-field>
              <mat-form-field>
                  <span matPrefix>€ &nbsp;</span>
                  <input matInput #price="ngModel" [(ngModel)]="book.price" name="price" type="number"
                         placeholder="Price" required [min]="0">
                  <mat-error *ngIf="price.touched && price.invalid">
                    <span *ngIf="price.errors.required">Price is <strong>required.</strong></span>
                    <span *ngIf="price.errors.min">Price should be greater equal <strong>0.</strong></span>
                  </mat-error>
              </mat-form-field>
              <mat-form-field>
                  <mat-select #category="ngModel" [(ngModel)]="book.category" name="category"
                              placeholder="Categories" required>
                      <mat-option value=""></mat-option>
                      <mat-option
                      *ngFor="let cat of categories$ | async " value="{{ cat.key }}">
                      {{ cat.name }}
                      </mat-option>
                  </mat-select>
                  <mat-error *ngIf="category.touched && category.invalid">
                  Category is <strong>required.</strong>
                  </mat-error>
              </mat-form-field>
              <mat-form-field>
                <textarea #description="ngModel" [(ngModel)]="book.description" name="description"
                matInput placeholder="Description" required></textarea>
                <mat-error *ngIf="description.touched && description.invalid">
                  Description is <strong>required.</strong>
                </mat-error>
              </mat-form-field>
              <mat-form-field>
                  <input #imageUrl="ngModel" [(ngModel)]="book.imageUrl" name="imageUrl" matInput
                          type="url" placeholder="Image URL" required url>
                <mat-error *ngIf="imageUrl.touched && imageUrl.invalid">
                  <span *ngIf="imageUrl.errors.required">Image URL is <strong>invalid.</strong></span>
                  <span *ngIf="imageUrl.errors.url">Please enter a valid <strong>URL.</strong></span>
                </mat-error>
              </mat-form-field>
              <div>
                <button mat-raised-button color="primary"
                [disabled]="!bookForm.form.valid">Save</button>
                <button type="button" mat-raised-button color="warn" (click)="delete()"
                [disabled]="!bookForm.form.valid">Delete</button>
              </div>
            </form>
            </mat-grid-tile>
            <mat-grid-tile>
            <mat-card class="book-card" *ngFor="let book of books">
                <mat-card-header>
                  <mat-card-title>{{ book.title }}</mat-card-title>
                  <mat-card-subtitle>{{ book.price | currency:'EUR':'symbol' }}</mat-card-subtitle>
                </mat-card-header>
                <img mat-card-image style="height: 80%; width: 80%;"
                      [src]="book.imageUrl">
                <mat-card-content class="break-word">
                <p class="hidden">{{ book.description }}</p>
                </mat-card-content>
              </mat-card>
            </mat-grid-tile>
          </mat-grid-list>
  `,
  styles: [`
        .book-container {
          display: flex;
          flex-direction: column;
          width: 80%;
        }
        .book-container > * {
          width: 100%;
        }
        .mat-select-value {
          color: rgb(0, 0, 0);
        }
        mat-grid-tile {
          background: #e6e6ff;
        }
        .book-card {
            width: 400px;
          }
        .break-word {
          word-wrap: break-word;
        }
        .hidden {
          height: 100px;
          overflow: scroll;
        }
    `],
  encapsulation: ViewEncapsulation.None
})
export class BookFormComponent {
  categories$;
  books = [{title: '', description: '', price: 0, category: '', imageUrl: ''}];
  id = '';
  constructor(private router: Router,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar,
              private categoryService: CategoryService,
              private bookService: BookService) {
    this.categories$ = categoryService.getCategories();
    this.id = route.snapshot.paramMap.get('id');
    if (this.id) {
        bookService.getBookById(this.id).take(1).subscribe(book => {
        this.books = book;
      });
    }

  }

  save(book) {
    console.log(book);
    if (this.id) {
      this.bookService.updateBook(this.id, book);
    }
    else {
      this.bookService.create(book);
    }
    this.snackBar.open(book.title, 'processed', {
      duration: 2000
    });
    this.router.navigate(['admin/books']);
  }

  delete() {
    if (!confirm('Are you sure you want to delete this book?')) { return; }

    this.bookService.delete(this.id);
    this.router.navigate(['admin/books']);
  }

}
