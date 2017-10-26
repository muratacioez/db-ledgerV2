import { Injectable } from '@angular/core';
import {ApiService} from "../../shared/services/api.service";
import {Observable} from "rxjs/Rx";
import {IEntry} from "../interfaces/IEntry";
import {IDemand} from "../interfaces/IDemand";
import {Entry} from "../../shared/models/entry.model";

@Injectable()
export class DemandService {

  constructor(private apiService: ApiService) { }

  public getProject (projectID: string): Observable<IEntry> {
    return this.apiService.intercept(this.apiService.get(ApiService.GET_DEMAND_REST_URL + "/" + projectID)).map(res => this.mapDetailProjectFromJSON(res.json()));
  }

  public createDemand(demand: IDemand, directSubmit:string = 'false'): Observable<Response> {
    return this.apiService.intercept(this.apiService.post(ApiService.CREATE_DEMAND_REST_URL + "?directSubmit=" + directSubmit,
      demand.toJSON()));
  }

  public updateDemand(demand: IDemand): Observable<Response> {
    return this.apiService.intercept(this.apiService.put(ApiService.UPDATE_DEMAND_REST_URL + "/" + demand.id, demand.toJSON()));
  }

  public updateDemandState (demandId: string, action: string): Observable<Response> {
    return this.apiService.intercept(this.apiService.put(ApiService.UPDATE_DEMAND_STATE_REST_URL + demandId + "?action=" + action, {}));
  }

  public getUploadUrl (demandId: string){
    return this.apiService.apiUrl + ApiService.GET_DEMAND_REST_URL + "/" + demandId + '/attachment';
  }

  public getDownloadUrl (demandId: string, fileId: string){
    return this.apiService.apiUrl + ApiService.GET_DEMAND_REST_URL + "/" + demandId + '/attachment/' + fileId;
  }

  public getFileNameFromFileId( fileId: string ) : string {
    const idx = fileId.lastIndexOf("_");
    return fileId.substring(idx + 1);
  }

  //TODO: NA - Reorganize Remapping of Entry <-> Demand ?
  private mapDetailProjectFromJSON (responseJSON): IEntry {
    let project: IEntry = Entry.fromJSON(responseJSON);

    return project;
  }

}
