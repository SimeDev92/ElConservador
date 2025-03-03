import { Pipe, PipeTransform } from '@angular/core';
import { MarkdownService } from 'ngx-markdown';
import { Observable, from, of } from 'rxjs';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { map } from 'rxjs/operators';

@Pipe({
  name: 'markdownToHtml',
  standalone: true
})
export class MarkdownToHtmlPipe implements PipeTransform {
  constructor(
    private markdownService: MarkdownService,
    private sanitizer: DomSanitizer
  ) {}

  transform(value: string): Observable<SafeHtml> {
    if (!value) return of('');
    const parsed = this.markdownService.parse(value);
    return (parsed instanceof Promise ? from(parsed) : of(parsed)).pipe(
      map(html => this.sanitizer.bypassSecurityTrustHtml(html))
    );
  }
}
