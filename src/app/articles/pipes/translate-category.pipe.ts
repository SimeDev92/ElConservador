import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'translateCategory',
  standalone: true
})
export class TranslateCategoryPipe implements PipeTransform {
  private translations: { [key: string]: string } = {
    Politics: 'Política',
    Economy: 'Economía',
    Society: 'Sociedad',
    ScienceTechnology: 'Ciencia y Tecnología',
    Culture: 'Cultura',
    Sports: 'Deportes',
    International: 'Internacional',
    Opinion: 'Opinión',

  };

  transform(value: string): string {
    return this.translations[value] || 'Categoría Desconocida';
  }
}
