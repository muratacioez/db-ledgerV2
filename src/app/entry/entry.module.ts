import {NgModule } from '@angular/core';
import {CommonModule } from '@angular/common';
import {EntryComponent } from './entry.component';
import {StandardComponentsModule} from "../standard-components/standard-components.module";
import {EntryFormComponent} from "./entry-form/entry-form.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {
  MdCheckboxModule, MdDatepickerModule, MdDialogModule, MdInputModule, MdNativeDateModule,
  MdRadioModule, MdSelectModule
} from "@angular/material";
import {DemandRouting} from "./entry.routing";
import {FileUploadModule} from "ng2-file-upload";

@NgModule({
  imports: [
    CommonModule,
    StandardComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    DemandRouting,
    MdInputModule,
    MdCheckboxModule,
    MdDatepickerModule,
    MdNativeDateModule,
    MdSelectModule,
    MdRadioModule,
    MdDialogModule,
    FileUploadModule
  ],
  declarations: [
    EntryComponent,
    EntryFormComponent
  ],
  providers:[

  ]
})
export class EntryModule { }
