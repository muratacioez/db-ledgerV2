import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EntrylistComponent} from "./entrylist.component";
import {StandardComponentsModule} from "../standard-components/standard-components.module";
import {MarketListComponent} from "./entrylist-list/entrylist-list.component";
import {SearchFilterPipe} from "./shared/search-filter-pipe";
import {EntrylistRouting} from "./entrylist.routing";
import {ArraySortPipe} from "./shared/sort-array-pipe";

@NgModule({
  imports: [
    CommonModule,
    StandardComponentsModule,
    EntrylistRouting
  ],
  declarations: [
    EntrylistComponent,
    MarketListComponent,
    SearchFilterPipe,
    ArraySortPipe
  ],
  providers: [

  ],
  exports:[
  ]
})
export class EntrylistModule { }
