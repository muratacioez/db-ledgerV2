import {EventEmitter, Injectable} from '@angular/core';

@Injectable()
export class ProjectHeaderService {

  public static HEADER_CLOSED:string = 'ProjectHeaderService.HEADER_CLOSED';
  public static HEADER_COLLAPSE:string = 'ProjectHeaderService.HEADER_COLLAPSE';

  public headerStateChanged:EventEmitter<string> = new EventEmitter();

  constructor() { }

  public closeHeader(){
    this.headerStateChanged.emit(ProjectHeaderService.HEADER_CLOSED);
  }

  public collapseHeader():void{
    this.headerStateChanged.emit(ProjectHeaderService.HEADER_COLLAPSE);
  }

}
