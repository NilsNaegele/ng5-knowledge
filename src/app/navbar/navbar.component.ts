import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-navbar',
  template: `
        <mat-toolbar color="primary">
            <button (click)="sidenav.toggle()" mat-mini-fab><mat-icon>menu</mat-icon></button>
              <span class="fill-remaining-space"></span>
                <span routerLink="/">
                  {{ title }}
                  <mat-icon mat-list-icon>home</mat-icon>
               </span>
               <span class="fill-remaining-space"></span>
               <span routerLink="/books">
                  <mat-icon mat-list-icon>laptop_chromebook</mat-icon>
               </span>
               <span class="sample-spacer"></span>
               <span routerLink="/about">
                  <mat-icon mat-list-icon>info_outline</mat-icon>
               </span>
               <span class="sample-spacer"></span>
               <span routerLink="/animations">
                  <mat-icon mat-list-icon>movie_filter</mat-icon>
               </span>
               <span class="sample-spacer"></span>
               <span routerLink="/chat">
                  <mat-icon>chat</mat-icon>
               </span>
               <span class="sample-spacer"></span>
               <span routerLink="/shopping-cart">
                  <mat-icon>shopping_cart</mat-icon>
               </span>
               <span class="sample-spacer"></span>
                  <span routerLink="/login">
                  <mat-icon>android</mat-icon>
                </span>
                <span class="sample-spacer"></span>
               <mat-form-field>
                    <mat-select [(value)]="selected">
                          <mat-option routerLink="" value="YourName">YourName</mat-option>
                          <mat-option routerLink="my/orders" value="My Orders">My Orders</mat-option>
                          <mat-option routerLink="admin/orders" value="Manage Orders">Manage Orders</mat-option>
                          <mat-option routerLink="admin/books" value="Manage Books">Manage Books</mat-option>
                          <mat-option routerLink="/">Logout</mat-option>
                    </mat-select>
               </mat-form-field>
               <span class="sample-right"></span>
                <mat-form-field>
                    <input matInput type="text" value="Search">
                    <button type="button" mat-mini-fab color="accent">Go!</button>
                </mat-form-field>
       </mat-toolbar>
  `,
  styles: [`

        .mat-select-value { color: rgba(255,255,255,.87); }
        .sample-spacer { flex: 0.02 0.02 auto; }
        .sample-right { flex: 0.5 0.5 auto; }
        span { cursor: pointer; }
    `],
  encapsulation: ViewEncapsulation.None
})
export class NavbarComponent {
  @Input() sidenav;
  title = 'Angular 5 Knowledge';
  selected = 'YourName';
}
