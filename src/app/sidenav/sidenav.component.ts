import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  template: `
        <mat-list>
            <h3 mat-subheader>My Technologies</h3>
            <mat-list-item *ngFor="let technology of technologies">
              <mat-icon mat-list-icon>sentiment_very_satisfied</mat-icon>
              <h4 mat-line>{{ technology.name }}</h4>
              <a mat-mini-fab color="accent" href="{{ technology.url}}"
              target="_blank" mat-line>Go!</a>
            </mat-list-item>
            <mat-divider></mat-divider>
            <h3 mat-subheader>My Projects</h3>
            <mat-list-item *ngFor="let technology of myTechnologies">
              <mat-icon mat-list-icon>developer_mode</mat-icon>
              <h4 mat-line>{{ technology.name }}</h4>
              <a mat-mini-fab color="primary" href="{{ technology.url}}"
              target="_blank" mat-line>Visit!</a>
            </mat-list-item>
        </mat-list>

  `,
  styles: [``],
  encapsulation: ViewEncapsulation.None
})
export class SidenavComponent {

    technologies = [
      { name: 'Angular 5', url: 'https://angular.io/' },
      { name: 'Angular CLI', url: 'https://cli.angular.io/' },
      { name: 'Angular Material', url: 'https://material.angular.io/' },
      { name: 'Firebase', url: 'https://firebase.google.com/' },
      { name: 'Google Cloud Platform', url: 'https://cloud.google.com/' },
      { name: 'Ionic 3', url: 'https://ionicframework.com/' }
    ];

    myTechnologies = [
      { name: 'Angular 4 Love Affair', url: 'https://nilsnaegele.gitbooks.io/angular-4-love-affair/content/cover-page.html' },
      { name: 'Angular 4 Exploration', url: 'https://nilsholger.gitbooks.io/angular-4-exploration/content/coverpage.html' },
      { name: 'Angular 4 Books', url: 'https://ng4-books.firebaseapp.com/' },
      { name: 'Angular 4 Newsmedia', url: 'https://ng4-newsmedia.firebaseapp.com/' },
      { name: 'Angular 4 Hackernews', url: 'https://ng4-hackernews.firebaseapp.com/' },
      { name: 'Personal Website', url: 'http://nilsnaegele.com/' }
    ];



}
