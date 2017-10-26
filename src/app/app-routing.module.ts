import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {SplashscreenComponent} from "./splashscreen/splashscreen.component";
import {AuthService} from "./shared/services/auth.service";



const routes: Routes = [
  //TODO: NA - REFACTOR ROUTING WITH LAZY-LOADING FOR SUBMODULES

  {path: '', component: SplashscreenComponent},
   {path: '*', component: SplashscreenComponent},
   {path: 'splashscreen', component: SplashscreenComponent},
   {path: 'marketplace', canActivate: [AuthService], loadChildren: './market/market.module#MarketModule'},
   {path: 'login', loadChildren: './login/login.module#LoginModule'},
  {path: 'newDemand', canActivate: [AuthService], loadChildren: './demand/demand.module#DemandModule'}


  /*{path: '', component: SplashscreenComponent},
  {path: '*', component: SplashscreenComponent},
  {path: 'splashscreen', component: SplashscreenComponent},
  {path: 'marketplace', canActivate: [AuthService], component:MarketComponent},
  {path: 'login', component: LoginComponent},
  {path: 'demand/:projectID', canActivate: [AuthService], component: ProjectComponent},
  {path: 'demand/:projectID/edit/:processStepID', canActivate: [AuthService], component: DemandComponent},
  {path: 'newDemand', canActivate: [AuthService], component: DemandComponent},
  {path: 'demand/:projectID/editOffer/:processStepID', canActivate: [AuthService], component: OfferComponent },
  {path: 'demand/:projectID/newOffer', canActivate: [AuthService], component: OfferComponent}*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
