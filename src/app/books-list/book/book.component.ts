import { Component, Input, OnInit } from '@angular/core';
import { BookDataService } from 'src/app/services/book-data.service';
import { BookDTO, ResultDTO } from './book.interface';
import { FlexLayoutModule } from '@angular/flex-layout';
import * as $ from 'jquery';
import { BookformatService } from 'src/app/services/bookformat.service';
import { Observable, of, Subscription, } from 'rxjs';
import { catchError, map } from 'rxjs/operators'
 
@Component({
  selector: "app-book",
  templateUrl: "./book.component.html",
  styleUrls: ["./book.component.css"],
})
export class BookComponent implements OnInit {
  resultData: ResultDTO;
  results$: Observable<BookDTO[]>;

  @Input() categoryName: string;
  @Input() filterBook$: Observable<string>;


  pageNo:number=1;
  nextLink:string;
  backLink:string;
  isNextAvailable:boolean =false;
  errorMessage:string='';

  statusMessage ='';

  private searchSubscription: Subscription;

  constructor(
    private dataService: BookDataService,
    private formatService: BookformatService
  ) {}

  ngOnInit(): void {

   

    this.loadBooks(String(this.pageNo));

    this.searchSubscription = this.filterBook$.subscribe((filterText) => {
      console.log("Sybscribed in app-book");

      this.searchBooks(filterText);
    },);
  }

  goBack(){
    if( this.isNextAvailable  && this.pageNo >=1){
      this.pageNo--;
      this.loadBooks(this.pageNo.toString())
    }
   
  }

  goNext(){

    if( this.isNextAvailable ){
      this.pageNo++;
      console.log(this.pageNo)
      this.loadBooks(this.pageNo.toString())
    }
   
  }

  loadBooks(pageNo:string) {
    this.dataService
      .getBooksByCategory(this.categoryName,pageNo)
      .subscribe((response) => {

        if(response.next.length >0){
          this.isNextAvailable = true;
        }

        const updatedObject = this.dataService.createUpdatedObject(response);

        this.resultData = updatedObject;

        console.log(this.resultData["results"]);

        this.results$ = of(this.resultData["results"]);
      },
      error=>{
        this.statusMessage = error;
      });
  }

  // Saerching books from the already fetched books
  searchBooks(filterText: string) {

    filterText = filterText.toLowerCase();
    console.log("filter :", filterText);

    const resultsArray = this.resultData["results"];
    console.log('type of :',typeof(resultsArray) )

    if (filterText.length > 0) {

    //  const resultsArraySameCase = resultsArray.map(value => value)

      const filteredResults = [];

      for (let index = 0; index < resultsArray.length; index++) {

        const element = resultsArray[index];

        let flag = false;

        let strBookshelves = element.bookshelves.toString().toLowerCase();
        let strSubjects = element.subjects.toString().toLowerCase();
        let strTitle = element.title.toString().toLowerCase();
        let strAuthor = element.authors.map(value=>value.name.toLowerCase()).toString()

       // bookshelves=  bookshelves.toString().toLowerCase()

        console.log(" bookshelves :",strBookshelves);
        console.log("subjects:", strSubjects);
        console.log("title : ",strTitle);

       console.log("author : ",strAuthor);

        console.log('check for array',typeof( element["bookshelves"]))

      //  console.log('check for type',typeof( bookshelves))

        if (strBookshelves.includes(filterText)) {
          flag = true;
         // break;
        } else if (strSubjects.includes(filterText)) {
          flag = true;
         // break;
        } else if (strTitle.includes(filterText)) {
          flag = true;
         // break;
        }else if(strAuthor.includes(filterText)){
          flag = true
        }


        if (flag) {
          filteredResults.push(element);
        }


      } 

      if(filteredResults.length > 0){
        console.log('filteredResults:',filteredResults)

        this.results$ = of(filteredResults);

      }
      else{
        this.statusMessage = 'No Books Found for this Keyword'
      }
     
    } else {

      this.statusMessage = '';
      this.results$ = of(this.resultData["results"]);
    }
  }
}
