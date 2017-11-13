import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable()
export class BookService {
  booksRef: AngularFireList<any>;

  constructor(private db: AngularFireDatabase) {
      this.booksRef = db.list('/books');
   }

   create(book) {
     return this.booksRef.push(book);
   }

}
