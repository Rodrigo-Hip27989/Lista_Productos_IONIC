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
  can_add_item: boolean;
  products_token: string = "products_array";
  products:Producto[] = [];
  selected_product !: Producto;
  summary_products !: Producto;

  constructor(public alertController: AlertController) {
    this.can_add_item = false;
    this.inicializarLocalStorage();
    this.products = JSON.parse(localStorage.getItem(this.products_token));
    this.initialize_summary_products();
  }

  private inicializarLocalStorage(){
    if(localStorage.getItem(this.products_token) === null){
      localStorage.setItem(this.products_token, "[]");
    }
  }

  private initialize_summary_products(){
    this.summary_products = new Producto("Productos", this.products.length, "Tipos");
    this.summary_products.precio_total = this.calcular_costo_total();
  }

  ngOnInit() { }

  add_product(validated_product: Producto): void{
    this.products.push(validated_product);
    localStorage.setItem(this.products_token, JSON.stringify(this.products));
    Messages.toast("Se ha agregado correctamente "+validated_product.nombre.toString());
    this.update_summary_products();
  }

  update_product(validated_product: Producto): void{
    this.products[this.products.indexOf(this.selected_product)] = validated_product;
    localStorage.setItem(this.products_token, JSON.stringify(this.products));
    Messages.toast("Se ha actualizado correctamente "+validated_product.nombre.toString());
    this.unselect_product();
    this.update_summary_products();
  }

  delete_product(): void{
    let deleted_items: Producto[] = this.products.splice(this.products.indexOf(this.selected_product), 1);
    localStorage.setItem(this.products_token, JSON.stringify(this.products));
    Messages.toast("Se ha eliminado correctamente "+deleted_items[0].nombre);
    this.unselect_product();
    this.update_summary_products();
  }

  delete_all_products(): void{
    this.products.splice(0);
    localStorage.setItem(this.products_token, JSON.stringify(this.products));
    Messages.toast("Se han eliminado todos los producos ");
    this.unselect_product();
    this.update_summary_products();
  }

  update_summary_products(){
    this.summary_products.cantidad = this.products.length;
    this.summary_products.precio_total = this.calcular_costo_total();
    console.log(this.summary_products.toString());
  }

  calcular_costo_total(): number{
    let costo_total: number = 0;
    this.products.forEach(product => {
      costo_total += product.precio_total;
    });
    return costo_total;
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
