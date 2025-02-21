import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SimpleArticle } from '../../articles/interfaces';
import { FormsModule } from '@angular/forms';
import { ArticlesService } from '../../articles/services/articles.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { TranslateCategoryPipe } from '../../articles/pipes/translate-category.pipe';

@Component({
  selector: 'app-noticias-buscar',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TranslateCategoryPipe,
    RouterLink
  ],
  templateUrl: './article-search.component.html',
})
export default class ArticleSearchComponent implements OnInit {
  public articles: SimpleArticle[] = [];
  public searchTerm: string = '';
  public searchDate: string = '';
  public isLoading = false;
  public currentPage = 1;
  public totalArticles = 0;
  private searchTerms = new Subject<string>();
  private searchDates = new Subject<string>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private articlesService: ArticlesService
  ) {}

  ngOnInit() {
    this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => {
        this.isLoading = true;
        this.currentPage = 1;
        return this.articlesService.searchByText(term, this.currentPage);
      })
    ).subscribe(response => {
      this.articles = response.articles;
      this.totalArticles = response.total;
      this.isLoading = false;
    });

    this.searchDates.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((date: string) => {
        this.isLoading = true;
        return this.articlesService.searchByDate(date);
      })
    ).subscribe(articles => {
      this.articles = articles;
      this.totalArticles = articles.length;
      this.isLoading = false;
    });
  }

  search(): void {
    if (this.searchTerm) {
      this.searchTerms.next(this.searchTerm);
    } else if (this.searchDate) {
      this.searchDates.next(this.searchDate);
    }
  }

  onSearchTermChange(term: string): void {
    this.searchTerms.next(term);
  }

  onSearchDateChange(date: string): void {
    this.searchDates.next(date);
  }

  loadMore(): void {
    if (this.searchTerm) {
      this.currentPage++;
      this.articlesService.searchByText(this.searchTerm, this.currentPage)
        .subscribe(response => {
          this.articles = [...this.articles, ...response.articles];
          this.totalArticles = response.total;
        });
    }
    // No implementamos loadMore para búsqueda por fecha por ahora
  }
}
