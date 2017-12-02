import {EventEmitter, Injectable, OnInit} from '@angular/core';
import {BackgroundService} from "./background.service";
import {StatusNotification} from "../status-notifications/StatusNotification";
import {isNullOrUndefined} from "util";

@Injectable()
export class StatusNotificationService implements OnInit {

  public showStatusEmitter: EventEmitter<StatusNotification> = new EventEmitter();
  public hideStatusEmitter: EventEmitter<string> = new EventEmitter();

  public static SHOW_STATUS_ASK_FOR_APPROVAL: StatusNotification = new StatusNotification('SHOW_STATUS_ASK_FOR_APPROVAL', 'Genehmigung anfragen', 'assets/img/icons/smallIcons_64x64/icon_small_questionmark.png');


  public static SHOW_STATUS_ENTRY_OPEN: StatusNotification = new StatusNotification('SHOW_STATUS_ENTRY_OPEN', 'Eintrag angelegt', 'assets/img/icons/icon_Bedarf.png');
  public static SHOW_STATUS_ENTRY_EDITED: StatusNotification = new StatusNotification('SHOW_STATUS_ENTRY_EDITED', 'Eintrag aktualisiert', 'assets/img/icons/smallIcons_64x64/icon_small_edit.png');
  public static SHOW_STATUS_DEMAND_ACCEPTED: StatusNotification = new StatusNotification('SHOW_STATUS_DEMAND_ACCEPTED', 'Eintrag akzeptiert', 'assets/img/icons/smallIcons_64x64/icon_small_check.png');
  public static SHOW_STATUS_DEMAND_SUBMITTED: StatusNotification = new StatusNotification('SHOW_STATUS_DEMAND_SUBMITTED', 'Eintrag übermittelt', 'assets/img/icons/smallIcons_64x64/icon_small_check.png');
  public static SHOW_STATUS_DEMAND_APPROVED: StatusNotification = new StatusNotification('SHOW_STATUS_DEMAND_APPROVED', 'Eintrag genehmigt', 'assets/img/icons/smallIcons_64x64/icon_small_check.png');
  public static SHOW_STATUS_DEMAND_REJECTED: StatusNotification = new StatusNotification('SHOW_STATUS_DEMAND_REJECTED', 'Eintrag abgelehnt', 'assets/img/icons/icon_Denied.png');
  public static SHOW_STATUS_DEMAND_REVOKED: StatusNotification = new StatusNotification('SHOW_STATUS_DEMAND_REVOKED', 'Eintrag aufgehoben', 'assets/img/icons/icon_Denied.png');
  public static SHOW_STATUS_DEMAND_RESIGNED: StatusNotification = new StatusNotification('SHOW_STATUS_DEMAND_RESIGNED', 'Eintrag aufgelöst', 'assets/img/icons/icon_Denied.png');
  public static SHOW_STATUS_DEMAND_BLOCKED: StatusNotification = new StatusNotification('SHOW_STATUS_DEMAND_BLOCKED', 'Eintrag blockiert', 'assets/img/icons/icon_Denied.png');
  public static SHOW_STATUS_DEMAND_CLOSED: StatusNotification = new StatusNotification('SHOW_STATUS_DEMAND_CLOSED', 'Eintrag geschlossen', 'assets/img/icons/icon_Denied.png');
  public static SHOW_STATUS_DEMAND_COMPLETED: StatusNotification = new StatusNotification('SHOW_STATUS_DEMAND_COMPLETED', 'Eintrag abgeschlossen', 'assets/img/icons/smallIcons_64x64/icon_small_check.png');

  public static SHOW_STATUS_ERROR: StatusNotification = new StatusNotification('SHOW_STATUS_ERROR', 'Ein Fehler ist aufgetreten', 'assets/img/icons/icon_Denied.png');

  public static SHOW_STATUS_OFFER_OPEN: StatusNotification = new StatusNotification('SHOW_STATUS_OFFER_OPEN', 'Angebot angelegt', 'assets/img/icons/icon_Angebot.png');
  public static SHOW_STATUS_OFFER_EDITED: StatusNotification = new StatusNotification('SHOW_STATUS_OFFER_EDITED', 'Angebot aktualisiert', 'assets/img/icons/smallIcons_64x64/icon_small_edit.png');
  public static SHOW_STATUS_OFFER_REJECTED: StatusNotification = new StatusNotification('SHOW_STATUS_OFFER_REJECTED', 'Angebot abgelehnt', 'assets/img/icons/icon_Denied.png');
  public static SHOW_STATUS_OFFER_APPROVED: StatusNotification = new StatusNotification('SHOW_STATUS_OFFER_APPROVED', 'Angebot genehmigt', 'assets/img/icons/smallIcons_64x64/icon_small_check.png');
  public static SHOW_STATUS_OFFER_CLOSED: StatusNotification = new StatusNotification('SHOW_STATUS_OFFER_CLOSED', 'Angebot geschlossen & entfernt', 'assets/img/icons/icon_Denied.png');
  public static SHOW_STATUS_OFFER_RESIGNED: StatusNotification = new StatusNotification('SHOW_STATUS_OFFER_RESIGNED', 'Angebot aufgelöst', 'assets/img/icons/icon_Denied.png');
  public static SHOW_STATUS_OFFER_COMPLETED: StatusNotification = new StatusNotification('SHOW_STATUS_OFFER_COMPLETED', 'Angebot abgeschlossen', 'assets/img/icons/smallIcons_64x64/icon_small_check.png');
  public static SHOW_STATUS_OFFER_REVOKED: StatusNotification = new StatusNotification('SHOW_STATUS_OFFER_REVOKED', 'Angebot aufgehoben', 'assets/img/icons/icon_Denied.png');
  public static SHOW_STATUS_OFFER_ACTIVATED: StatusNotification = new StatusNotification('SHOW_STATUS_OFFER_ACTIVATED', 'Das Angebot ist wieder aktiv', 'assets/img/icons/smallIcons_64x64/icon_small_check.png');
  public static SHOW_STATUS_OFFER_REVIEW_REQEST: StatusNotification = new StatusNotification('SHOW_STATUS_OFFER_REVIEW_REQEST', 'Genehmigung angefragt', 'assets/img/icons/smallIcons_64x64/icon_small_check.png');
  public static SHOW_STATUS_OFFER_ACCEPTED: StatusNotification = new StatusNotification('SHOW_STATUS_OFFER_ACCEPTED', 'Angebot angenommen', 'assets/img/icons/smallIcons_64x64/icon_small_check.png');
  public static SHOW_STATUS_OFFER_SUBMITTED: StatusNotification = new StatusNotification('SHOW_STATUS_OFFER_SUBMITTED', 'Angebot übermittelt', 'assets/img/icons/smallIcons_64x64/icon_small_check.png');

  public static SHOW_STATUS_CONTRACT_SIGNED: StatusNotification = new StatusNotification('SHOW_STATUS_CONTRACT_SIGNED', 'Vertrag unterzeichnet', 'assets/img/icons/icon_Sign.png');
  public static SHOW_STATUS_CONTRACT_REJECTED: StatusNotification = new StatusNotification('SHOW_STATUS_CONTRACT_REJECTED', 'Vertrag abgelehnt', 'assets/img/icons/icon_Denied.png');


  constructor (private backgroundService: BackgroundService) {
  }

  public ngOnInit (): void {
  }

  public showStatusNotification (status: StatusNotification, additionalString?:string): void {
    this.backgroundService.changeBackgroundState(BackgroundService.BACKGROUND_STATE_FLASH);
    if(!isNullOrUndefined(additionalString))status.additionalString = additionalString;
    this.showStatusEmitter.emit(status);
  }

  public hideStatusNotification (): void {
    this.backgroundService.changeBackgroundState(BackgroundService.BACKGROUND_STATE_IDLE);
    this.hideStatusEmitter.emit('hideStatusNotification');
  }

}
