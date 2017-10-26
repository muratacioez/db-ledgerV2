import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Rx";
import {ApiService} from "../../shared/services/api.service";
import {IEntry} from "../interfaces/IEntry";
import {User} from "../../shared/models/user.model";
@Injectable()
export class MarketService {

  constructor(private apiService:ApiService) {

  }

  public getProjects(): Observable<IEntry[]> {
    /* return Observable.interval(1000).flatMap(() => this.intercept(this.http.get(ProjectDataService.GET_PROJECTS_REST_URL)).map(ProjectDataService.mapProjects));*/

    //original
    //return this.apiService.intercept(this.apiService.get(ApiService.GET_PROJECTS_REST_URL)).map(res => res.json());

    let user: User = {
      id: '7',
      lastName: 'dosch',
      firstName: 'simon',
      username: 'simond',
      avatarImageSrc: '',
      canCreateEntry: true
    }

    let mock: IEntry[] = [
      {
      id: '1',
      state: 'pending',
      name: 'some entry',
      description: 'some description that is very long and has lots of important stuff in it !!',
      creator: user,
      lastModified: new Date(),

      isDraft: false,
      }
    ]

    return Observable.of(mock);
  }

  public getProjectsFrequently(): Observable<IEntry[]> {
    return Observable
      .interval(10000)
      .flatMap(() => {
        return this.getProjects();
      });
  }
}
