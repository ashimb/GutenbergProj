import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BooksCategoryComponent } from './books-category/books-category.component';
import { BookComponent } from './books-list/book/book.component';
import { BooksListComponent } from './books-list/books-list.component';


const routes: Routes = [
  {path:'', redirectTo:'category', pathMatch:'full'},
  {path:'category',component:BooksCategoryComponent},
  {path:'list',component:BooksListComponent},
  {path:'book', component:BookComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
