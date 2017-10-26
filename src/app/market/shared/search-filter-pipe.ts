import {Pipe, PipeTransform} from "@angular/core";
import {IEntry} from "../interfaces/IEntry";

@Pipe({
  name: 'searchFilter',
  pure: false
})
export class SearchFilterPipe implements PipeTransform {
  transform (items: IEntry[], filter: string): any {
    if (!items || !filter) {
      return items;
    }
    // filter items array, items which match and return true will be kept, false will be filtered out
    return items.filter( (item:IEntry) => {
      return (item.id.toString().indexOf(filter) != -1 ||
      item.name.toLowerCase().indexOf(filter.toLowerCase()) != -1);
    })
  }
}
