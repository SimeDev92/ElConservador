import { Component, Input, OnInit } from '@angular/core';
import { New } from './../../interfaces/news.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { environments } from '../../../../environments/environments';

@Component({
  selector: 'news-new-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() public new!: New;

  constructor(
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.new) throw new Error('New property is required');
  }

  searchByTag(tag: string, event: Event): void {
    event.stopPropagation();
    this.router.navigate(['/news'], { queryParams: { search: tag } });
  }

  private generateShareableUrl(): string {
    return `${environments.frontendUrl}/news/${this.new._id}`; // Asegúrate de que apunta al frontend
  }

  shareOnWhatsApp(event: Event): void {
    event.stopPropagation();
    const url = encodeURIComponent(this.generateShareableUrl());
    window.open(`https://wa.me/?text=${url}`, '_blank');
  }

  shareOnTwitter(event: Event): void {
    event.stopPropagation();
    const url = encodeURIComponent(this.generateShareableUrl());
    const text = encodeURIComponent(this.new.title);
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
  }

  shareOnTelegram(event: Event): void {
    event.stopPropagation();
    const url = encodeURIComponent(this.generateShareableUrl());
    const text = encodeURIComponent(this.new.title);
    window.open(`https://t.me/share/url?url=${url}&text=${text}`, '_blank');
  }

  shareOnFacebook(event: Event): void {
    event.stopPropagation();
    const url = encodeURIComponent(this.generateShareableUrl());
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
  }

  copyLink(event: Event): void {
    event.stopPropagation();
    const url = this.generateShareableUrl();
    navigator.clipboard.writeText(url).then(() => {
      this.snackBar.open('Enlace copiado al portapapeles', 'Cerrar', { duration: 3000 });
    }).catch(err => {
      console.error('Error al copiar el enlace: ', err);
      this.snackBar.open('Error al copiar el enlace', 'Cerrar', { duration: 3000 });
    });
  }
}
