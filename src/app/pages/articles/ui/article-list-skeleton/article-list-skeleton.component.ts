import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'article-list-skeleton',
    imports: [],
    templateUrl: './article-list-skeleton.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleListSkeletonComponent { }
