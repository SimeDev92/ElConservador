import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { New } from '../../interfaces/news.interface';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.css']
})
export class ListPageComponent implements OnInit {
  public news: New[] = [];
  public selectedCategory: string = '';
  public currentPage: number = 1;
  public pageSize: number = 10;
  public totalNews: number = 0;
  public searchQuery: string = '';
  public isLoading: boolean = true;


  constructor(
    private newsService: NewsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['search'] || '';
      this.currentPage = 1;
      if (this.searchQuery) {
        this.searchNews();
      } else {
        this.route.params.subscribe(routeParams => {
          this.selectedCategory = routeParams['category'] || '';
          this.loadNews();
        });
      }
    });
  }

  loadNews(): void {
    this.isLoading = true;
    this.newsService.getNews(this.currentPage, this.pageSize, this.selectedCategory)
      .subscribe(
        response => {
          if (response && response.news) {
            this.news = response.news;
            this.totalNews = response.total;
          } else {
            this.news = [];
            this.totalNews = 0;
          }
          this.isLoading = false;
        },
        error => {
          console.error('Error loading news:', error);
          this.news = [];
          this.totalNews = 0;
          this.isLoading = false;
        }
      );
  }

  searchNews(): void {
    this.isLoading = true;
    this.newsService.searchNews(this.searchQuery)
      .subscribe(
        results => {
          this.news = results;
          this.totalNews = results.length;
          this.isLoading = false;
        },
        error => {
          console.error('Error searching news:', error);
          this.news = [];
          this.totalNews = 0;
          this.isLoading = false;
        }
      );
  }

  loadMore(): void {
    this.isLoading = true;
    this.currentPage++;
    if (this.searchQuery) {
      // Si la búsqueda no implementa paginación, desactivar el loader y retornar
      this.isLoading = false;
      return;
    }
    this.newsService.getNews(this.currentPage, this.pageSize, this.selectedCategory)
      .subscribe(
        response => {
          if (response && response.news) {
            this.news = [...this.news, ...response.news];
            this.totalNews = response.total;
          }
          this.isLoading = false; // Ocultar loader tras cargar más noticias
        },
        error => {
          console.error('Error loading more news:', error);
          this.isLoading = false; // Ocultar loader en caso de error
        }
      );
  }

  onSearch(query: string): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { search: query },
      queryParamsHandling: 'merge'
    });
  }
}
