import {IUser} from "./IUser";
export interface IEntry{
  id: string;
  state: string;
  name: string;
  description: string;
  creator: IUser;
  lastModified:Date;

  isDraft: boolean;
}
