import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NewsService } from '../../services/news.service';
import { New } from '../../interfaces/news.interface';
import { Router } from '@angular/router';
import { debounceTime, switchMap, of, Subscription } from 'rxjs';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit, OnDestroy {
  public searchForm: FormGroup;
  public news: New[] = [];
  public latestNews: New[] = [];
  private dateSubscription: Subscription | null = null;
  private searchSubscription: Subscription | null = null;

  constructor(
    private newsService: NewsService,
    private router: Router
  ) {
    this.searchForm = new FormGroup({
      searchInput: new FormControl(''),
      dateInput: new FormControl('')
    });
  }

  ngOnInit() {
    this.setupDateSearch();
    this.setupKeywordSearch();
    this.loadLatestNews();
  }

  ngOnDestroy() {
    if (this.dateSubscription) {
      this.dateSubscription.unsubscribe();
    }
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }

  setupDateSearch() {
    this.dateSubscription = this.searchForm.get('dateInput')!.valueChanges.pipe(
      debounceTime(300),
      switchMap(date => {
        if (date) {
          const dateString = new Date(date).toISOString().split('T')[0];
          return this.newsService.getNewsByDate(dateString);
        }
        return of([]);
      })
    ).subscribe({
      next: news => {
        this.news = news;
        console.log('Noticias por fecha:', news);
      },
      error: error => {
        console.error('Error fetching news by date:', error);
        this.news = [];
      }
    });
  }

  setupKeywordSearch() {
    this.searchSubscription = this.searchForm.get('searchInput')!.valueChanges.pipe(
      debounceTime(300),
      switchMap(query => {
        if (query && query.trim() !== '') {
          return this.newsService.searchNews(query);
        }
        return of([]);
      })
    ).subscribe({
      next: news => {
        this.news = news;
        console.log('Noticias por búsqueda:', news);
      },
      error: error => {
        console.error('Error searching news:', error);
        this.news = [];
      }
    });
  }

  loadLatestNews() {
    this.newsService.getLatestNews(3).subscribe(
      news => {
        this.latestNews = news.map(item => ({
          ...item,
          date: new Date(item.date)
        }));
      },
      error => console.error('Error loading latest news:', error)
    );
  }

  goBack(): void {
    this.router.navigate(['/news']);
  }
}
