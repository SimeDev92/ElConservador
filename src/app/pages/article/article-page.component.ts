import { ChangeDetectionStrategy, Component, OnInit, signal, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { tap } from 'rxjs';
import { Article } from '../../articles/interfaces';
import { ArticlesService } from '../../articles/services/articles.service';
import { SpanishDatePipe } from '../../articles/pipes/spanish-date.pipe';
import { TranslateCategoryPipe } from '../../articles/pipes/translate-category.pipe';
import { FormatTextPipe } from '../../articles/pipes/format-text.pipe';
import { MarkdownToHtmlPipe } from "../../articles/pipes/markdow-to-html.pipe";
import { MarkdownService, provideMarkdown } from 'ngx-markdown';


@Component({
  selector: 'article-page',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    SpanishDatePipe,
    TranslateCategoryPipe,
    FormatTextPipe,
    MarkdownToHtmlPipe
  ],
  providers: [
    provideMarkdown(),
    MarkdownService,
    HttpClient
  ],
  templateUrl: './article-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class ArticlePageComponent implements OnInit {

  private articlesService = inject(ArticlesService);
  private route = inject(ActivatedRoute);
  public article = signal<Article | null>(null);
  private title = inject(Title);
  private meta = inject(Meta);

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (!slug) return;

    this.articlesService.loadArticle(slug)
      .pipe(
        tap((article: Article) => {
          const pageTitle = article.title;
          const pageDescription = article.content.substring(0, 160) + '...';
          const pageUrl = `https://elconservadornoticias.com/noticias/${article.slug}`;
          const imageUrl = article.imgUrl;

          this.title.setTitle(pageTitle);

          // HTML meta
          this.meta.updateTag({ name: 'description', content: pageDescription });

          // Open Graph
          this.meta.updateTag({ property: 'og:title', content: pageTitle });
          this.meta.updateTag({ property: 'og:description', content: pageDescription });
          this.meta.updateTag({ property: 'og:image', content: imageUrl });
          this.meta.updateTag({ property: 'og:url', content: pageUrl });
          this.meta.updateTag({ property: 'og:type', content: 'article' });

          // Twitter Card
          this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
          this.meta.updateTag({ name: 'twitter:site', content: '@Conservador24h' });
          this.meta.updateTag({ name: 'twitter:title', content: pageTitle });
          this.meta.updateTag({ name: 'twitter:description', content: pageDescription });
          this.meta.updateTag({ name: 'twitter:image', content: imageUrl });

          // Optional extra metadata
          this.meta.updateTag({ name: 'article:published_time', content: new Date(article.date).toISOString() });
          this.meta.updateTag({ name: 'article:section', content: article.category });

          if (article.tags && article.tags.length > 0) {
            this.meta.updateTag({ name: 'keywords', content: article.tags.join(', ') });
          }
        })
      )
      .subscribe(this.article.set);
  }

  copyLink(): void {
    const slug = this.article()?.slug;
    if (!slug) {
      console.error('No se puede copiar el enlace porque no se encontró el slug.');
      return;
    }

    const url = `https://elconservadornoticias.com/noticias/${slug}`;

    navigator.clipboard.writeText(url)
      .then(() => {
        alert('¡Enlace copiado al portapapeles!');
      })
      .catch((err) => {
        console.error('Error al copiar el enlace:', err);
        alert('Hubo un error al copiar el enlace. Por favor, inténtalo de nuevo.');
      });
  }

  shareOnTwitter(): void {
    const slug = this.article()?.slug;
    if (!slug) return;

    const url = `https://elconservadornoticias.com/noticias/${slug}`;
    const twitterUrl = `https://twitter.com/intent/tweet?url=${url}`;
    window.open(twitterUrl, '_blank');
  }

  shareOnFacebook(): void {
    const slug = this.article()?.slug;
    if (!slug) return;

    const url = `https://elconservadornoticias.com/noticias/${slug}`;
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    window.open(facebookUrl, '_blank');
  }


  shareOnWhatsApp(): void {
    const slug = this.article()?.slug;
    if (!slug) return;

    const url = `https://elconservadornoticias.com/noticias/${slug}`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${url}`;
    window.open(whatsappUrl, '_blank');
  }

  shareOnTelegram(): void {
    const slug = this.article()?.slug;
    if (!slug) return;

    const url = `https://elconservadornoticias.com/noticias/${slug}`;
    const telegramUrl = `https://t.me/share/url?url=${url}`;
    window.open(telegramUrl, '_blank');
  }

}
