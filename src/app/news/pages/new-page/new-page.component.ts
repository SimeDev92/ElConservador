import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { New } from '../../interfaces/news.interface';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styleUrls: ['./new-page.css']
})
export class NewPageComponent implements OnInit {

  public newsItem?: New;
  public authorName: string = '';

  constructor(
    private newsService: NewsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.newsService.getNewById(id)),
        tap(newsItem => {
          if (!newsItem) {
            this.router.navigate(['/news']);
            return;
          }
          if (typeof newsItem.date === 'string') {
            newsItem.date = new Date(newsItem.date);
          }
          this.newsItem = newsItem;
        }),
        catchError(() => {
          this.router.navigate(['/news']);
          return of(null);
        })
      )
      .subscribe();
  }
  goBack(): void {
    this.router.navigateByUrl('/news');
  }

  shareOnFacebook(): void {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
  }

  shareOnTwitter(): void {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(this.newsItem?.title || '');
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
  }

  shareOnWhatsApp(): void {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(this.newsItem?.title || '');
    window.open(`https://wa.me/?text=${text} ${url}`, '_blank');
  }

  shareOnTelegram(): void {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(this.newsItem?.title || '');
    window.open(`https://t.me/share/url?url=${url}&text=${text}`, '_blank');
  }

}
