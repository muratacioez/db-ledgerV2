import {Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, Validator, Validators} from "@angular/forms";

import {IDemand} from "../interfaces/IDemand";
import {IEntry} from "../interfaces/IEntry";
import {LoggingService} from "../../shared/services/logging.service";
import {StatusNotificationService} from "../../standard-components/services/status-notification.service";
import {DemandService} from "../shared/demand.service";
import {Actions} from "../../shared/types/action.types";
import {States} from "../../shared/types/states.types";
import {StandardButtonDBILVComponent} from "../../standard-components/standard-button-dbilv/standard-button-dbilv.component";
import {isUndefined} from "util";

@Component({
  selector: 'app-demand-form-component',
  templateUrl: './demand-form.component.html',
  styleUrls: ['./demand-form.component.scss'],
})
export class DemandFormComponent implements OnInit {

  @Input() currentProject: IEntry;
  @Input() projectEntityDemand: IDemand;
  @Input() isNewProject: boolean;

  private withFileUpload: boolean = false;

  @Output('closeProject') closeProject = new EventEmitter();


  public apiEndPointUpload: string;
  public form: FormGroup;
  public calendarStartDate: Date = new Date();
  public States = States;

  private isSendingData: boolean = false;


  constructor (private logService: LoggingService,
               private statusNotificationService: StatusNotificationService,
               private router: Router,
               private demandService: DemandService,
               private elementRef: ElementRef,
               private route: ActivatedRoute) {
  }

  public ngOnInit () {
    this.initFormGroup();

    if (this.projectEntityDemand && this.projectEntityDemand.id){
      this.apiEndPointUpload = this.demandService.getUploadUrl(this.projectEntityDemand.id);
    } else {
      const demandId = this.route.snapshot.params['projectID'];
      this.apiEndPointUpload = this.demandService.getUploadUrl(demandId);
    }

  }

  public ngOnChanges (changed) {
    if (!isUndefined(changed.entryEntityDemand)
      && !isUndefined(changed.entryEntityDemand.currentValue)
      && !isUndefined(changed.entryEntityDemand.currentValue.budget)) {

      const bString = changed.entryEntityDemand.currentValue.budget;
      changed.entryEntityDemand.currentValue.budget = bString.replace(/\./g, '');
    }
  }

  public initFormGroup (): void {
    this.form = new FormGroup({
      'draft': new FormControl({}),
      'recipient': new FormControl({}),
      'name': new FormControl({}, [Validators.required]),
      'description': new FormControl({}, [Validators.required]),
      'budget': new FormControl({}, [Validators.required, Validators.pattern('^[0-9]{1,45}$')]),
      'deadline': new FormControl({}, [Validators.required]),
      'priority': new FormControl({}, [Validators.required]),
      'document': new FormControl({value: '', disabled: true}, [Validators.required])

    });
  }

  public laddaIntercept (btn: StandardButtonDBILVComponent, callback: Function): void {

    /*Array.from(this.elementRef.nativeElement.getElementsByClassName('laddaBtn')).forEach( (el:StandardButtonDBILVComponent) =>{

     if(el != btn ){
     console.log("disabling -> "+el);
     el.isEnabled = false;
     }
     });*/
    if (this.form.invalid) {
      this.markFormGroupTouched(this.form);
      return;
    }

    if (this.isSendingData)return;

    this.isSendingData = true;
    btn.isLoading = true;
    callback.call(this);
  }

  public onCloseClick () {
    this.closeProject.emit('');
  }

  public onSaveDemandClick ( isDirectSubmit: boolean = false ): void {

    if (this.form.invalid) {
      this.markFormGroupTouched(this.form);
      return;
    }

    this.projectEntityDemand.name = this.currentProject.name;
    if (this.isNewProject) {
      this.logService.log("SAVE DEMAND CLICKED -> NEW DEMAND");
      this.projectEntityDemand.action = Actions.OPEN_DEMAND;

      this.demandService.createDemand(this.projectEntityDemand).subscribe((response) => {
          this.projectEntityDemand.id = response.json()['id'];
          this.apiEndPointUpload = this.demandService.getUploadUrl(this.projectEntityDemand.id);
        },
        (error) => {
          this.logService.error(error);
          this.statusNotificationService.showStatusNotification(StatusNotificationService.SHOW_STATUS_ERROR);
          let subscription = this.statusNotificationService.hideStatusEmitter.subscribe(() => {
            subscription.unsubscribe();
            this.router.navigate(['marketplace']);
          });
        });

    } else {
      this.logService.log("SAVE DEMAND CLICKED -> EDIT DEMAND");
    }
  }

  public showStatusNotification(){
    this.statusNotificationService.showStatusNotification(StatusNotificationService.SHOW_STATUS_DEMAND_OPEN,
          "Vorgangsnummer: " + this.projectEntityDemand.id);
    let subscription = this.statusNotificationService.hideStatusEmitter.subscribe(() => {
      subscription.unsubscribe();
      this.router.navigate(['marketplace']);
    });
  }

  public onSubmitDemandClick (): void {
    if (this.form.invalid) {
      this.markFormGroupTouched(this.form);
      return;
    }

    this.projectEntityDemand.name = this.currentProject.name;
    this.logService.log("SUBMIT CLICKED");

        if (this.isNewProject) {
          this.projectEntityDemand.action = Actions.SUBMIT_DEMAND;

          if (this.withFileUpload){
            this.directSubmitWithAttachment();
          } else {
            this.directSubmitWithoutAttachment();
          }

        } else {
          this.logService.log("SUBMIT DEMAND CLICKED -> EDIT DEMAND");



    }
  }

  private directSubmitWithAttachment(){
    /*
    if (this.isNewEntry) {
      this.fileUploadService.dispatcher.subscribe(event => {
        if (event === FileUploadAreaService.UPLOAD_ALL_COMPLETE) {
          this.fileUploadService.dispatcher.unsubscribe();
          this.demandService.updateDemandState(this.entryEntityDemand.id, Actions.SUBMIT_DEMAND).subscribe((resp) => {
            this.showStatusNotification();
          });
        }
      });
      this.onSaveDemandClick(true);
    }
    */
  }

  private directSubmitWithoutAttachment(){
    this.demandService.createDemand(this.projectEntityDemand, 'true').subscribe((response) => {
        // this.entryEntityDemand.id = response.json()['id'];
        // this.apiEndPointUpload = '/demand/' + this.entryEntityDemand.id + '/attachment';
        // this.fileUploadService.setApiEndPoint(this.apiEndPointUpload);
        //
        // this.fileUploadService.dispatcher.subscribe(event => {
        //   if (event === FileUploadAreaService.UPLOAD_ALL_COMPLETE) {
        //     this.fileUploadService.dispatcher.unsubscribe();
        //     this.showStatusNotification();
        //   }
        // });
        // this.fileUploadService.uploadAllFilesInQueue();
        this.showStatusNotification();
      },
      (error) => {
        this.logService.error(error);
        this.statusNotificationService.showStatusNotification(StatusNotificationService.SHOW_STATUS_ERROR);
        let subscription = this.statusNotificationService.hideStatusEmitter.subscribe(() => {
          subscription.unsubscribe();
          this.router.navigate(['marketplace']);
        });
      });
  }

  public onEditDemnandClick (event: Event): void {
    if (this.form.invalid) {
      this.markFormGroupTouched(this.form);
      return;
    }

    this.projectEntityDemand.name = this.currentProject.name;
    this.demandService.updateDemand(this.projectEntityDemand).subscribe(
      (response) => {
        this.statusNotificationService.showStatusNotification(StatusNotificationService.SHOW_STATUS_DEMAND_EDITED);
        let subscription = this.statusNotificationService.hideStatusEmitter.subscribe(() => {
          subscription.unsubscribe();
          this.router.navigate(['demand/' + this.currentProject.id]);
        });
      },
      (error) => {
        this.logService.error(error);
        this.statusNotificationService.showStatusNotification(StatusNotificationService.SHOW_STATUS_ERROR);
        let subscription = this.statusNotificationService.hideStatusEmitter.subscribe(() => {
          subscription.unsubscribe();
          this.router.navigate(['demand/' + this.currentProject.id]);
        });
      });
  }

  public onSendDraftClick ($event): void {
    if (this.form.invalid) {
      this.markFormGroupTouched(this.form);
      return;
    }

    this.projectEntityDemand.name = this.currentProject.name;
  }

  public onDateInputChange (target): void {
    this.form.controls['deadline'].updateValueAndValidity();
  }

  private markFormGroupTouched (formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control.controls) {
        control.controls.forEach(c => this.markFormGroupTouched(c));
      }
    });
  }

}
