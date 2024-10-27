import { New } from './../interfaces/news.interface';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { environments } from '../../../environments/environments';


@Injectable({ providedIn: 'root' })
export class NewsService {

  private baseUrl: string = environments.baseUrl;
  public news: New[] = [];

  constructor(private http: HttpClient) { }


  // getNews():Observable<New[]> {
  //   return this.http.get<New[]>(`${ this.baseUrl }/news`);
  // }
  getNews(page: number = 1, pageSize: number = 10, category?: string): Observable<{news: New[], total: number}> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    if (category) {
      params = params.set('category', category);
    }

    return this.http.get<{news: New[], total: number}>(`${this.baseUrl}/news`, { params })
      .pipe(
        catchError(error => {
          console.error('Error fetching news:', error);
          return of({news: [], total: 0});
        })
      );
  }

  getNewById( id: string ): Observable<New|undefined> {
    return this.http.get<New>(`${ this.baseUrl }/news/${ id }`)
      .pipe(
        catchError( error => of(undefined) )
      );
  }

  searchNews(query: string): Observable<New[]> {
    return this.http.get<New[]>(`${this.baseUrl}/news/search?query=${query}`)
      .pipe(
        catchError(error => of([])) // Manejo de errores retornando un array vacío si falla
      );
  }

  getNewsByCategory(category: string): Observable<New[]> {
    return this.http.get<New[]>(`${this.baseUrl}/news/category/${category}`);
  }

  getNewsByDate(date: string): Observable<New[]> {
    return this.http.get<New[]>(`${this.baseUrl}/news/date/${date}`)
      .pipe(
        catchError(error => {
          console.error('Error fetching news by date:', error);
          return of([]);
        })
      );
  }
}
