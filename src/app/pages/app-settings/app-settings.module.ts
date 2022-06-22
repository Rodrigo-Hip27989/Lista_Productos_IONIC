import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AppSettingsPageRoutingModule } from './app-settings-routing.module';
import { AppSettingsPage } from './app-settings.page';

import { ConfigMeasureComponent } from '../../components/config-measure/config-measure.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AppSettingsPageRoutingModule
  ],
  declarations: [AppSettingsPage, ConfigMeasureComponent]
})
export class AppSettingsPageModule {}
