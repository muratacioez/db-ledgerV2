import {Injectable} from "@angular/core";
import {Http, RequestOptionsArgs, Response} from "@angular/http";
import {Observable} from "rxjs/Rx";
import {Router} from "@angular/router";


@Injectable()
export class ApiService {

  private apiEndpointMobileApp:string =  'http://10.43.185.169:8510/safelog/resources/safelogalpha';
  public apiEndpointWeb:string =  '/safelog/resources/safelogalpha';

  //now
  public static CREATE_ENTRY_REST_URL: string = "/createLogEntry";
  public static UPDATE_ENTRY_STATE_REST_URL: string = "/updateLogEntryStatus";
  public static GET_ENTRY_REST_URL: string = "/getLog";
  public static GET_ALL_ENTRIES_REST_URL: string = "/getAllLogs";
  public static ADD_ATTACHMENT_REST_URL: string = "/addAttachment";

  //future
  public static UPDATE_ENTRY_REST_URL: string = "/entry";
  public static DELETE_ENTRY_REST_URL: string = "/entry/delete/";
  public static GET_USER_REST_URL: string = "/user";
  public static GET_POSSIBLE_RECIPIENTS_REST_URL: string = "";

  public static LOGIN_REST_URL: string = "";
  public static LOGOUT_REST_URL: string = "";



  public apiUrl:string;

  constructor(private http: Http, private router:Router) {
    this.apiUrl = this.apiEndpointWeb;
  }

  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.http.get(this.apiUrl + url, options);
  }

  post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return this.http.post(this.apiUrl + url, body, options);
  }

  put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return this.http.put(this.apiUrl + url, body, options);
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.http.delete(this.apiUrl + url, options);
  }

  patch(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return this.http.patch(this.apiUrl + url, body, options);
  };

  head(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.http.head(this.apiUrl + url, options);
  }

  options(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.http.options(this.apiUrl + url, options);
  }

  public intercept(observable: Observable<any>) {
    return observable.catch(err => {

      if (err.status === 401) {
        this.router.navigate(['/login']);
        return Observable.empty();

      }
    });
  }

  // public getDownloadUrl (demandId: string, fileId: string){
  //   return this.apiUrl + ApiService.GET_ENTRY_REST_URL + "/" + demandId + '/attachment/' + fileId;
  // }
  //
  // public getUploadUrl (demandId: string){
  //   return this.apiUrl + ApiService.GET_ENTRY_REST_URL + "/" + demandId + '/attachment';
  // }


}
