import { Component } from '@angular/core';
import { Producto } from './models/producto';
import { SimpleFile } from './models/simple_file';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Calcular Gastos', url: '/product-list', icon: 'calculator' },
//    { title: 'Listas de Gastos', url: '/product-list', icon: 'list' },
    { title: 'Importar / Exportar Datos', url: '/export_import_data', icon: 'arrow-down' },
    { title: 'Configuraciones', url: '/settings', icon: 'settings' },
  ];
//  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  products_token: string = "products_array";
  options_measure_token: string = "measure_array";
  token_file_config_export: string = "file_config_export";

  constructor() {
    this.initialize_localstorage_productos();
    this.initialize_localstorage_measurement_units();
    this.initialize_localstorage_file_export_config();
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

  private initialize_localstorage_file_export_config(){
    if(localStorage.getItem(this.token_file_config_export) === null || localStorage.getItem(this.token_file_config_export) === "{}"){
      localStorage.setItem(this.token_file_config_export, JSON.stringify(new SimpleFile("Miscelanea", ".csv", "Toronja/Finanzas")));
    }
  }
}
