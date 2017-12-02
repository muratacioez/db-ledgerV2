import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {EntrylistComponent} from "./entrylist.component";

const routes: Routes = [
  { path: '', component: EntrylistComponent }
];

export const EntrylistRouting: ModuleWithProviders = RouterModule.forChild(routes);
