import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'formatText',
  standalone: true
})
export class FormatTextPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string): SafeHtml {
    if (!value) return '';

    // Reemplazar '@@' con saltos de línea
    let formattedText = value.replace(/@@/g, '<br>');

    // Reemplazar '$$' con etiquetas de negrita
    formattedText = formattedText.replace(/\$\$(.*?)\$\$/g, '<strong>$1</strong>');

    // Sanitizar el HTML resultante
    return this.sanitizer.bypassSecurityTrustHtml(formattedText);
  }
}
