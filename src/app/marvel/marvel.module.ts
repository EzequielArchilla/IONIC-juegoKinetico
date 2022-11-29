import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MarvelPageRoutingModule } from './marvel-routing.module';

import { MarvelPage } from './marvel.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MarvelPageRoutingModule
  ],
  declarations: [MarvelPage]
})
export class MarvelPageModule {}
