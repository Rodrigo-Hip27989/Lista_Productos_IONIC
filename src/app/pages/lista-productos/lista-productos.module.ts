import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ListaProductosPageRoutingModule } from './lista-productos-routing.module';
import { ListaProductosPage } from './lista-productos.page';

import { ValidationReactiveProductComponent } from '../../components/validation-reactive-product/validation-reactive-product.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ListaProductosPageRoutingModule
  ],
  declarations: [ListaProductosPage, ValidationReactiveProductComponent]
})
export class ListaProductosPageModule {}