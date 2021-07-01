export interface BookDTO{
    authors:Author[];
    bookshelves:string;
    formats:string[];
    languages:string;
    mediatype?:string;
    subjects:string;
    title:string;

}

export interface ResultDTO{
    count:number;
    next:string;
    previous:string;
    results: BookDTO[];
}

export interface Author{
    birth_year:number;
    death_year:number;
    name:string;
}

/* export interface Format{
 'application/epub+zip': string;
'application/rdf+xml': string;
'application/x-mobipocket-ebook':string;
'application/zip': string;
'image/jpeg': string;
'text/html; charset=utf-8': string;
'text/plain; charset=iso-8859-1': string;
'text/plain; charset=utf-8':string;
} */