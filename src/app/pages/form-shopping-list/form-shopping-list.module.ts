import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FormShoppingListPageRoutingModule } from './form-shopping-list-routing.module';
import { FormShoppingListPage } from './form-shopping-list.page';
import { DatePickerComponent } from 'src/app/components/date-picker/date-picker.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    FormShoppingListPageRoutingModule
  ],
  declarations: [FormShoppingListPage, 
    DatePickerComponent
  ]
})
export class FormShoppingListPageModule {}
