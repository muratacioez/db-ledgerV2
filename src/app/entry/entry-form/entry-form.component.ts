import {Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";

import {IEntry} from "../../shared/interfaces/IEntry";
import {LoggingService} from "../../shared/services/logging.service";
import {StatusNotificationService} from "../../standard-components/services/status-notification.service";
import {EntryService} from "../../shared/services/entry.service";
import {States} from "../../shared/types/states.types";
import {StandardButtonDBILVComponent} from "../../standard-components/standard-button-dbilv/standard-button-dbilv.component";
import {isUndefined} from "util";
import {User} from "../../shared/models/user.model";
import {AuthService} from "../../shared/services/auth.service";

@Component({
  selector: 'app-entry-form-component',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.scss'],
})
export class EntryFormComponent implements OnInit {

  @Input() currentEntry: IEntry;
  @Input() isNewEntry: boolean;

  loggedInUser: User;

  private withFileUpload: boolean = false;

  @Output('closeEntry') closeEntry = new EventEmitter();


  public apiEndPointUpload: string;
  public form: FormGroup;
  public calendarStartDate: Date = new Date();
  public States = States;

  private isSendingData: boolean = false;


  constructor (private logService: LoggingService,
               private authService: AuthService,
               private statusNotificationService: StatusNotificationService,
               private router: Router,
               private entryService: EntryService,
               private route: ActivatedRoute) {
  }

  public ngOnInit () {
    this.loggedInUser = this.authService.loggedUser;

    this.initFormGroup();

    if (this.currentEntry && this.currentEntry.logKey){
      this.apiEndPointUpload = this.entryService.getUploadUrl(this.currentEntry.logKey);

    } else {
      const entryId = this.route.snapshot.params['entryID'];
      this.apiEndPointUpload = this.entryService.getUploadUrl(entryId);
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
      'name': new FormControl({}, [Validators.required]),
      'description': new FormControl({}, [Validators.required])
    });
    if(!this.isNewEntry) this.form.disable()
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
    this.closeEntry.emit('');
  }

  public showStatusNotification(key: string){
    this.statusNotificationService.showStatusNotification(StatusNotificationService.SHOW_STATUS_ENTRY_OPEN,
          "ID:  " + key);
    let subscription = this.statusNotificationService.hideStatusEmitter.subscribe(() => {
      subscription.unsubscribe();
      this.router.navigate(['entrylist']);
    });
  }

  public onSubmitDemandClick (): void {
    if (this.form.invalid) {
      this.markFormGroupTouched(this.form);
      return;
    }

    this.logService.log("SUBMIT CLICKED");

        if (this.isNewEntry) {

          if (this.withFileUpload){
            this.SubmitWithAttachment();
          } else {
            this.SubmitWithoutAttachment();
          }

        } else {
          this.logService.log("SUBMIT DEMAND CLICKED -> EDIT DEMAND");

    }
  }

  private SubmitWithAttachment(){
    /*
    if (this.isNewEntry) {
      this.fileUploadService.dispatcher.subscribe(event => {
        if (event === FileUploadAreaService.UPLOAD_ALL_COMPLETE) {
          this.fileUploadService.dispatcher.unsubscribe();
          this.entryService.updateDemandState(this.entryEntityDemand.id, Actions.SUBMIT_DEMAND).subscribe((resp) => {
            this.showStatusNotification();
          });
        }
      });
      this.onSaveDemandClick(true);
    }
    */
  }

  private SubmitWithoutAttachment(){
    this.entryService.createEntry(this.currentEntry, 'true').subscribe((key: string) => {

        this.showStatusNotification(key);
      },
      (error) => {
        this.logService.error(error);
        this.statusNotificationService.showStatusNotification(StatusNotificationService.SHOW_STATUS_ERROR);
        let subscription = this.statusNotificationService.hideStatusEmitter.subscribe(() => {
          subscription.unsubscribe();
          this.router.navigate(['entrylist']);
        });
      });
  }

  public onUpdateStatusClick(approved: boolean): void {
    this.currentEntry.logStatus = approved ? 'APPROVED' : 'VOID';

    this.entryService.updateEntry(this.currentEntry).subscribe(
      (response) => {
        this.statusNotificationService.showStatusNotification(StatusNotificationService.SHOW_STATUS_ENTRY_EDITED);
        let subscription = this.statusNotificationService.hideStatusEmitter.subscribe(() => {
          subscription.unsubscribe();
          this.router.navigate(['entrylist']);
        });
      },
      (error) => {
        this.logService.error(error);
        this.statusNotificationService.showStatusNotification(StatusNotificationService.SHOW_STATUS_ERROR);
        let subscription = this.statusNotificationService.hideStatusEmitter.subscribe(() => {
          subscription.unsubscribe();
          this.router.navigate(['entry/' + this.currentEntry.logKey]);
        });
      });
  }

  public onEditDemandClick (event: Event): void {
    if (this.form.invalid) {
      this.markFormGroupTouched(this.form);
      return;
    }

    this.entryService.updateEntry(this.currentEntry).subscribe(
      (response) => {
        this.statusNotificationService.showStatusNotification(StatusNotificationService.SHOW_STATUS_ENTRY_EDITED);
        let subscription = this.statusNotificationService.hideStatusEmitter.subscribe(() => {
          subscription.unsubscribe();
          this.router.navigate(['entry/' + this.currentEntry.logKey]);
        });
      },
      (error) => {
        this.logService.error(error);
        this.statusNotificationService.showStatusNotification(StatusNotificationService.SHOW_STATUS_ERROR);
        let subscription = this.statusNotificationService.hideStatusEmitter.subscribe(() => {
          subscription.unsubscribe();
          this.router.navigate(['demand/' + this.currentEntry.logKey]);
        });
      });
  }

  public onSendDraftClick ($event): void {
    if (this.form.invalid) {
      this.markFormGroupTouched(this.form);
      return;
    }

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
