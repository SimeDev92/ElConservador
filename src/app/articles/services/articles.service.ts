import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, catchError, of, tap } from 'rxjs';
import { Article, ArticleAPIResponse, SimpleArticle } from '../interfaces';
import { environments } from '../../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  private http = inject(HttpClient);

  public baseUrl = environments.baseUrl;
  private readonly limit = 9; // Parametrizamos el límite

  public loadPage(pagina: number): Observable<SimpleArticle[]> {
    const validPage = Math.max(1, pagina);
    const offset = (validPage - 1) * this.limit;

    const url = `${this.baseUrl}/articles?limit=${this.limit}&offset=${offset}`;
    return this.http.get<ArticleAPIResponse[]>(url).pipe(
      map(this.transformArticles),
      catchError(this.handleError)
    );
  }

  public loadPageByCategory(pagina: number, categoria: string): Observable<SimpleArticle[]> {
    const validPage = Math.max(1, pagina);
    const offset = (validPage - 1) * this.limit;

    const url = `${this.baseUrl}/articles/category?category=${encodeURIComponent(categoria)}&limit=${this.limit}&offset=${offset}`;
    return this.http.get<ArticleAPIResponse[]>(url).pipe(
      map(this.transformArticles),
      catchError(this.handleError)
    );
  }

  public loadArticle(slug: string): Observable<Article> {
    return this.http
      .get<Article>(`${this.baseUrl}/articles/${slug}`)
      .pipe(
        tap((article) => {
          this.http
            .patch(`${this.baseUrl}/articles/${article._id}/increment-views`, {})
            .subscribe({
              error: (err) => console.error('Error incrementando visualizaciones', err),
            });
        })
      );
  }

  private incrementViews(articleId: string): Observable<void> {
    return this.http
      .patch<void>(`${this.baseUrl}/articles/${articleId}/increment-views`, {})
      .pipe(
        catchError((error) => {
          console.error(`Error incrementando visualizaciones para el artículo ${articleId}:`, error);
          return of(undefined);
        })
      );
  }

  public searchByText(query: string, page: number = 1): Observable<{ articles: SimpleArticle[], total: number }> {
    const offset = (page - 1) * this.limit;
    const url = `${this.baseUrl}/articles/search?query=${encodeURIComponent(query)}&limit=${this.limit}&offset=${offset}`;

    return this.http.get<{ articles: ArticleAPIResponse[], total: number }>(url).pipe(
      map((response) => ({
        articles: this.transformArticles(response.articles),
        total: response.total
      })),
      catchError((error) => {
        console.error('Error en la búsqueda por texto:', error);
        return of({ articles: [], total: 0 });
      })
    );
  }

  public searchByDate(date: string): Observable<SimpleArticle[]> {
    const url = `${this.baseUrl}/articles/date/${encodeURIComponent(date)}`;

    return this.http.get<ArticleAPIResponse[]>(url).pipe(
      map(this.transformArticles),
      catchError((error) => {
        console.error('Error en la búsqueda por fecha:', error);
        return of([]);
      })
    );
  }

  private transformArticles(articles: ArticleAPIResponse[]): SimpleArticle[] {
    return articles.map((article) => ({
      id: article._id,
      title: article.title,
      subtitle: article.subtitle,
      img: article.imgUrl,
      tags: article.tags,
      slug: article.slug,
      category: article.category,
    }));
  }

  private handleError(error: any): Observable<SimpleArticle[]> {
    console.error('Error cargando artículos:', error);
    return of([]);
  }
}
