import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'dateTimeFormat'
})
export class DateTimeFormatPipe extends DatePipe implements PipeTransform {
  private readonly DATE_FORMAT = 'yyyy-MM-dd';
  private readonly DATETIME_FORMAT = 'yyyy-MM-dd HH:mm';
  private readonly TIME_FORMAT = 'mm : ss';
  private readonly API_DATE_FORMAT = 'yyyy-MM-ddTHH:mm:ss';

  transform(timestamp: number, condition: string): any {
    let formatted: any;

    switch (condition) {
      case 'date': formatted = super.transform(timestamp, this.DATE_FORMAT); break;
      case 'datetime': formatted = super.transform(timestamp, this.DATETIME_FORMAT); break;
      case 'time': formatted = super.transform(timestamp, this.TIME_FORMAT); break;
      case 'unix0': formatted = new Date(timestamp).setHours(0, 0, 0, 0); break;
      case 'apiDate': formatted = super.transform(timestamp, this.API_DATE_FORMAT); break;
      default: formatted = super.transform(timestamp, this.DATE_FORMAT); break;
    }

    return formatted;
  }
}
