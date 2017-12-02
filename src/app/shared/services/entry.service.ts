import { Injectable} from '@angular/core';
import {ApiService} from "./api.service";
import {Observable} from "rxjs/Rx";
import {IEntry} from "../interfaces/IEntry";
import {AuthService} from "./auth.service";
import {User} from "../models/user.model";

const LOGGING_SPACE = "db_ledger";
//also change path in getAll !!!

@Injectable()
export class EntryService {

  constructor(private apiService: ApiService,
              private authService: AuthService) { }

  public getEntry (entryID: string): Observable<IEntry> {
    let body = {"LoggingSpaceName":LOGGING_SPACE,"LoggingKey":entryID,"LoggingUser": this.authService.loggedUser.username}
    return this.apiService.intercept(this.apiService.post(ApiService.GET_ENTRY_REST_URL, body)).map(res => this.mapEntry(res.json().query));
  }

  public createEntry(entry: IEntry, directSubmit:string = 'false'): Observable<string> {
    //TODO get user here dynamically
    //let user = this.authService.loggedUser();

    let body = {"LoggingSpaceName": LOGGING_SPACE,"LoggingUser": this.authService.loggedUser.username,"LoggingValue": JSON.stringify(entry.logValue)};
    return this.apiService.intercept(this.apiService.post(ApiService.CREATE_ENTRY_REST_URL, body).map(res => res.json().key));
  }

  public updateEntry(entry: IEntry): Observable<Response> {
    let body = {"LoggingSpaceName": LOGGING_SPACE,"LoggingUser": this.authService.loggedUser.username,"LoggingKey": entry.logKey, "LoggingStatus": entry.logStatus};
    console.log(body);
    return this.apiService.intercept(this.apiService.post(ApiService.UPDATE_ENTRY_STATE_REST_URL, body));
  }
/*
  public getDownloadUrl (entryId: string, fileId: string){
    return this.apiService.apiUrl + ApiService.GET_ENTRY_REST_URL + "/" + entryId + '/attachment/' + fileId;
  }

  public getFileNameFromFileId( fileId: string ) : string {
    const idx = fileId.lastIndexOf("_");
    return fileId.substring(idx + 1);
  }

*/
  private mapEntry (entryJSON): IEntry {
    let entry: IEntry = entryJSON;
    try{
      let v = JSON.parse(entry.logValue);
      entry.logValue = v;

      entry.user = new User();
      entry.user.firstName = entry.logUser;
    } catch (e) {}
    return entry;
  }

  private mapEntrieslogValue (entries): IEntry[] {
    for(let i = 0; i < entries.length; i++) {
      entries[i] = this.mapEntry(entries[i]);
    }
    return entries;
  }


  public getUploadUrl (entryId: string){
    return this.apiService.apiUrl + ApiService.GET_ENTRY_REST_URL + "/" + entryId + '/attachment';
  }

  //***********

  public getEntries(): Observable<IEntry[]> {

    //TODO get entries fro API

    let body = {'LoggingSpaceNamePrefix': LOGGING_SPACE,'LoggingUser': this.authService.loggedUser.username};
    return this.apiService.intercept(this.apiService.post(ApiService.GET_ALL_ENTRIES_REST_URL, body)).map(res => this.mapEntrieslogValue(res.json().query.db_ledger.logRecords));

    //mock
    //return Observable.of(mock);
  }

  public getEntriesFrequently(): Observable<IEntry[]> {
    return Observable
      .interval(10000)
      .flatMap(() => {
        return this.getEntries();
      });
  }

}
