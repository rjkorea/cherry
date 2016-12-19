import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dataFilter'
})
export class DataFilterPipe implements PipeTransform {

  transform(array: any[], query: string): any {
    if(query) {
      return array.filter(row => {
        if(row.name.indexOf(query) > -1 ||
          row.group.indexOf(query) > -1 ||
          row.type.indexOf(query) > -1 ||
          row.mobile_number.indexOf(query) > -1) {
          return true;
        }
      });
    }
    return array;
  }

}
