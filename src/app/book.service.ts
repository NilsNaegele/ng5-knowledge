import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class BookService {
  booksRef: AngularFireList<any>;
  books: Observable<any>;

  constructor(private db: AngularFireDatabase) {
      this.booksRef = db.list('/books');
      this.books = this.booksRef.snapshotChanges().map(changes => {
          return changes.map(change => ({ key: change.payload.key, ...change.payload.val() }));
      });
   }

   create(book) {
     return this.booksRef.push(book);
   }

   getAllBooks() {
     return this.books;
   }
}
