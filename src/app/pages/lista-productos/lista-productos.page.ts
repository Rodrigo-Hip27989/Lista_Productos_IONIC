import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Messages } from 'src/app/funciones-utiles/messages';
import { Producto } from 'src/app/models/producto'; 

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.page.html',
  styleUrls: ['./lista-productos.page.scss'],
})

export class ListaProductosPage implements OnInit {
  products:Producto[] = [];
  selected_product !: Producto;
  empty_product !: Producto;
  can_add_item: boolean;
  products_token: string = "products_array";

  constructor(public alertController: AlertController) {
    this.can_add_item = false;
    this.empty_product = new Producto("", 0, "", 0);
    this.inicializarLocalStorage();
    this.products = JSON.parse(localStorage.getItem(this.products_token));
  }

  ngOnInit() { }

  add_product(validated_product: Producto): void{
    this.products.push(validated_product);
    localStorage.setItem(this.products_token, JSON.stringify(this.products));
    Messages.toast("Se ha agregado correctamente "+validated_product.nombre.toString());
  }

  update_product(validated_product: Producto): void{
    this.products[this.products.indexOf(this.selected_product)] = validated_product;
    localStorage.setItem(this.products_token, JSON.stringify(this.products));
    this.unselect_product();
    Messages.toast("Se ha actualizado correctamente "+validated_product.nombre.toString());
  }

  delete_product(): void{
    let deleted_items: Producto[] = this.products.splice(this.products.indexOf(this.selected_product), 1);
    localStorage.setItem(this.products_token, JSON.stringify(this.products));
    this.unselect_product();
    Messages.toast("Se ha eliminado correctamente "+deleted_items[0].nombre);
  }

  delete_all_products(): void{
    this.products.splice(0);
    localStorage.setItem(this.products_token, JSON.stringify(this.products));
    this.unselect_product();
    Messages.toast("Se han eliminado todos los producos ");
  }

  calcular_costo_total(): number{
    let costo_total: number = 0;
    this.products.forEach(product => {
      costo_total += product.precio_total;
    });
    return costo_total;
  }

  private inicializarLocalStorage(){
    if(localStorage.getItem(this.products_token) === null){
      localStorage.setItem(this.products_token, "[]");
    }
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
    const alert = await this.alertController.create({
      header: "Borrar Elemento", 
      message: "¿Realmente quiere eliminar este producto?",
      buttons: [
        { text: 'NO', handler: () => { Messages.toast("Eliminación cancelada"); }},
        { text: 'SI', handler: () => { this.delete_product(); } }
      ],
    });
    await alert.present();
//    let result = await alert.onDidDismiss();
//    console.log("Resultado: ", result);
  }

  async delete_all_products_alert(){
    const alert = await this.alertController.create({
      header: "Borrar Todos", 
      message: "¿Realmente quiere borrar todos los productos?",
      buttons: [
        { text: 'NO', handler: () => { Messages.toast("Eliminación cancelada"); }},
        { text: 'SI', handler: () => { this.delete_all_products(); } }
      ],
    });
    await alert.present();
//    let result = await alert.onDidDismiss();
//    console.log("Resultado: ", result);
  }
}
