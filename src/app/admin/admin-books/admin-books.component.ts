import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

import { BookService } from '../../book.service';
import { Book } from '../../models/book';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-admin-books',
  template: `
        <p>
          <a mat-raised-button color="primary" routerLink="/admin/books/new">New Book</a>
        </p>

        <div class="book-container mat-elevation-z8">
        <div class="book-header">
            <mat-form-field>
              <input matInput (keyup)="applyFilter($event.target.value)"
                     placeholder="Search ...">
            </mat-form-field>
        </div>
        <div class="container-loading-shade" *ngIf="isLoadingResults">
          <mat-spinner *ngIf="isLoadingResults"></mat-spinner>
        </div>

        <mat-table #table [dataSource]="dataSource">

          <!-- title Column -->
        <ng-container matColumnDef="title">
          <mat-header-cell *matHeaderCellDef> Title </mat-header-cell>
          <mat-cell *matCellDef="let book"> {{ book.title }} </mat-cell>
        </ng-container>

        <!-- Price Column -->
        <ng-container matColumnDef="price">
          <mat-header-cell *matHeaderCellDef> Price </mat-header-cell>
          <mat-cell *matCellDef="let book"> {{ book.price | currency:'EUR':'symbol' }} </mat-cell>
        </ng-container>

        <!-- Edit Column -->
        <ng-container matColumnDef="">
          <mat-header-cell *matHeaderCellDef></mat-header-cell>
           <mat-cell *matCellDef="let book">
             <a mat-raised-button color="accent" [routerLink]="['/admin/books/', book.key]">Edit</a>
          </mat-cell>
       </ng-container>

    <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
    <mat-row *matRowDef="let row; columns: displayedColumns;"></mat-row>
  </mat-table>

</div>

  `,
  styles: [`
      .book-container {
        display: flex;
        flex-direction: column;
        max-height: 500px;
        min-width: 300px;
      }
      .book-header {
        min-height: 64px;
        padding: 8px 24px 0;
      }
      .mat-form-field {
        font-size: 14px;
        width: 60%;
      }
      .mat-table {
        overflow: auto;
        max-height: 500px;
      }
    `],
  encapsulation: ViewEncapsulation.Emulated
})
export class AdminBooksComponent implements OnInit, OnDestroy {
  displayedColumns = ['title', 'price', ''];
  dataSource: MatTableDataSource<Book>;
  isLoadingResults = false;
  booksSubscription: Subscription;

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  constructor(private bookService: BookService) {
    this.isLoadingResults = true;
  }

  ngOnInit() {
   this.booksSubscription = this.bookService.getAllBooks().subscribe(books => {
      this.dataSource = new MatTableDataSource<Book>(books);
      this.isLoadingResults = false;
    });
  }

  ngOnDestroy() {
    this.booksSubscription.unsubscribe();
  }

}
