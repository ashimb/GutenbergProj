import { stringify, ValueTransformer } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookformatService {

  constructor() { 

  }

  checkBookFormat(book:any){

   // console.log('book: ', book.formats["text/html; charset=utf-8"]);

  let format = book.formats["text/html; charset=utf-8"];

   // let checkFormat = format.

   //console.log('book.formats:', book.formats)

   console.log('formats:', format)

  // console.log('all keys: ', Object.keys(book.formats))

    //Provides the only Keys of the object in an Array.
    const keysFormatArr = Object.keys(book.formats)

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


     /* if(format !== undefined){

            const strUri:string = book.formats["text/html; charset=utf-8"];

             console.log( 'extension :', strUri.split('.').pop()) 
      } */

  }

  getAvailableFormat(){


    
  }
}
