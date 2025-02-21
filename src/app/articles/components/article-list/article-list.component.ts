import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { SimpleArticle } from '../../interfaces';
import { ArticleCardComponent } from '../article-card/article-card.component';

@Component({
    selector: 'article-list',
    imports: [
      ArticleCardComponent,
    ],
    templateUrl: './article-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleListComponent {

  public articles = input.required<SimpleArticle[]>();
}
