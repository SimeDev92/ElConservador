import { Pipe, PipeTransform } from '@angular/core';

type TranslationDictionary = {
  [key: string]: {
    [key: string]: string;
  };
};

@Pipe({
  name: 'categoryTranslate'
})
export class CategoryTranslatePipe implements PipeTransform {
  private translations: TranslationDictionary = {
    'es': {
      'Politics': 'Política',
      'Economy': 'Economía',
      'Society': 'Sociedad',
      'ScienceTechnology': 'Ciencia y Tecnología',
      'Culture': 'Cultura',
      'Sports': 'Deportes',
      'Opinion': 'Opinión'
    },
    'en': {
      'Politics': 'Politics',
      'Economy': 'Economy',
      'Society': 'Society',
      'ScienceTechnology': 'Science & Technology',
      'Culture': 'Culture',
      'Sports': 'Sports',
      'Opinion': 'Opinion'
    }
   
  };

  transform(category: string): string {
    const browserLang = navigator.language.split('-')[0]; // Obtiene el idioma del navegador
    const lang = this.translations[browserLang] ? browserLang : 'en'; // Usa 'en' como fallback

    return this.translations[lang][category] || category;
  }
}
