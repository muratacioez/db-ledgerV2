import {Pipe, PipeTransform} from "@angular/core";
import {IEntry} from "../../shared/interfaces/IEntry";

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
      return (item.logUser.toLowerCase().indexOf(filter.toLowerCase()) != -1 ||
        item.logKey.toLowerCase().indexOf(filter.toLowerCase()) != -1);
    })
  }
}
