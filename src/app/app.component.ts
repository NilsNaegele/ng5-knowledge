import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './authentication.service';
import { UserService } from './user.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  template: `
          <app-navbar [sidenav]="sidenav"></app-navbar>
          <mat-sidenav-container>
            <mat-sidenav #sidenav mode="side" class="app-sidenav">
              <app-sidenav></app-sidenav>
            </mat-sidenav>
              <div class="app-content">
                  <router-outlet></router-outlet>
              </div>
        </mat-sidenav-container>
  `,
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      flex: 1;
    }
    `]
})
export class AppComponent implements OnDestroy {
  private userSubscription: Subscription;

    constructor(private userService: UserService,
                private authenticationService: AuthenticationService,
                private router: Router) {
      this.userSubscription = authenticationService.user$.subscribe(user => {
                if (user) {
                  userService.save(user);
                  const returnUrl = localStorage.getItem('returnUrl');
                  router.navigateByUrl(returnUrl);
                }
        });
    }

    ngOnDestroy() {
      this.userSubscription.unsubscribe();
    }
}
