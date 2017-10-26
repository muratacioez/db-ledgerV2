import {IEntry as IEntryMarket} from "../../market/interfaces/IEntry";
import {IEntry as IEntryDemand} from "../../demand/interfaces/IEntry";

import {User} from "./user.model";
import {Demand} from "./demand.model";
import {isNullOrUndefined} from "util";
import {Tasks} from "../types/tasks.types";

export class Entry implements IEntryMarket, IEntryDemand{

  public id: string;
  public state: string;
  public name: string;
  public description: string;
  public creator: User;
  public lastModified:Date;
  public demand: Demand;
  public isDraft: boolean;

  constructor(){}

  public static fromJSON(res: any): Entry {
    let project = new Entry();

    project.id = res.id;
    project.name = res.name;

    project.lastModified = new Date(res.lastModified);
    if(!isNullOrUndefined(project.demand))project.demand = Demand.fromJSON(res.demand);

    project.state = res.state;
    return project;
  }

  public static getFormattedTask(task:string):string {
    switch (task) {
      case Tasks.COMPLETE_DEMAND:
        return "veröffentlichen / bearbeiten";
      case Tasks.DEMAND_IN_PROGRESS:
        return "in Bearbeitung";
      case Tasks.WAIT_FOR_ACCEPTANCE:
        return "Warte auf Angebote";
      case Tasks.WAIT_FOR_OFFER:
        return "Warte auf Angebote";
      case Tasks.WAIT_FOR_COMPLETION:
        return "Warte";
      case Tasks.ACCEPT_OFFER:
        return "Angebote verfügbar";
      case Tasks.CORRECT_DEMAND:
        return "Bedarf überarbeiten";
      case Tasks.COMPLETED:
        return "Abgeschlossen";
      case Tasks.ACTIVATE_DEMAND:
        return "Bedarf veröffentlichen";
      case Tasks.CLOSED:
        return "Geschlossen";
      case Tasks.REWORK_OFFER:
        return "Angebot überarbeiten";
      case Tasks.ACTIVATE_OFFER:
        return "Angebot aktivieren";
      case Tasks.ACCEPT_DEMAND:
        return "Angebot abgeben";
      case Tasks.COMPLETE_OFFER:
        return "Angebot abgeben";
      case Tasks.APPROVE_OFFER:
        return "Angebot genehmigen";
      default:
        return "keine";
    }
  }

}
