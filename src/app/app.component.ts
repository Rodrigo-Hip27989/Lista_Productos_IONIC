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
    { title: 'Listas de Compras', url: '/shopping-list', icon: 'list' },
    { title: 'Importar / Exportar Datos', url: '/export_import_data', icon: 'arrow-down' },
    { title: 'Configuraciones', url: '/settings', icon: 'settings' },
  ];
//  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  token_products_array: string = "products_array";
  token_measure_options: string = "measure_array";
  token_export_file_details: string = "file_export_details";

  constructor() {
    this.initialize_localstorage_productos();
    this.initialize_localstorage_measurement_units();
    this.initialize_localstorage_file_export_config();
  }

  private initialize_localstorage_productos(){
    if(localStorage.getItem(this.token_products_array) === null){
      localStorage.setItem(this.token_products_array, "[]");
    }
  }

  private initialize_localstorage_measurement_units(){
    if(localStorage.getItem(this.token_measure_options) === null || localStorage.getItem(this.token_measure_options) === "[]"){
      localStorage.setItem(this.token_measure_options, JSON.stringify(Producto.getMedidadDefault()));
    }
  }

  private initialize_localstorage_file_export_config(){
    if(localStorage.getItem(this.token_export_file_details) === null || localStorage.getItem(this.token_export_file_details) === "{}"){
      localStorage.setItem(this.token_export_file_details, JSON.stringify(new SimpleFile("Gastos_2022", ".csv", "Documents/Finanzas/Personales")));
    }
  }
}
