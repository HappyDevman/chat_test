import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs';

@Injectable()
export class UserService {
  constructor() {}

  fetchUsers(): Observable<any> {
    return of([
      {id: 1, firstName: 'David', lastName: 'Jack', userName: 'David Jack'},
      {id: 2, firstName: 'John', lastName: 'Smith', userName: 'John Smith'},
      {id: 3, firstName: 'Felix', lastName: 'Joan', userName: 'Felix Joan'},
      {id: 4, firstName: 'Doe', lastName: 'Jo', userName: 'Doe Jo'},
      {id: 5, firstName: 'Ales', lastName: 'Dub', userName: 'Ales Dub'},
      {id: 6, firstName: 'Tiny', lastName: 'Sma', userName: 'Timy Sma'},
      {id: 7, firstName: 'Lina', lastName: 'Sven', userName: 'Lina Sven'}
    ]);
  }
}
