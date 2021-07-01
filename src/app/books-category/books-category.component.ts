import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-books-category',
  templateUrl: './books-category.component.html',
  styleUrls: ['./books-category.component.css']
})
export class BooksCategoryComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  listBooks(category:string){
    console.log("")
  }

}
