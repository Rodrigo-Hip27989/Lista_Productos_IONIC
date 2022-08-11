import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfigMeasurePageRoutingModule } from './config-measure-routing.module';

import { ConfigMeasurePage } from './config-measure.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfigMeasurePageRoutingModule
  ],
  declarations: [ConfigMeasurePage]
})
export class ConfigMeasurePageModule {}
