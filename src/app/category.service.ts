import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class CategoryService {
  categoriesRef: AngularFireList<any>;
  categories: Observable<any>;

  constructor(private db: AngularFireDatabase) {
      this.categoriesRef = db.list('/categories');
      this.categories = this.categoriesRef.snapshotChanges().map(changes => {
          return changes.map(change => ({ key: change.payload.key, ...change.payload.val() }));
      });
  }

  getCategories() {
    return this.categories;
  }

}
