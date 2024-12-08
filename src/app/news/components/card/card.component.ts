import { Component, Input, OnInit } from '@angular/core';
import { New } from './../../interfaces/news.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { environments } from '../../../../environments/environments';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'news-new-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() public new!: New;

  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    if (!this.new) throw Error('New property is required');
  }

  searchByTag(tag: string, event: Event) {
    event.stopPropagation();
    this.router.navigate(['/news'], { queryParams: { search: tag } });
  }

  shareOnWhatsApp(event: Event) {
    event.stopPropagation();
    const url = encodeURIComponent(`${environments.baseUrl}/news/${this.new._id}`);
    const text = encodeURIComponent(this.new.title);
    window.open(`https://wa.me/?text=${text} ${url}`, '_blank');
  }

  async shareOnFacebook(event: Event) {
    event.stopPropagation();
    try {
      const response = await this.http.post<{success: boolean, result: any}>(
        `${environments.baseUrl}/facebook/share-news`,
        {
          newsId: this.new._id,
          imageUrl: this.new.imgUrl
        }
      ).toPromise();

      if (response && response.success) {
        this.snackBar.open('Noticia compartida en Facebook con éxito', 'Cerrar', { duration: 3000 });
      } else {
        throw new Error('La respuesta del servidor no indica éxito');
      }
    } catch (error) {
      console.error('Error al compartir en Facebook:', error);
      this.snackBar.open('Error al compartir en Facebook', 'Cerrar', { duration: 3000 });
    }
  }

  shareOnTwitter(event: Event) {
    event.stopPropagation();
    const url = encodeURIComponent(`${environments.baseUrl}/news/${this.new._id}`);
    const text = encodeURIComponent(this.new.title);
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
  }

  shareOnTelegram(event: Event) {
    event.stopPropagation();
    const url = encodeURIComponent(`${environments.baseUrl}/news/${this.new._id}`);
    const text = encodeURIComponent(this.new.title);
    window.open(`https://t.me/share/url?url=${url}&text=${text}`, '_blank');
  }

  copyLink(event: Event) {
    event.stopPropagation();
    const url = `${environments.baseUrl}/news/${this.new._id}`;
    navigator.clipboard.writeText(url).then(() => {
      this.snackBar.open('Enlace copiado al portapapeles', 'Cerrar', { duration: 3000 });
    }).catch(err => {
      console.error('Error al copiar el enlace: ', err);
      this.snackBar.open('Error al copiar el enlace', 'Cerrar', { duration: 3000 });
    });
  }
}
