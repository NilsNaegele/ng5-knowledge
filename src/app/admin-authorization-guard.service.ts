import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { AuthenticationService } from './authentication.service';
import { UserService } from './user.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class AdminAuthorizationGuardService implements CanActivate {

  constructor(private authenticationService: AuthenticationService,
              private userService: UserService) { }

  canActivate(): Observable<boolean> {
    return this.authenticationService.User$
    .map(user => user.isAdmin);
  }

}
