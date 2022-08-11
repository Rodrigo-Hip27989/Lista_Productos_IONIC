import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExportImportDataPageRoutingModule } from './export-import-data-routing.module';

import { ExportImportDataPage } from './export-import-data.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExportImportDataPageRoutingModule
  ],
  declarations: [ExportImportDataPage]
})
export class ExportImportDataPageModule {}
