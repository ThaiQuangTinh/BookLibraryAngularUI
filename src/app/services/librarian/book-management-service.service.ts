import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, pipe } from 'rxjs';
import { Book } from '../../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookManagementServiceService {

  // Define base api url
  private baseApiUrl: string = 'http://localhost:8200/books';

  constructor(
    private http: HttpClient
  ) { }

  // Function to convert to user array
  private convertToBookArray(data: any[]): Book[] {
    return data.map(item => new Book(item));
  }

  // Service to get books 
  public getAllBook(): Observable<Book[]> {
    return this.http.get<any>(`${this.baseApiUrl}/getall`)
      // .pipe(
      //   map(response => this.convertToBookArray(response.data))
      // );
  }

  // Service to get books base on page and limit 
  public getBookCount(page: number, limit: number): Observable<Book[]> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    return this.http.get<any>(`${this.baseApiUrl}/getall`, { params })
      .pipe(
        map(response => this.convertToBookArray(response.data))
      );
  }

}
