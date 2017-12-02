import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {AuthService} from "../shared/services/auth.service";
import {EntryComponent} from "./entry.component";

const routes: Routes = [
  {path: '', component: EntryComponent},
  {path: ':entryID/edit/:processStepID', component: EntryComponent},
];

export const DemandRouting: ModuleWithProviders = RouterModule.forChild(routes);
