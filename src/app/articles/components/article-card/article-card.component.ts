import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { SimpleArticle } from '../../interfaces';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateCategoryPipe } from '../../pipes/translate-category.pipe';

@Component({
    selector: 'article-card',
    imports: [
        CommonModule,
        RouterLink,
        TranslateCategoryPipe
    ],
    templateUrl: './article-card.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleCardComponent {

  public article = input.required<SimpleArticle>();

 }
