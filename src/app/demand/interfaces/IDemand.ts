import {IEntryEntity} from "./IProjectEntity";

export interface IDemand extends IEntryEntity{
   budget: string;
   priority: string;
   name: string;
   targetAccount:string;

   getEndDate():string;
}
