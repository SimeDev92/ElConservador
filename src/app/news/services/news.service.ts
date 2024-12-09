import { New } from './../interfaces/news.interface';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, Observable, switchMap, of, map } from 'rxjs';
import { environments } from '../../../environments/environments';

@Injectable({ providedIn: 'root' })
export class NewsService {
  private baseUrl: string = environments.baseUrl;
  public news: New[] = [];

  constructor(private http: HttpClient) { }

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

  getNewById(id: string): Observable<New | undefined> {
    return this.http.get<New>(`${this.baseUrl}/news/${id}`).pipe(
      switchMap((newsItem: New) => {
        if (newsItem.author) {
          return this.getUserById(newsItem.author).pipe(
            map((authorData: { name: string; surname: string }) => {
              newsItem.authorName = `${authorData.name} ${authorData.surname}`;
              return newsItem;
            }),
            catchError(() => {
              newsItem.authorName = 'Autor desconocido';
              return of(newsItem);
            })
          );
        } else {
          newsItem.authorName = 'Autor desconocido';
          return of(newsItem);
        }
      }),
      catchError((error) => {
        console.error('Error fetching news item:', error);
        return of(undefined);
      })
    );
  }

  searchNews(query: string): Observable<New[]> {
    return this.http.get<New[]>(`${this.baseUrl}/news/search?query=${query}`)
      .pipe(
        catchError(error => {
          console.error('Error searching news:', error);
          return of([]);
        })
      );
  }

  getNewsByCategory(category: string): Observable<New[]> {
    return this.http.get<New[]>(`${this.baseUrl}/news/category/${category}`)
      .pipe(
        catchError(error => {
          console.error('Error fetching news by category:', error);
          return of([]);
        })
      );
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

  getLatestNews(count: number): Observable<New[]> {
    return this.http.get<New[]>(`${this.baseUrl}/news/latest/${count}`);
  }

  getUserById(id: string): Observable<{ name: string, surname: string }> {
    return this.http.get<{ name: string, surname: string }>(`${this.baseUrl}/auth/user/${id}`)
      .pipe(
        catchError(error => {
          console.error('Error fetching user:', error);
          return of({ name: 'Unknown', surname: 'Author' });
        })
      );
  }

  getUserNews( userId:string, limit: number = 5): Observable<New[]> {
    return this.http.get<New[]>(`${ this.baseUrl }/news/user/${ userId }`)
  }
}
