import { Component, Input, OnInit } from '@angular/core';
import { New } from './../../interfaces/news.interface';
import { Router } from '@angular/router';
import { environments } from '../../../../environments/environments';
import Swal from 'sweetalert2';

@Component({
  selector: 'news-new-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() public new!: New;

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.new) throw new Error('New property is required');
  }

  searchByTag(tag: string, event: Event): void {
    event.stopPropagation();
    this.router.navigate(['/news'], { queryParams: { search: tag } });
  }

  private generateBackendShareableUrl(): string {
    return `${environments.baseUrl}/news/share/${this.new._id}`; // Asegúrate de que apunta al backend
  }

  shareOnWhatsApp(event: Event): void {
    event.stopPropagation();
    const url = encodeURIComponent(this.generateBackendShareableUrl());
    window.open(`https://wa.me/?text=${url}`, '_blank');
  }

  shareOnTwitter(event: Event): void {
    event.stopPropagation();
    const url = encodeURIComponent(this.generateBackendShareableUrl());
    const text = encodeURIComponent(this.new.title);
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
  }

  shareOnTelegram(event: Event): void {
    event.stopPropagation();
    const url = encodeURIComponent(this.generateBackendShareableUrl());
    const text = encodeURIComponent(this.new.title);
    window.open(`https://t.me/share/url?url=${url}&text=${text}`, '_blank');
  }

  shareOnFacebook(event: Event): void {
    event.stopPropagation();
    const url = encodeURIComponent(this.generateBackendShareableUrl());
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
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
