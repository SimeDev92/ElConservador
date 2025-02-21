import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, tap } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { ArticleListSkeletonComponent } from './ui/article-list-skeleton/article-list-skeleton.component';
import { ArticleListComponent } from '../../articles/components/article-list/article-list.component';
import { ArticlesService } from '../../articles/services/articles.service';
import { SimpleArticle } from '../../articles/interfaces';

@Component({
    selector: 'articles-page',
    imports: [
        ArticleListComponent,
        ArticleListSkeletonComponent,
        RouterLink,
    ],
    templateUrl: './articles-page.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export default class ArticlesComponent {

  private articlesService: ArticlesService = inject(ArticlesService);
  public articles = signal<SimpleArticle[]>([]);
  private route = inject(ActivatedRoute);
  private title = inject(Title);
  public category = signal('');

  public currentPage = toSignal<number>(
    this.route.params.pipe(
      map( params => params['pagina'] ?? '1'),
      map( pagina => ( isNaN( +pagina ) ? 1 : +pagina )),
      map( pagina => Math.max(1, pagina))
    )
  );

  public loadOnPageChanged = effect(() => {
    this.loadArticles(this.currentPage());
  });

  constructor() {
    this.route.params.subscribe(params => {

      this.loadArticles(this.currentPage());
    });
  }

  public loadArticles(pagina = 1) {
    const pageToLoad = pagina;

    this.articlesService.loadPage(pageToLoad)
      .pipe(
        tap(() => {

          this.title.setTitle(`El Conservador Noticias - Pag ${pageToLoad}`);
        })
      )
      .subscribe((articles) => {
        this.articles.set(articles);
      });
  }

}
