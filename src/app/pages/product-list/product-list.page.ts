import { Component, OnInit } from '@angular/core';
import { Messages } from 'src/app/funciones/messages';
import { Producto } from 'src/app/models/producto';
import { LStorageData } from 'src/app/funciones/local_storage';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.page.html',
  styleUrls: ['./product-list.page.scss'],
})

export class ProductListPage implements OnInit {
  can_add_item: boolean;
  products:Producto[] = [];
  selected_product !: Producto;

  constructor() {
    this.can_add_item = false;
    this.products = LStorageData.getProductsArray();
  }

  private calcular_costo_total(): number{
    let costo_total: number = 0;
    this.products.forEach(product => {
      costo_total += product.precio_total;
    });
    return costo_total;
  }
  
  ngOnInit() { }

  add_product(validated_product: Producto): void{
    this.products.push(validated_product);
    LStorageData.setProductsArray(this.products)
    Messages.toast_middle("Se ha agregado correctamente "+validated_product.nombre.toString());
  }

  update_product(validated_product: Producto): void{
    this.products[this.products.indexOf(this.selected_product)] = validated_product;
    LStorageData.setProductsArray(this.products)
    this.unselect_product();
    Messages.toast_middle("Se ha actualizado correctamente "+validated_product.nombre.toString());
  }

  delete_product(): void{
    let deleted_items: Producto[] = this.products.splice(this.products.indexOf(this.selected_product), 1);
    LStorageData.setProductsArray(this.products)
    this.unselect_product();
    Messages.toast_middle("Se ha eliminado correctamente "+deleted_items[0].nombre);
  }

  delete_all_products(): void{
    this.products.splice(0);
    LStorageData.setProductsArray(this.products)
    this.unselect_product();
    Messages.toast_middle("Se han eliminado todos los productos");
  }

  switch_can_add_item(){
    this.can_add_item = !(this.can_add_item);
  }

  select_product(product: Producto): void{
    this.selected_product = product;
    this.can_add_item = false;
  }

  unselect_product(): void{
    let undefined_product:Producto;
    this.selected_product = undefined_product;
  }

  async delete_product_alert(){
    const opcion_si = () => { this.delete_product() };
    await Messages.alert_yes_no("Borrando Elemento", `¿Realmente quiere eliminar ${this.selected_product.nombre}?`, opcion_si);
  }

  async delete_all_products_alert(){
    const opcion_si = () => { this.delete_all_products() };
    await Messages.alert_yes_no("Eliminando Todo", "¿Realmente quiere borrar todos los productos?", opcion_si);
  }
}
