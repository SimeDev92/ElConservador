import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatText',
  standalone: true
})
export class FormatTextPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';

    // Reemplazar '@@' con saltos de línea
    let formattedText = value.replace(/@@/g, '\n\n');

    // Reemplazar '$$' con sintaxis de negrita de Markdown
    formattedText = formattedText.replace(/\$\$(.*?)\$\$/g, '**$1**');

    return formattedText;
  }
}
