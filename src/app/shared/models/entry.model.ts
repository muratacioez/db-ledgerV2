import {IEntry as IEntry} from "../interfaces/IEntry";
import {User} from "../models/user.model";

export class Entry implements IEntry {

  constructor() {
    this.logValue = {
      logName: '',
      logData: ''
    }
  }

  LogAttachments: any [];

  logDate: string;

  LogHistory: any [];

  logKey: string;
  logStatus: string;
  logUser: string;
  user: User;
  logValue: any;

}
