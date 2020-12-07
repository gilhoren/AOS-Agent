import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TenantDetailsComponent} from './tenant-details/tenant-details.component';
import { AppComponent} from "./app.component";


const routes: Routes = [
  //{ path: "details", component: TenantDetailsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
