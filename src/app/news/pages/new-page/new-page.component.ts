import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { New } from '../../interfaces/news.interface';
import { NewsService } from '../../services/news.service';
import { environments } from '../../../../environments/environments';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styleUrls: ['./new-page.css']
})
export class NewPageComponent implements OnInit {
  @Input() public new!: New;
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
        switchMap(({ id }) => {
          return this.newsService.getNewById(id);
        }),
        tap(newsItem => {
          if (!newsItem) {
            this.router.navigate(['/news']);
            return;
          }

          if (typeof newsItem.date === 'string') {
            newsItem.date = new Date(newsItem.date);
          }

          this.newsItem = newsItem;

          // Asignar el nombre del autor si está presente en newsItem
          this.authorName = this.newsItem.authorName || 'Autor desconocido';
        }),
        catchError((error) => {
          console.error("ngOnInit - Error fetching news item:", error);
          this.router.navigate(['/news']);
          return of(null);
        })
      )
      .subscribe();
  }

  goBack(): void {
    this.router.navigateByUrl('/news');
  }

  private generateBackendShareableUrl(): string {
    return `${environments.baseUrl}/news/share/${this.newsItem?._id}`; // Asegúrate de que apunta al backend
  }

  shareOnFacebook(event: Event): void {
    event.stopPropagation();
    const url = encodeURIComponent(this.generateBackendShareableUrl());
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
  }

  shareOnTwitter(event: Event): void {
    event.stopPropagation();
    const url = encodeURIComponent(this.generateBackendShareableUrl());
    const text = encodeURIComponent(this.newsItem?.title || '');
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
  }

  shareOnWhatsApp(event: Event): void {
    event.stopPropagation();
    const url = encodeURIComponent(this.generateBackendShareableUrl());
    window.open(`https://wa.me/?text=${url}`, '_blank');
  }

  shareOnTelegram(event: Event): void {
    event.stopPropagation();
    const url = encodeURIComponent(this.generateBackendShareableUrl());
    const text = encodeURIComponent(this.newsItem?.title || '');
    window.open(`https://t.me/share/url?url=${url}&text=${text}`, '_blank');
  }

  copyLink(event: Event): void {
    event.stopPropagation();
    const url = this.generateBackendShareableUrl();
    navigator.clipboard.writeText(url).then(() => {
      Swal.fire({
        title: 'Enlace copiado',
        text: 'El enlace se ha copiado al portapapeles con éxito.',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#007BFF',
      });
    }).catch(err => {
      console.error('Error al copiar el enlace: ', err);
      Swal.fire({
        title: 'Error',
        text: 'No se pudo copiar el enlace. Intenta de nuevo.',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#007BFF',
      });
    });
  }
}
