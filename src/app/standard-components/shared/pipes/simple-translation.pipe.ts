import { Pipe, PipeTransform } from '@angular/core';


/**
 * A simple translation currently just used for states and contract types.
 */
@Pipe({name: 'simpleTranslation'})
export class SimpleTranslationPipe implements PipeTransform {

  transform(subject: string): string {

    let translation = subject;

    switch(subject) {
      // States
      case "OPENED": {
        translation = "Geöffnet";
        break;
      }
      case "SUBMITTED": {
        translation = "Veröffentlicht";
        break;
      }
      case "LOCKED": {
        translation = "Abgeschlossen";
        break;
      }
      case "CLOSED": {
        translation = "Abgebrochen";
        break;
      }
      case "COMPLETED": {
        translation = "Genehmigt";
        break;
      }
      // Contract Types
      case "WORK_AND_SERVICE_CONTRACT": {
        translation = "Werkvertrag";
        break;
      }
      case "SERVICE_CONTRACT": {
        translation = "Dienstvertrag";
        break;
      }
      case "SUBSCRIPTION_CONTRACT": {
        translation = "Leistungsschein";
        break;
      }
      default: {
        //statements;
        break;
      }
    }

    return translation;
  }
}
