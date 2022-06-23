import { Component } from '@angular/core';
import { Producto } from './models/producto';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Lista Productos', url: '/product-list', icon: 'list' },
    { title: 'Configuraciones', url: '/app-settings', icon: 'settings' },
  ];
//  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  products_token: string = "products_array";
  options_measure_token: string = "measure_array";

  constructor() {
    this.initialize_localstorage_productos();
    this.initialize_localstorage_measurement_units();
  }

  private initialize_localstorage_productos(){
    if(localStorage.getItem(this.products_token) === null){
      localStorage.setItem(this.products_token, "[]");
    }
  }

  private initialize_localstorage_measurement_units(){
    if(localStorage.getItem(this.options_measure_token) === null || localStorage.getItem(this.options_measure_token) === "[]"){
      localStorage.setItem(this.options_measure_token, JSON.stringify(Producto.getMedidadDefault()));
    }
  }

}
