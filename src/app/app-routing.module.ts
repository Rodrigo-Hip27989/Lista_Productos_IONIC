import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'product-list',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'product-list',
    loadChildren: () => import('./pages/product-list/product-list.module').then( m => m.ProductListPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/app-settings/app-settings.module').then( m => m.AppSettingsPageModule)
  },
  {
    path: 'settings/measurement_units',
    loadChildren: () => import('./pages/config-measure/config-measure.module').then( m => m.ConfigMeasurePageModule)
  },
  {
    path: 'export_import_data',
    loadChildren: () => import('./pages/export-import-data/export-import-data.module').then( m => m.ExportImportDataPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
