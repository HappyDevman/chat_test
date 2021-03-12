import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';

import { UserService } from '../services';
import {
  FetchUsers,
  FetchUsersSuccess,
  FetchUsersFailure,
  UserActionTypes
} from '../actions';

@Injectable()
export class UserEffects {
  constructor(
    private actions: Actions,
    private userService: UserService
  ) {}

  @Effect()
  FetchUsers: Observable<any> = this.actions.pipe(
    ofType(UserActionTypes.FETCH_USERS),
    map((action: FetchUsers) => action),
    switchMap(() => {
      return this.userService.fetchUsers().pipe(
        map(response => new FetchUsersSuccess(response)),
        catchError((errorResponse: any) => of(new FetchUsersFailure(errorResponse.error)))
      );
    })
  );
}
