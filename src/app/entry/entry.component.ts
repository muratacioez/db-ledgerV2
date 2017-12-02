import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {LoggingService} from "../shared/services/logging.service";
import {IEntry} from "../shared/interfaces/IEntry";
import {EntryService} from "../shared/services/entry.service";
import {AuthService} from "../shared/services/auth.service";
import {Entry} from "../shared/models/entry.model";
import {User} from "../shared/models/user.model"


@Component({
  selector: 'app-entry-component',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss'],
  providers: [LoggingService],
  animations: [
    trigger('entryContentState', [
      state('visible', style({
        opacity: 1,
        transform: 'translateY(0px)'
      })),
      state('invisible', style({
        opacity: 0,
        transform: 'translateY(-25px)'
      })),
      state('fromLeft', style({
        opacity: 1,
        transform: 'translateX(0px)'
      })),
      state('toRight', style({
        opacity: 0,
        transform: 'translateX(100px)'
      })),
      state('fromTop', style({
        opacity: 1,
        transform: 'translateX(0px)'
      })),
      transition('* => invisible', animate('700ms cubic-bezier(0.23, 1, 0.32, 1)')),
      transition('* => toRight', animate('700ms cubic-bezier(0.23, 1, 0.32, 1)')),
      transition('void => fromLeft', [
        style({
          opacity: 0,
          transform: 'translateX(100px)'
        }),
        animate('700ms cubic-bezier(0.23, 1, 0.32, 1)')
      ]),
      transition('void => fromTop', [
        style({
          opacity: 0,
          transform: 'translateY(-25px)'
        }),
        animate('700ms cubic-bezier(0.23, 1, 0.32, 1)')
      ])
    ])
  ]
})
export class EntryComponent implements OnInit {

  public entryHeaderState: string;
  public entryContentState: string;

  public currentEntry: IEntry;
  public isNewEntry: boolean = true;

  public headerTitle: string = 'Neuer Eintrag';
  public headerVorgangsnummer: string = '';

  constructor (private route: ActivatedRoute,
               private entryService: EntryService,
               private logService: LoggingService,
               private router: Router,
               private authService: AuthService) {
  }

  public ngOnInit () {

    this.isNewEntry = this.route.snapshot.params['entryID'] == undefined;

    if (this.isNewEntry) {
      this.entryContentState = 'fromTop';

      this.currentEntry = new Entry();
      this.currentEntry.logValue.logName = '';
      this.currentEntry.logValue.logData = '';

    } else {
      this.entryContentState = 'fromLeft';

      this.entryService.getEntry(this.route.snapshot.params['entryID']).subscribe((entry: Entry) => {
        console.info("received entry", entry);
        this.currentEntry = entry;
      });

    }
  }


  public onCloseProjectClicked () {

    if (this.isNewEntry) {
      this.entryHeaderState = 'invisible';
      this.entryContentState = 'invisible';
    } else {
      this.entryHeaderState = 'invisible';
      this.entryContentState = 'toRight';
    }

    setTimeout(() => {
        this.router.navigate(['entrylist']);
    }, 600);
  }

}
