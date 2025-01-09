import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'formatTextList'
})
export class FormatTextListPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string): SafeHtml {
    if (!value) return '';

    // Eliminar '@@'
    let formattedText = value.replace(/@@/g, ' ');

    // Reemplazar '$$' con etiquetas de cursiva
    // formattedText = formattedText.replace(/\$\$(.*?)\$\$/g, '<em>$1</em>');

    // Reemplazar '$$' con etiquetas <span> (sin cursiva, estilo normal)
    formattedText = formattedText.replace(/\$\$(.*?)\$\$/g, '<span>$1</span>');

    // Sanitizar el HTML resultante
    return this.sanitizer.bypassSecurityTrustHtml(formattedText);
  }
}
