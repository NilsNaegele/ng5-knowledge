import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-admin-books',
  template: `
        <a mat-raised-button color="warn" routerLink="/admin/books/new">New Book</a>
  `,
  styleUrls: ['./admin-books.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AdminBooksComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
