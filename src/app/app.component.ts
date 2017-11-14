import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

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
              <div class="container-loading-shade" *ngIf="isLoadingResults">
                <mat-spinner color="accent" *ngIf="isLoadingResults"></mat-spinner>
              </div>
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
  isLoadingResults = true;

    constructor(private router: Router,
                private snackBar: MatSnackBar,
                private userService: UserService,
                private authenticationService: AuthenticationService) {
                this.openWelcomeSnackBar('Welcome to the party!!!', 'Dance');
      this.userSubscription = authenticationService.user$.subscribe(user => {
                if (user) {
                  userService.save(user);
                  const returnUrl = localStorage.getItem('returnUrl');
                  router.navigateByUrl(returnUrl);
                }
        });
        this.isLoadingResults = false;
    }


    openWelcomeSnackBar(message: string, action: string) {
      this.snackBar.open(message, action, {
        duration: 1000
      });
    }

    ngOnDestroy() {
      this.userSubscription.unsubscribe();
    }
}
