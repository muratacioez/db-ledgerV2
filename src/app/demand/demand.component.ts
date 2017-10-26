import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {animate, state, style, transition, trigger} from "@angular/animations";

import {LoggingService} from "../shared/services/logging.service";
import {IEntry} from "./interfaces/IEntry";
import {IDemand} from "./interfaces/IDemand";
import {DemandService} from "./shared/demand.service";
import {AuthService} from "../shared/services/auth.service";
import {Demand} from "../shared/models/demand.model";
import {Entry} from "../shared/models/entry.model";


@Component({
  selector: 'app-demand-component',
  templateUrl: './demand.component.html',
  styleUrls: ['./demand.component.scss'],
  providers: [LoggingService],
  animations: [
    trigger('demandContentState', [
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
export class DemandComponent implements OnInit {

  public demandHeaderState: string;
  public demandContentState: string;

  public currentEntry: IEntry;
  public entryEntityDemand: IDemand;
  public isNewEntry: boolean = true;

  public headerTitle: string = 'Neuen Eintrag erstellen';
  public headerVorgangsnummer: string = '';

  constructor (private route: ActivatedRoute,
               private demandService: DemandService,
               private logService: LoggingService,
               private router: Router,
               private authService: AuthService) {
  }

  public ngOnInit () {

    this.isNewEntry = this.route.snapshot.params['projectID'] == undefined ? true : false;

    if (this.isNewEntry) {
      this.demandContentState = 'fromTop';

      this.currentEntry = new Entry();
      this.entryEntityDemand = new Demand();
      this.entryEntityDemand.attachments = [];
      this.entryEntityDemand.creator = this.authService.loggedUser;


    } else {
      this.demandContentState = 'fromLeft';

      this.demandService.getProject(this.route.snapshot.params['projectID']).subscribe((project: Entry) => {
        this.entryEntityDemand = project.demand;
        console.info("received entry", project);
        this.currentEntry = project;
        this.headerTitle = this.currentEntry.name;
        this.headerVorgangsnummer = this.currentEntry.id;
        this.logService.log(this.entryEntityDemand);
      });

    }
  }


  public onCloseProjectClicked () {

    if (this.isNewEntry) {
      this.demandHeaderState = 'invisible';
      this.demandContentState = 'invisible';
    } else {
      this.demandHeaderState = 'invisible';
      this.demandContentState = 'toRight';
    }

    setTimeout(() => {
      if (this.isNewEntry) {
        this.router.navigate(['marketplace']);
      } else {
        this.router.navigate(['entry/' + this.currentEntry.id]);
      }
    }, 600);
  }

}
