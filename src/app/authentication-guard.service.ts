import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { AuthenticationService } from './authentication.service';

import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationGuardService implements CanActivate {

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  canActivate() {
      return this.authenticationService.user$.map(user => {
        if (user) { return true; }

        this.router.navigate(['/login']);
        return false;
      });
  }

}
