
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {
  GoogleApiModule,
  GoogleApiService,
  GoogleAuthService,
  NgGapiClientConfig,
  NG_GAPI_CONFIG,
  GoogleApiConfig
} from "ng-gapi";
import { AppComponent } from './app.component';
import { UserService } from './UserService';
import { SheetResource } from './SheetResource';
import {RouterModule} from '@angular/router';

let gapiClientConfig: NgGapiClientConfig = {
  client_id: "666652112938-cfk860nn08b1ba5ps805png10g9qsv61.apps.googleusercontent.com",
  discoveryDocs: ["https://analyticsreporting.googleapis.com/$discovery/rest?version=v4"],
  ux_mode: "popup",
  redirect_uri: "",
  scope: [
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/spreadsheets"
  ].join(" ")
};

@NgModule({
  imports:      [
    BrowserModule,
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    RouterModule.forRoot([{
      path: 'redirect',
      component: AppComponent
    }]),
    HttpClientModule,
    GoogleApiModule.forRoot({
      provide: NG_GAPI_CONFIG,
      useValue: gapiClientConfig
    }),
  ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ],
  providers: [UserService, SheetResource]
})
export class AppModule {

}
