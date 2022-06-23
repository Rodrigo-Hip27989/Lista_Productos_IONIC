import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Messages } from 'src/app/funciones-utiles/messages';
import { Validations } from 'src/app/funciones-utiles/validations';
import { Producto } from 'src/app/models/producto';

@Component({
  selector: 'app-config-measure',
  templateUrl: './config-measure.component.html',
  styleUrls: ['./config-measure.component.scss'],
})

export class ConfigMeasureComponent implements OnInit {
  measure_token: string = "measure_array";
  measures_array: string[];
  selected_measure !: string;
  textbox_binding: string;
  textbox_valid: boolean;

  constructor(public alertController: AlertController) { 
    this.textbox_binding = "";
    this.textbox_valid = false;
    this.inicializarLocalStorage();
    this.measures_array = JSON.parse(localStorage.getItem(this.measure_token));
  }

  private inicializarLocalStorage(){
    if(localStorage.getItem(this.measure_token) === null){
      localStorage.setItem(this.measure_token, "[]");
    }
  }
  
  ngOnInit() {}

  private update_localstorage(){
    localStorage.setItem(this.measure_token, JSON.stringify(this.measures_array));
  }

  validar_textbox(textbox: string): void{
    if(Validations.texto(textbox)){
      if(this.measures_array.indexOf(textbox)>=0){
        this.textbox_valid = false;
        Messages.toast_bottom("Ese nombre ya se esta usando");
      }
      else{
        this.textbox_valid = true;
      }
    }
    else{
      this.textbox_valid = false;
      Messages.toast_bottom("Solo se permiten letras");
    }
  }

  add_product(measure : string): void{
    this.measures_array.push(measure);
    this.measures_array = this.measures_array.sort();
    Messages.toast_middle("Se ha agregado correctamente "+measure);
    this.update_localstorage();
    this.restore_textbox();
  }

  update_product(measure: string): void{
    this.measures_array[this.measures_array.indexOf(this.selected_measure)] = measure;
    this.measures_array = this.measures_array.sort();
    Messages.toast_middle("Se ha actualizado correctamente "+measure);
    this.update_localstorage();
    this.restore_textbox();
  }

  delete_product(item: string): void{
    let deleted_items: string[] = this.measures_array.splice(this.measures_array.indexOf(item), 1);
    Messages.toast_middle("Se ha eliminado correctamente "+deleted_items[0]);
    this.update_localstorage();
    this.restore_textbox();
  }

  select_measure(measure: string): void{
    this.selected_measure = measure;
    this.textbox_binding = this.selected_measure;
  }

  restore_textbox(){
    this.textbox_binding = "";
    this.selected_measure = "";
  }

  restore_measure_default(){
    this.measures_array = Producto.getMedidadDefault();
    localStorage.setItem(this.measure_token, JSON.stringify(Producto.getMedidadDefault()));
  }

  async restore_measure_default_alert(){
    const alert = await this.alertController.create({
      header: "Restablecer", 
      message: "¿Realmente quiere restablecer a las medidas por defecto?",
      buttons: [
        { text: 'NO', handler: () => { Messages.toast_bottom("Operación cancelada"); }},
        { text: 'SI', handler: () => { this.restore_measure_default(); } }
      ],
    });
    await alert.present();
  }

  delete_all_measures(){
    this.measures_array = [];
    localStorage.setItem(this.measure_token, JSON.stringify(this.measures_array));
  }

  async delete_all_measures_alert(){
    const alert = await this.alertController.create({
      header: "Borrar Todos", 
      message: "¿Realmente quiere borrar todos las medidas?",
      buttons: [
        { text: 'NO', handler: () => { Messages.toast_bottom("Eliminación cancelada"); }},
        { text: 'SI', handler: () => { this.delete_all_measures(); } }
      ],
    });
    await alert.present();
  }
}
