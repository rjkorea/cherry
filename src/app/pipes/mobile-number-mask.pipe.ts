import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mobileNumberMask'
})
export class MobileNumberMaskPipe implements PipeTransform {

  transform(value: string): any {
    return `${value.slice(0, 3)} **** ${value.slice(value.length - 4, value.length)}`;
  }

}
