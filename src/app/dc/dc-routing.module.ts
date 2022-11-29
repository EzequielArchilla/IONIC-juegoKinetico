import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DCPage } from './dc.page';

const routes: Routes = [
  {
    path: '',
    component: DCPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DCPageRoutingModule {}
