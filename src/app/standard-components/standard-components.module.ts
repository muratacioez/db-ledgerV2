import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BackgroundMainDBILVComponent} from "./background-main-dbilv/background-main-dbilv.component";
import {ModalDbIlvComponent} from "./modal-db-ilv/modal-db-ilv.component";
import {SearchFieldDBILVComponent} from "./search-field-dbilv/search-field-dbilv.component";
import {StandardButtonDBILVComponent} from "./standard-button-dbilv/standard-button-dbilv.component";
import {StatusNotificationsComponent} from "./status-notifications/status-notifications.component";
import {UserAvatarComponent} from "./user-avatar/user-avatar.component";

import {MdDialogModule, MdInputModule} from "@angular/material";
import {ProjectHeaderComponent} from "./project-header/project-header.component";
import {LaddaModule} from "angular2-ladda";
import { ProjectHeaderTabComponent } from './project-header/project-header-tab/project-header-tab.component';
import {RoundProgressModule} from "angular-svg-round-progressbar";
import 'd3';
import 'nvd3';
import {NvD3Module} from "ng2-nvd3";
import { AnimatedArrowsComponent } from './animated-arrows/animated-arrows.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FileSelectDirective, FileUploader, FileUploadModule} from "ng2-file-upload";
import {FileSizePipe} from "./shared/pipes/file-size-pipe";
import {FileNamePipe} from "./shared/pipes/filename-pipe";
import {JsonObjectPipe} from "./shared/pipes/json-object.pipe";
import {TruncatePipe} from "./shared/pipes/truncate-pipe";
import {SimpleTranslationPipe} from "./shared/pipes/simple-translation.pipe";

@NgModule({
  imports: [
    CommonModule,
    MdInputModule,
    MdDialogModule,
    LaddaModule,
    RoundProgressModule,
    FormsModule,
    ReactiveFormsModule,
    NvD3Module,
    FileUploadModule
  ],
  declarations: [
    BackgroundMainDBILVComponent,
    ModalDbIlvComponent,
    SearchFieldDBILVComponent,
    StandardButtonDBILVComponent,
    StatusNotificationsComponent,
    UserAvatarComponent,
    ProjectHeaderComponent,
    ProjectHeaderTabComponent,
    AnimatedArrowsComponent,
    FileSizePipe,
    FileNamePipe,
    JsonObjectPipe,
    TruncatePipe,
    SimpleTranslationPipe
  ],
  exports: [
    BackgroundMainDBILVComponent,
    ModalDbIlvComponent,
    SearchFieldDBILVComponent,
    StandardButtonDBILVComponent,
    StatusNotificationsComponent,
    UserAvatarComponent,
    ProjectHeaderComponent,
    AnimatedArrowsComponent,
    FileSizePipe,
    FileNamePipe,
    JsonObjectPipe,
    TruncatePipe,
    FileSelectDirective,
    SimpleTranslationPipe
  ],
  entryComponents: [
    ModalDbIlvComponent
  ],
  providers:[

  ]
})
export class StandardComponentsModule { }
