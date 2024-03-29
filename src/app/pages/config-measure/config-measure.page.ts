import { Component, OnInit } from '@angular/core';
import { Messages } from 'src/app/funciones/messages';
import { Validations } from 'src/app/funciones/validations';
import { Producto } from 'src/app/models/producto';

@Component({
  selector: 'app-config-measure',
  templateUrl: './config-measure.page.html',
  styleUrls: ['./config-measure.page.scss'],
})

export class ConfigMeasurePage implements OnInit {
  measure_token: string = "measure_array";
  measures_array: string[];
  selected_measure !: string;
  textbox_binding: string;
  textbox_valid: boolean;

  constructor() { 
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
    this.textbox_valid = false;
    if(Validations.texto(textbox)){
      if(this.measures_array.indexOf(textbox)>=0){
        Messages.toast(`El nombre ${this.textbox_binding} ya esta en uso`, "middle", 2500);
      }
      else{
        this.textbox_valid = true;
      }
    }
    else{
      Messages.toast("Solo se permiten letras!", "middle", 2500);
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

  async restore_measure_default_alert(){
    const opcion_si = () => { this.restore_measure_default(); }
    await Messages.alert_yes_no("Restablecer Medidas", "¿Desea continuar?", opcion_si);
  }

  restore_measure_default(){
    this.measures_array = Producto.getMedidadDefault();
    localStorage.setItem(this.measure_token, JSON.stringify(Producto.getMedidadDefault()));
  }

  async delete_all_measures_alert(){
    const opcion_si = () => { this.delete_all_measures(); }
    await Messages.alert_yes_no("Borrar Medidas", "¿Desea continuar?", opcion_si);
  }

  delete_all_measures(){
    this.measures_array = [];
    localStorage.setItem(this.measure_token, JSON.stringify(this.measures_array));
  }
}
