import {Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import {IEntry} from "../../shared/interfaces/IEntry";

@Component({
  selector: 'app-entrylist-list',
  templateUrl: './entrylist-list.component.html',
  styleUrls: ['./entrylist-list.component.scss']
})
export class MarketListComponent implements OnInit {

  @Input('data') data: IEntry[];
  @Input() search: string;
  @Output() listElementClicked = new EventEmitter();

  public sortBy: any = 'created';
  public sortOrderDESC:boolean = false;

  constructor (private router: Router) {

  }

  ngOnInit () {
    //do nothing
  }

  public getStatusColor(entry: IEntry) {
    if(entry.logStatus === 'APPROVED') return 'statusAPPROVED'
    if(entry.logStatus === 'VOID') return 'statusVOID'
    else return ''
  }

  public sortableHeaderClicked(sortByString:string, event:Event):void{
    let children:HTMLCollection = (<HTMLElement>event.srcElement).parentElement.parentElement.children;
    for(var i=0; i<children.length ; i++){
      (<HTMLElement>event.srcElement).parentElement.parentElement.children[i].children[0].innerHTML = (<HTMLElement>event.srcElement).parentElement.parentElement.children[i].children[0].innerHTML.replace(" ↑","&nbsp;");
      (<HTMLElement>event.srcElement).parentElement.parentElement.children[i].children[0].innerHTML = (<HTMLElement>event.srcElement).parentElement.parentElement.children[i].children[0].innerHTML.replace(" ↓","&nbsp;");
    }

    if(this.sortBy === sortByString){
      this.sortOrderDESC = !this.sortOrderDESC;
      if(this.sortOrderDESC){
        event.srcElement.innerHTML = event.srcElement.innerHTML.substr(0,event.srcElement.innerHTML.length-6) + " &#x2191;";
        /* event.srcElement.innerHTML += "&#x2191;"; */
      }else{
        event.srcElement.innerHTML = event.srcElement.innerHTML.substr(0,event.srcElement.innerHTML.length-6) + " &#x2193;";
        //event.srcElement.innerHTML += "&#x2193;";
      }
    }else{
      event.srcElement.innerHTML = event.srcElement.innerHTML.substr(0,event.srcElement.innerHTML.length-6) + " &#x2193;";
      //event.srcElement.innerHTML += "&#x2193;";
      this.sortBy = sortByString;
      this.sortOrderDESC = false;
    }
  }



  public routeToProjectDetail (event: Event, entry: IEntry) {
    this.listElementClicked.emit(entry);
  }

}
