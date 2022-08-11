import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExportImportDataPage } from './export-import-data.page';

const routes: Routes = [
  {
    path: '',
    component: ExportImportDataPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExportImportDataPageRoutingModule {}
