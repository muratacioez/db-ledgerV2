import {IUser} from "./IUser";

export interface IEntry {
  LogAttachments: any [];

  logDate: string;

  LogHistory: any [];

  logKey: string;
  logStatus: string
  logUser: string;
  user: IUser;
  logValue: any;
}
