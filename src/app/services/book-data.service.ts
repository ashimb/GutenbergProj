import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { stringify } from 'querystring';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BookDTO, ResultDTO } from '../books-list/book/book.interface';

@Injectable({
  providedIn: "root",
})
export class BookDataService {
  private apiServer = environment.baseUrl;

  counter = 0;

  constructor(private httpClient: HttpClient) {}

  //Autocomplete feature
  getBooksNames() {
    this.httpClient.get(this.apiServer);
  }

  getBooksByCategory(category: string, pageNo:string) {
    const mimeType = "image/jpeg";

    return this.httpClient.get<ResultDTO>(this.apiServer + "books", {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Access-Control-Allow-Headers": "Content-Type",

        responseType: "json",
      }),
      params: new HttpParams()
        .set("topic", category)
        .set('page',pageNo)
        .append("mime_type", mimeType),
       
        
    }).pipe(
      catchError((err)=>{
        return throwError(err);
      })
    );
    /*  .subscribe(response=>{

    console.log(response)
  }); */
  }

  createUpdatedObject(resultData: any) {
    let count = 0;
    try {

      const resultArray = resultData["results"];

     // console.log("resultArray -->", resultArray);

      const newResultArray = [];

      const newResult: ResultDTO = {
        count: resultData["count"],
        next: resultData["next"],
        previous: resultData["previous"],
        results: newResultArray,
      };

      

      console.log(newResult);

      resultArray.forEach((element) => {
        count += 1;

        const newResultObject: BookDTO = {
          authors: element["authors"],
          bookshelves: element["bookshelves"],
          formats: this.getFormatArray(element["formats"]),
          languages: element["languages"],
          subjects: element["subjects"],
          title: element["title"],
        };

        newResultArray.push(newResultObject);
      });

      return newResult;

    } catch (error) {
      console.log("element no:", count);
    }
  }

  getFormatArray(formats: Array<string>) {
    // console.log("formats -->",formats)

    const newFormats = [];
    let textFormat = "";

    textFormat = this.getTextUrl(formats);

    //  console.log("formats[image/jpeg] :",formats["image/jpeg"])

    newFormats.push(formats["image/jpeg"]);

    newFormats.push(textFormat);

   //  console.log("newFormats [] :", newFormats)

    return newFormats;
  }

  getTextUrl(textTypeFormat: Array<string>): any {

    //  console.log("textTypeFormat -->",textTypeFormat)

    const keysFormatArr = Object.keys(textTypeFormat);
    let formatUrl: any;
    let strUri: string;

   // console.log("keysFormatArr :", keysFormatArr);
   // console.log(" STARTS", this.counter);

    let txtHtmlArr = keysFormatArr.filter((element) =>
      element.includes("text/html")
    );
   // console.log("txtHtml :", txtHtmlArr);

    let txtPlainArr = keysFormatArr.filter((element) =>
      element.includes("text/plain")
    );

   // console.log("txtPlain :", txtPlainArr);

    let txtPDFArr = keysFormatArr.filter((element) =>
      element.includes("application/pdf")
    );

  //  console.log("txtPDF :", txtPDFArr);

  //  console.log("formaturl", typeof formatUrl);

     txtHtmlArr.every((element) => {
      strUri = textTypeFormat[element];
      if (strUri.split(".").pop() === "htm" || strUri.split(".").pop() === "html") {
        formatUrl = strUri;
        
        return false;
      }
    });

    
    for (let index = 0; index < txtPDFArr.length; index++) {

      const element = txtPDFArr[index];
      const strUri = textTypeFormat[element];
      
      if (strUri.split(".").pop() !== "zip" ) {
        if(formatUrl === undefined || formatUrl === ""){
          
        //  console.log("formatUrl :",formatUrl)

        formatUrl = strUri;
          break;
        }

      }
      
    }

    for (let index = 0; index < txtPlainArr.length; index++) {

      const element = txtPlainArr[index];
      const strUri = textTypeFormat[element];
      
      if (strUri.split(".").pop() !== "zip" ) {
        if(formatUrl === undefined || formatUrl === ""){
          
        //  console.log("formatUrl :",formatUrl)

        formatUrl = strUri;
          break;
        }

      }
      
    }


    if (formatUrl === undefined ) {
      formatUrl = "none";
    }

   // console.log(" FOREACH ENDS");
   // console.log("formatUrl :", formatUrl);

    this.counter = this.counter + 1;
    return formatUrl;
    
  }

  checkBookFormat(book: any) {
    // console.log('book: ', book.formats["text/html; charset=utf-8"]);

    let format = book.formats["text/html; charset=utf-8"];

    // let checkFormat = format.

    //console.log('book.formats:', book.formats)

    console.log("formats:", format);

    // console.log('all keys: ', Object.keys(book.formats))

    //Provides the only Keys of the object in an Array.
    const keysFormatArr = Object.keys(book.formats);

    keysFormatArr.forEach((element) => {
      console.log(element);
      // console.log('For text/plain variants :', element.includes("text/plain"));
      const strUri: string = book.formats[element];

      if (element.includes("text/html")) {
        if (
          strUri.split(".").pop() === "htm" ||
          strUri.split(".").pop() === "html"
        ) {
          return { element: book.formats[element] };
        }
      } else if (element.includes("application/pdf")) {
        if (strUri.split(".").pop() === "pdf") {
          return { element: book.formats[element] };
        }
      } else if (element.includes("text/plain")) {
        if (strUri.split(".").pop() !== "zip") {
          return { element: book.formats[element] };
        }
      } else {
        return { element: "none" };
      }
    });
  }

  getBooksByFilter(filter: string) {
    this.httpClient.get(this.apiServer);
  }
}
