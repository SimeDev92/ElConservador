import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'spanishDate',
  standalone: true
})
export class SpanishDatePipe implements PipeTransform {
  transform(value: any, format: string = 'fullDate'): string {
    const datePipe = new DatePipe('es-ES');
    const formattedDate = datePipe.transform(value, format);
    return formattedDate || '';
  }
}
