import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { CustomFormsModule } from 'ng2-validation';

import { environment } from '../environments/environment';
import { AppMaterialModule } from './app.material.module';

import { AppComponent } from './app.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { BooksComponent } from './books/books.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { LoginComponent } from './login/login.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminBooksComponent } from './admin/admin-books/admin-books.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AnimationsComponent } from './animations/animations.component';
import { ChatComponent } from './chat/chat.component';
import { BookFormComponent } from './admin/book-form/book-form.component';
import { BookDetailComponent } from './book-detail/book-detail.component';

import { AuthenticationService } from './authentication.service';
import { AuthenticationGuardService } from './authentication-guard.service';
import { AdminAuthorizationGuardService } from './admin-authorization-guard.service';
import { UserService } from './user.service';
import { CategoryService } from './category.service';
import { BookService } from './book.service';
import { youTubeSearchInjectables } from './you-tube-search.injectable';
import { SearchBoxComponent } from './search-box/search-box.component';
import { SearchResultComponent } from './search-result/search-result.component';


@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    NavbarComponent,
    HomeComponent,
    AboutComponent,
    BooksComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    LoginComponent,
    MyOrdersComponent,
    AdminBooksComponent,
    AdminOrdersComponent,
    AnimationsComponent,
    ChatComponent,
    BookFormComponent,
    BookDetailComponent,
    SearchBoxComponent,
    SearchResultComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    CustomFormsModule,
    AppMaterialModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebase),
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'book/:id', component: BookDetailComponent },
      { path: 'books', component: BooksComponent },
      { path: 'about', component: AboutComponent },
      { path: 'animations', component: AnimationsComponent },
      { path: 'chat', component: ChatComponent },
      { path: 'shopping-cart', component: ShoppingCartComponent },
      { path: 'login', component: LoginComponent },

      { path: 'check-out', component: CheckOutComponent, canActivate: [ AuthenticationGuardService ] },
      { path: 'order-success', component: OrderSuccessComponent, canActivate: [ AuthenticationGuardService ] },
      { path: 'my/orders', component: MyOrdersComponent, canActivate: [ AuthenticationGuardService ] },

      {
        path: 'admin/books/new',
        component: BookFormComponent,
        canActivate: [ AuthenticationGuardService, AdminAuthorizationGuardService ]
      },
      {
        path: 'admin/books/:id',
        component: BookFormComponent,
        canActivate: [ AuthenticationGuardService, AdminAuthorizationGuardService ]
      },
      {
        path: 'admin/books',
        component: AdminBooksComponent,
        canActivate: [ AuthenticationGuardService, AdminAuthorizationGuardService ]
      },
      {
        path: 'admin/orders',
        component: AdminOrdersComponent,
        canActivate: [ AuthenticationGuardService, AdminAuthorizationGuardService ]
      },

      { path: '**', component: HomeComponent }
    ])
  ],
  providers: [
    AuthenticationService,
    AuthenticationGuardService,
    AdminAuthorizationGuardService,
    BookService,
    UserService,
    CategoryService,
    youTubeSearchInjectables
   ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
