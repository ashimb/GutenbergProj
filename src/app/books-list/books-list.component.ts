import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { BookDataService } from '../services/book-data.service';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent implements OnInit {

  constructor( private route :ActivatedRoute, private dataService:BookDataService) { }

  category:string='';
  filterSubject = new Subject<string>();
  filterSubject$ = this.filterSubject.asObservable();


  ngOnInit(): void {

    this.route.queryParams.subscribe((params) =>{
      this.category = params.category;

      console.log(this.category)
    })

    //this.loadBooks();
  }

  loadBooks(){
   // this.dataService.getBooksByCategory(this.category)
   /*  .subscribe( response=>{
      console.log(response)
    }); */
  }

  onChangeEvent($event){

    console.log('onchangeEvent')

    const searchText = $event.target.value;

    this.filterSubject.next(searchText)
    
  }

}
