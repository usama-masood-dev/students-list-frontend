import { Pipe, PipeTransform } from '@angular/core';
import { formatDate } from '../utils/formatters';

@Pipe({
  name: 'dateFormat',
})
export class DateFormatPipe implements PipeTransform {
  transform(value: string | Date, format = 'short'): string {
    return formatDate(value, format);
  }
}
