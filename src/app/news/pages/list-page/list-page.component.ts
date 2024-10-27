import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(
    private newsService: NewsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.selectedCategory = params['category'] || '';
      this.currentPage = 1;
      this.loadNews();
    });
  }

  loadNews(): void {
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
        },
        error => {
          console.error('Error loading news:', error);
          this.news = [];
          this.totalNews = 0;
        }
      );
  }

  loadMore(): void {
    this.currentPage++;
    this.newsService.getNews(this.currentPage, this.pageSize, this.selectedCategory)
      .subscribe(
        response => {
          if (response && response.news) {
            this.news = [...this.news, ...response.news];
            this.totalNews = response.total;
          }
        },
        error => {
          console.error('Error loading more news:', error);
        }
      );
  }
}
