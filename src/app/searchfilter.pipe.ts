import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchfilter'
})
export class SearchfilterPipe implements PipeTransform {

  transform(items: any[], field: string, value: string): any[] {
    if (!items) return [];
    if(value==='') {
      return items;
    }
    value = value.toLocaleLowerCase();

    return items.filter(it => {
      return it.message.toLocaleLowerCase().includes(value) || it.assigned_name.toLocaleLowerCase().includes(value)
    });
  }

}
