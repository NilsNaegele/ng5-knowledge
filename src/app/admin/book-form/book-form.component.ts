import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { BookService } from '../../book.service';
import { CategoryService } from '../../category.service';


@Component({
  selector: 'app-book-form',
  template: `
            <mat-grid-list cols="2">
            <mat-grid-tile>
            <form #bookForm="ngForm" (ngSubmit)="save(bookForm.value)" class="book-container">
              <mat-form-field>
                  <input matInput #title="ngModel" ngModel name="title"
                         placeholder="Title" required>
                  <mat-error *ngIf="title.touched && title.invalid">
                    Title is <strong>required.</strong>
                  </mat-error>
              </mat-form-field>
              <mat-form-field>
                  <span matPrefix>€ &nbsp;</span>
                  <input matInput #price="ngModel" ngModel name="price" type="number"
                         placeholder="Price" required [min]="0">
                  <mat-error *ngIf="price.touched && price.invalid">
                    <span *ngIf="price.errors.required">Price is <strong>required.</strong></span>
                    <span *ngIf="price.errors.min">Price should be greater equal <strong>0.</strong></span>
                  </mat-error>
              </mat-form-field>
              <mat-form-field>
                  <mat-select #category="ngModel" ngModel name="category"
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
                <textarea #description="ngModel" ngModel name="description"
                matInput placeholder="Description" required></textarea>
                <mat-error *ngIf="description.touched && description.invalid">
                  Description is <strong>required.</strong>
                </mat-error>
              </mat-form-field>
              <mat-form-field>
                  <input #imageUrl="ngModel" ngModel name="imageUrl" matInput
                          type="url" placeholder="Image URL" required url>
                <mat-error *ngIf="imageUrl.touched && imageUrl.invalid">
                  <span *ngIf="imageUrl.errors.required">Image URL is <strong>invalid.</strong></span>
                  <span *ngIf="imageUrl.errors.url">Please enter a valid <strong>URL.</strong></span>
                </mat-error>
              </mat-form-field>
              <div>
                <button mat-raised-button color="primary" [disabled]="!bookForm.form.valid">Save</button>
              </div>
            </form>
            </mat-grid-tile>
            <mat-grid-tile>
            <mat-card class="book-card" *ngIf="title.value">
                <mat-card-header>
                  <mat-card-title>{{ title.value }}</mat-card-title>
                  <mat-card-subtitle>{{ price.value | currency:'EUR':'symbol' }}</mat-card-subtitle>
                </mat-card-header>
                <img mat-card-image style="height: 80%; width: 80%;" [src]="imageUrl.value">
                <mat-card-content class="break-word">
                <p>{{ description.value }}</p>
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

    `],
  encapsulation: ViewEncapsulation.None
})
export class BookFormComponent {
  categories$;

  constructor(private router: Router,
              private snackBar: MatSnackBar,
              private categoryService: CategoryService,
              private bookService: BookService) {
    this.categories$ = categoryService.getCategories();
  }

  save(book) {
    console.log(book);
    // this.bookService.create(book);
    this.snackBar.open(book.title, 'added', {
      duration: 2000
    });
    this.router.navigate(['admin/books']);
  }

}
