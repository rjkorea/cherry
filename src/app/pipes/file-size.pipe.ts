import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fileSizeFormat'
})
export class FileSizeFormatPipe implements PipeTransform {
  transform(bytes: number, decimal: number): any {
    let formatted: any;

    if (bytes === 0) return formatted = '0 Bytes';

    const k = 1000,
          dp = decimal || 2,
          sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
          i = Math.floor(Math.log(bytes) / Math.log(k));

    formatted = `${parseFloat((bytes / Math.pow(k, i)).toFixed(dp))} ${sizes[i]}`;

    return formatted;
  }
}
