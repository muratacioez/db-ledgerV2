import {
  Component, ElementRef, EventEmitter, HostListener, Inject, Injectable, Input, OnInit, Output,
  ViewChild
} from '@angular/core';

import {animate, state, style, transition, trigger} from "@angular/animations";
import {DOCUMENT} from "@angular/platform-browser";
import {IProjectHeaderTab} from "../interfaces/IProjectHeaderTab";
import {ProjectHeaderService} from "../services/project-header.service";

@Component({
  moduleId: module.id,
  selector: 'app-project-header',
  templateUrl: './project-header.component.html',
  styleUrls: ['./project-header.component.scss'],
  animations: [
    trigger('projectHeaderState', [
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
    ])]
})
@Injectable()
export class ProjectHeaderComponent implements OnInit {

  @Input('title') title: string = "";
  @Input('projectID') projectID: string = '';
  @Input('projectPercentage') projectPercentage: number = 0;
  @Input('headerState') headerState: string;
  @Input('tabList') tabs: IProjectHeaderTab[];

  @ViewChild('headerMainWrapper') headerMainWrapper: ElementRef;

  @Output('closeProject') closeProject = new EventEmitter();

  public collapsedHeader: boolean = false;
  public hideTopHeader: boolean = false;
  public animate: boolean = false;
  public scrollTop;


  constructor (@Inject(DOCUMENT) private document: any,
               private headerService: ProjectHeaderService) {
  }

  public ngOnInit () {
    this.headerService.headerStateChanged.subscribe(e => {
      if (e === ProjectHeaderService.HEADER_COLLAPSE) {
        this.headerState = 'invisible';
      }
    });
  }

  @HostListener("window:scroll", [])
  public onWindowScroll (): void {

    let scrollDiff = this.scrollTop - this.document.body.scrollTop;
    let direction = scrollDiff > 0 ? 1 : -1;

    this.scrollTop = this.document.body.scrollTop;
    if (this.scrollTop > 130) {
      this.hideTopHeader = true;
      if (direction > 0) {
        this.animate = true;
        this.hideTopHeader = false;
      } else {
        //this.animate = false;
      }

      this.collapsedHeader = true;
    } else if (this.collapsedHeader && this.scrollTop < 80) {
      this.animate = false;
      this.hideTopHeader = false;
      this.collapsedHeader = false;
    }

    if (this.collapsedHeader && this.scrollTop < 110) {
      this.hideTopHeader = true;
    }
  }

  public routeBackToMarketPlace (event: Event) {
    this.headerService.closeHeader();
    this.closeProject.emit('marketplace');
  }

  public getProjectProgressPercentage () {
    return this.projectPercentage;
  }

  public onTabClicked (tab: IProjectHeaderTab): void {
    if(!tab.enabled)return;
    this.tabs.forEach((t) => {
      t.active = false;
    });
    tab.active = true;
  }
}
