import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfigMeasurePage } from './config-measure.page';

const routes: Routes = [
  {
    path: '',
    component: ConfigMeasurePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfigMeasurePageRoutingModule {}
