import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {TokenService} from "./tokengen-service.service";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import { TenantDetailsComponent } from './tenant-details/tenant-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    TenantDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3500,
      extendedTimeOut: 0
    })
  ],
  providers: [TokenService],
  bootstrap: [AppComponent]
})
export class AppModule { }
