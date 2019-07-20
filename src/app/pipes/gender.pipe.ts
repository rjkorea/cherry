import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gender'
})
export class GenderPipe implements PipeTransform {

  transform(value: any): any {
    if (value === 'male') {
      return '남자';
    } else if (value === 'female') {
      return '여자';
    } else {
      return '기타';
    }
  }

}
