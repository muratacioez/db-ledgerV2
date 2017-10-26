import {isNullOrUndefined} from "util";
import {IDemand as IDemand} from "../../demand/interfaces/IDemand";
import {User} from "./user.model";
import {EntityTypes} from "../types/entitiy.types";

export class Demand implements IDemand {


  public type: string = EntityTypes.ENTITY_TYPE_DEMAND;
  public typeIcon: string = 'assets/img/icons/icon_Bedarf.png';
  public typeTitleText: string = 'Eintrag';

  public id: string;
  public name: string;
  public state: string;
  public budget: string;
  public priority: string;
  public description: string;
  public messageBoardUrl: string;
  public creator: User;
  public creationTime: Date;
  public availableActions: string;
  public endDate: Date;
  public targetAccount: string;
  public attachments: string[];

  public projectID: string;
  public action: string;

  public static fromJSON (data: any): Demand {

    let demand = new Demand();
    demand.id = data.id;
    demand.name = data.name;
    demand.state = data.state;
    demand.budget = data.budget.substring(0, data.budget.length - 3);
    demand.priority = data.priority;
    demand.description = data.description;
    demand.messageBoardUrl = data.messageBoardUrl;
    demand.creator = User.fromJSON(data.creator);

    demand.creationTime = Demand.getDateFromFormattedString(data.creationTime);
    demand.availableActions = data.availableActions || [];
    demand.endDate = Demand.getDateFromFormattedString(data.endDate);
    demand.targetAccount = data.targetAccount;
    demand.attachments = data.attachments || [];

    demand.projectID = data.id;

    return demand;
  }

  public static getDateFromFormattedString (dateString: string): Date {
    let ser = dateString.split('.');
    let date = new Date();

    date.setDate(Number(ser[0]));
    date.setMonth(Number(ser[1]) - 1 );
    date.setFullYear(Number(ser[2]));

    return date;
  }

  public toJSON (): Object {
    let outputOb = {};

    outputOb['id'] = this.id || '';
    outputOb['name'] = this.name || '';
    outputOb['budget'] = this.budget || '';
    outputOb['description'] = this.description || '';
    outputOb['messageBoardUrl'] = this.messageBoardUrl || '';
    outputOb['priority'] = this.priority || '';
    outputOb['targetAccount'] = this.targetAccount || '';
    outputOb['endDate'] = this.getEndDate();

    outputOb['action'] = this.action || '';

    return outputOb;
  }

  public getEndDate (): string {
    if (isNullOrUndefined(this.endDate)) {
      return undefined;
    }

    let day = this.endDate.getDate();
    let month = this.endDate.getMonth();

    return day + "." + month + "." + this.endDate.getFullYear();
  }

}
