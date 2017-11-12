import { Component } from '@angular/core';


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
export class AppComponent {


}
