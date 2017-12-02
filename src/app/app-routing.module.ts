import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {SplashscreenComponent} from "./splashscreen/splashscreen.component";
import {AuthService} from "./shared/services/auth.service";
import {EntryComponent} from "./entry/entry.component";



const routes: Routes = [


  {path: '', component: SplashscreenComponent},
   {path: '*', component: SplashscreenComponent},
   {path: 'splashscreen', component: SplashscreenComponent},
   {path: 'entrylist', canActivate: [AuthService], loadChildren: './entrylist/entrylist.module#EntrylistModule'},
   {path: 'login', loadChildren: './login/login.module#LoginModule'},
  {path: 'newEntry', canActivate: [AuthService], loadChildren: './entry/entry.module#EntryModule'},
  {path: 'entry/:entryID', canActivate: [AuthService], component: EntryComponent}

/*
  {path: 'demand/:projectID/edit/:processStepID', canActivate: [AuthService], component: EntryComponent},
  {path: 'newDemand', canActivate: [AuthService], component: EntryComponent},

  {path: 'demand/:projectID/editOffer/:processStepID', canActivate: [AuthService], component: OfferComponent },
  {path: 'demand/:projectID/newOffer', canActivate: [AuthService], component: OfferComponent}
*/

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
