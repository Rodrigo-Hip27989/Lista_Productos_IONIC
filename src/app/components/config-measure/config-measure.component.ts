import { Component, OnInit } from '@angular/core';
import { Messages } from 'src/app/funciones-utiles/messages';

@Component({
  selector: 'app-config-measure',
  templateUrl: './config-measure.component.html',
  styleUrls: ['./config-measure.component.scss'],
})
export class ConfigMeasureComponent implements OnInit {
  measure_token: string = "measure_array";
  measures_array: string[];
  selected_measure !: string;
  textbox_binding = "";

  constructor() { 
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

  add_product(measure : string): void{
    if(this.measures_array.indexOf(measure)>=0){
      Messages.toast_middle("Ya existe un elemento con el mismo nombre");
    }
    else{
      this.measures_array.push(measure);
      this.measures_array = this.measures_array.sort();
      this.restore_textbox();
      this.update_localstorage();
      Messages.toast_middle("Se ha agregado correctamente ");
    }
  }

  update_product(measure: string): void{
    this.measures_array[this.measures_array.indexOf(this.selected_measure)] = measure;
    this.measures_array = this.measures_array.sort();
    this.restore_textbox();
    this.update_localstorage();
    Messages.toast_middle("Se ha actualizado correctamente "+measure);
  }

  delete_product(item: string): void{
    let deleted_items: string[] = this.measures_array.splice(this.measures_array.indexOf(item), 1);
    this.restore_textbox();
    this.update_localstorage();
    Messages.toast_middle("Se ha eliminado correctamente "+deleted_items[0]);
  }

  select_measure(measure: string): void{
    this.selected_measure = measure;
    this.textbox_binding = this.selected_measure;
  }

  restore_textbox(){
    this.textbox_binding = "";
    this.selected_measure = "";
  }

  clear_textbox(){
    this.textbox_binding = "";
  }

}
