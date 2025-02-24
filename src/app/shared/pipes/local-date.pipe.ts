import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';

@Pipe({
    name: 'localDate',
    standalone: false
})
export class LocalDatePipe implements PipeTransform {

  transform(value: Date, args: string): string {
    if (!value || !args) {
      return '';
    }
    return moment.utc(value).local().format(args);
  }

}
