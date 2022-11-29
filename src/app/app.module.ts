import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FirebaseModule } from './firebase/firebase.module';
import { DeviceMotion } from '@awesome-cordova-plugins/device-motion/ngx';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, FirebaseModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  DeviceMotion],
  bootstrap: [AppComponent],
})
export class AppModule {}
