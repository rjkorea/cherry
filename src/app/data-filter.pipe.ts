import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'dataFilter'
})
export class DataFilterPipe implements PipeTransform {

  transform(array: any[], query: string): any {
    if(query) {
      return _.filter(array, row=>{
        if(row.name.indexOf(query) > -1 || row.mobile_number.indexOf(query) > -1) {
          return true;
        }
      });
    }
    return array;
  }

}
