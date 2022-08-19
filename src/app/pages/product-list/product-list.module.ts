import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProductListPageRoutingModule } from './product-list-routing.module';
import { ProductListPage } from './product-list.page';

import { ValidationReactiveProductComponent } from '../../components/validation-reactive-product/validation-reactive-product.component';
import { GridRowProductComponent } from '../../components/grid-row-product/grid-row-product.component';
import { GridRowProductHeaderComponent } from '../../components/grid-row-product-header/grid-row-product-header.component'; 
import { DatePickerComponent } from 'src/app/components/date-picker/date-picker.component'; 

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ProductListPageRoutingModule
  ],
  declarations: [
    ProductListPage, 
    ValidationReactiveProductComponent, 
    GridRowProductComponent, 
    GridRowProductHeaderComponent, 
    DatePickerComponent]
})
export class ProductListPageModule {}
