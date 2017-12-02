import {Component, OnDestroy, OnInit} from "@angular/core";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {Router} from "@angular/router";
import {IEntry} from "../shared/interfaces/IEntry";
import {LoggingService} from "../shared/services/logging.service";
import {AuthService} from "../shared/services/auth.service";
import {EntryService} from "../shared/services/entry.service";
import {IUser} from "../shared/interfaces/IUser";
import {MdDialog} from "@angular/material";
import {ModalDbIlvComponent} from "../standard-components/modal-db-ilv/modal-db-ilv.component";
import {forEach} from "@angular/router/src/utils/collection";

@Component({
  selector: 'app-entrylist-component',
  templateUrl: './entrylist.component.html',
  styleUrls: ['./entrylist.component.scss'],
  animations: [
    trigger('headerState', [
      state('visible', style({
        opacity: 1,
        transform: 'translateY(0px)'
      })),
      state('invisible', style({
        opacity: 0,
        transform: 'translateY(-50px)'
      })),
      transition('* => invisible', animate('500ms cubic-bezier(0.23, 1, 0.32, 1)')),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateY(-100px)'
        }),
        animate('700ms cubic-bezier(0.23, 1, 0.32, 1)')
      ])
    ]),
    trigger('listState', [
      state('visible', style({
        opacity: 1,
        transform: 'translateY(0px)'
      })),
      state('invisible', style({
        opacity: 0,
        transform: 'translateY(-25px)'
      })),
      transition('* => invisible', animate('700ms cubic-bezier(0.23, 1, 0.32, 1)')),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateY(-25px)'
        }),
        animate('700ms cubic-bezier(0.23, 1, 0.32, 1)')
      ])
    ])
  ]
})
export class EntrylistComponent implements OnInit, OnDestroy {

  private frequentUpdateSubscription;

  auth: AuthService;
  headerState: string;
  listState: string;
  entries: IEntry[];
  loggedInUser : IUser;
  search: string = "";

  constructor(private loggingService: LoggingService,
              private entryService: EntryService,
              private router: Router,
              private authService: AuthService,
              private dialogService: MdDialog) {
  }

  public ngOnInit() {

    this.entryService.getEntries().subscribe(res => {
      this.entries = <IEntry[]>res;
    });

    this.frequentUpdateSubscription = this.entryService.getEntriesFrequently().subscribe(p => {
      this.entries = <IEntry[]>p;
    });

    this.auth = this.authService;

    this.loggedInUser = this.authService.loggedUser;
    console.log(this.loggedInUser);
  }

  public ngOnDestroy() {
    this.frequentUpdateSubscription.unsubscribe();
  }

  public onSearchUpdate(data) {
    this.search = data;
  }

  public onSearchInputConfirm(data) {
    this.search = data;
  }

  public onCreateNewEntryClick() {
    this.followRoute('newEntry');
  }

  public onListClick(entry: IEntry) {
    this.followRoute('/entry/' + entry.logKey);
  }

  public onLogoutClick():void{

    let dialogRef = this.dialogService.open(ModalDbIlvComponent, {
      data: {
        modalType: ModalDbIlvComponent.LOGOUT
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.action === ModalDbIlvComponent.ACCEPT) {
        this.authService.logout();
        this.followRoute('login');
      }
    });

  }

  public followRoute(target: string) {
    this.headerState = 'invisible';
    this.listState = 'invisible';

    setTimeout(() => {
      this.router.navigate([target]);
    }, 600);
  }
}
