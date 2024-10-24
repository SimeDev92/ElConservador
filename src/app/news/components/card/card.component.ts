import { Component, Input, OnInit } from '@angular/core';
import { New } from './../../interfaces/news.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'news-new-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() public new!: New;

  constructor(private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    if (!this.new) throw Error('New property is required');
  }

  shareOnWhatsApp(event: Event) {
    event.stopPropagation();
    const url = encodeURIComponent(`${window.location.origin}/news/${this.new._id}`);
    const text = encodeURIComponent(this.new.title);
    window.open(`https://wa.me/?text=${text} ${url}`, '_blank');
  }

  shareOnFacebook(event: Event) {
    event.stopPropagation();
    const url = encodeURIComponent(`${window.location.origin}/news/${this.new._id}`);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
  }

  shareOnTwitter(event: Event) {
    event.stopPropagation();
    const url = encodeURIComponent(`${window.location.origin}/news/${this.new._id}`);
    const text = encodeURIComponent(this.new.title);
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
  }

  shareOnTelegram(event: Event) {
    event.stopPropagation
    const url = encodeURIComponent(`${window.location.origin}/news/${this.new._id}`);
    const text = encodeURIComponent(this.new.title);
    window.open(`https://t.me/share/url?url=${url}&text=${text}`, '_blank');
  }

  copyLink(event: Event) {
    event.stopPropagation();
    const url = `${window.location.origin}/news/${this.new._id}`;
    navigator.clipboard.writeText(url).then(() => {
      this.snackBar.open('Enlace copiado al portapapeles', 'Cerrar', { duration: 3000 });
    }).catch(err => {
      console.error('Error al copiar el enlace: ', err);
      this.snackBar.open('Error al copiar el enlace', 'Cerrar', { duration: 3000 });
    });
  }
}
