import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormShoppingListPage } from './form-shopping-list.page';

const routes: Routes = [
  {
    path: '',
    component: FormShoppingListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormShoppingListPageRoutingModule {}
