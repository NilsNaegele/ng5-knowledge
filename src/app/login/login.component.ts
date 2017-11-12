import { Component, ViewEncapsulation } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  template: `
              <mat-card class="login-card">
                  <mat-card-header>
                    <div mat-card-avatar class="login-header-image"></div>
                      <mat-card-title>Google</mat-card-title>
                        <mat-card-subtitle>Mountain View, California, USA</mat-card-subtitle>
                  </mat-card-header>
                  <img
                  mat-card-image
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1024px-Google_%22G%22_Logo.svg.png"
                  alt="Google Logo">
            <mat-card-content>
            <p class="center">
              Google is an engineering company that works and furthers Open Source development worldwide
              for the benefit of humanity. Google is very strong with JavaScript, Java, C++ and a host of
              other technologies it has developed. For example Angular, Android, V8, Chromium. Google is
              a champion and champions Open Source Development for the progress of mankind.
            </p>
            </mat-card-content>
            <mat-card-actions>
              <button (click)="login()" mat-raised-button color="warn">Log</button>
              <button (click)="login()" mat-raised-button class="orange">In</button>
              <button (click)="login()" mat-raised-button class="green">With</button>
              <button (click)="login()" mat-raised-button color="primary">Google</button>
            </mat-card-actions>
  `,
  styles: [`
        .center {
          text-align: center;
        }
        .mat-card-actions .mat-raised-button:first-child {
          margin-left: 25px;
        }
      .orange {
        background-color: orange;
        color: #fff;
        }
        .green {
          background-color: green;
          color: #fff;
        }
        .login-card {
          width: 400px;
        }
      .login-header-image {
        background-image:
        url('https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1024px-Google_%22G%22_Logo.svg.png');
        background-size: cover;
      }
      :host {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }

    `],
  encapsulation: ViewEncapsulation.Emulated
})
export class LoginComponent {

  constructor(private authenticationService: AuthenticationService) { }

  login() {
      this.authenticationService.login();
  }

}
