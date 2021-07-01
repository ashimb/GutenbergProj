import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BooksCategoryComponent } from './books-category/books-category.component';
import { BooksListComponent } from './books-list/books-list.component';
import { BookComponent } from './books-list/book/book.component';

@NgModule({
  declarations: [
    AppComponent,
    BooksCategoryComponent,
    BooksListComponent,
    BookComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
