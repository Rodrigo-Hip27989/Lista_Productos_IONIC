import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormShoppingListPageRoutingModule } from './form-shopping-list-routing.module';

import { FormShoppingListPage } from './form-shopping-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormShoppingListPageRoutingModule
  ],
  declarations: [FormShoppingListPage]
})
export class FormShoppingListPageModule {}
