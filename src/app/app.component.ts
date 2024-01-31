import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Observable } from 'rxjs';
import { Item } from './interfaces/item';
import { AngularFireDatabase, SnapshotAction } from '@angular/fire/compat/database';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-fire-project';
  email = '' as string;
  password = '' as string;

  formNewName = '' as string;
  formNewAge = '' as string;

  listRef: any;
  list: Observable<Item[]>;

  constructor(public auth: AuthService, private dataBase: AngularFireDatabase) {
    this.listRef = dataBase.list('list');
    this.list = this.listRef.snapshotChanges().pipe(
      map((changes: SnapshotAction<Item>[]) =>
        changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
  }

  addItem() {
    this.listRef.push({
      name: this.formNewName,
      age: this.formNewAge,
      email: this.auth.user.email,
    });
    this.formNewAge = '';
    this.formNewName = '';
  }

  deleteItem(key: string) {
    this.listRef.remove(key);
  }
}
