import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ShoppingListPageRoutingModule } from './shopping-list-routing.module';
import { ShoppingListPage } from './shopping-list.page';

import { FormShoppingListComponent } from 'src/app/components/form-shopping-list/form-shopping-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShoppingListPageRoutingModule
  ],
  declarations: [ShoppingListPage, 
    FormShoppingListComponent
  ]
})
export class ShoppingListPageModule {}
