import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Papa } from 'ngx-papaparse';
import { ReadFileResult } from '@capacitor/filesystem';
import { AndroidFiles } from 'src/app/funciones/android-files';
import { Messages } from 'src/app/funciones/messages';
import { Producto } from 'src/app/models/producto';
import { Productos } from 'src/app/models/productos';
import { Share } from '@capacitor/share';

@Component({
  selector: 'app-export-import-data',
  templateUrl: './export-import-data.page.html',
  styleUrls: ['./export-import-data.page.scss'],
})

export class ExportImportDataPage {
  products_array: Producto[];
  products_token: string = "products_array";
  path_directory: string;
  name_file: string;
  private is_mobile_platform: boolean;

  constructor(private papa: Papa, private plt: Platform) {
    this.name_file = "products_movil";
    this.path_directory = "Toronja/Worksheet";
    this.products_array = JSON.parse(localStorage.getItem(this.products_token));
    if (this.plt.is('capacitor')) { // Producción
      this.is_mobile_platform = true;
    }
    else if(this.plt.is('desktop') || this.plt.is('mobileweb')){ //Desarrollo
      this.is_mobile_platform = false;
    }
  }

  private update_localstorage(){
    localStorage.setItem(this.products_token, JSON.stringify(this.products_array));
  }

  // FUNCIONES PRINCIPALES - PARA CSV

  async export_products_csv(){
     const exportar_archivo = () => {
      AndroidFiles.export_file(this.papa.unparse(this.products_array), this.path_directory, this.name_file, ".csv");
      Messages.toast_top("Archivo exportado correctamente!");
    }
    const exportar_cancelado = () => {
      Messages.toast_top("Operacion cancelada!");
    }
    const content_directory = await AndroidFiles.read_directory(this.path_directory);
    if(await content_directory.files.indexOf(`${this.name_file}.csv`) === -1){
      exportar_archivo();
    }
    else{
      await Messages.alert_yes_no("File already exist!", "¿Desea reemplazar el archivo existente?", exportar_archivo, exportar_cancelado);
    }
  }

  async import_products_csv(){
    const content_directory = await AndroidFiles.read_directory(this.path_directory);
    if(await content_directory.files.indexOf(`${this.name_file}.csv`) === -1){
      await Messages.alert_ok("File not found!", `\n${this.path_directory}/${this.name_file}.csv!`);
    }
    else{
      const contents = await AndroidFiles.read_file(this.path_directory, this.name_file, ".csv");
      this.products_array.splice(0);
      this.products_array = this.convert_csv_to_array_products(contents);
      this.update_localstorage();
      await Messages.toast_top("Archivo importado correctamente!");
    }
  }

  async delete_file_products_csv(){
    const content_directory = await AndroidFiles.read_directory(this.path_directory);
    if(await content_directory.files.indexOf(`${this.name_file}.csv`) === -1){
      await Messages.alert_ok("File not found!", `\n${this.path_directory}/${this.name_file}.csv!`);
    }
    else{
      await AndroidFiles.delete_file(this.path_directory, this.name_file, ".csv");
      Messages.toast_top("Archivo eliminado");
    }
  }

  async share_file_product_list_csv(){
    let directory_temp: string = "Download";
    let description: string = `${this.name_file} - ${this.getCurrentDate()}`;
    // Descarga temporal del archivo
    await AndroidFiles.export_file(this.papa.unparse(this.products_array), directory_temp, this.name_file, ".csv");
    // Obtener ruta del archivo descargado
    const full_path = await AndroidFiles.get_uri(directory_temp);
    await Share.share({
      title: description,
      text: description,
      url: full_path.uri+'/'+this.name_file+'.csv',
      dialogTitle: 'Compartir',
    });
    await AndroidFiles.delete_file(directory_temp, this.name_file, ".csv");
  }

  //FUNCIONES INTERNAS

  private getCurrentDate(): string{
    let fechaObj: Date = new Date();
    let obtener_hora: string = `${fechaObj.getHours()}.${fechaObj.getMinutes()}.${fechaObj.getSeconds()}`;
    let obtener_fecha: string = `${fechaObj.toDateString()} - ${obtener_hora}`;
    return obtener_fecha;
  }

  private convert_csv_to_array_products(contents: ReadFileResult): Producto[]{
    // Guarda las cabeceras y los datos del contenido recibido
    let data_csv_headerRow: string[] = [];
    let data_csv_body: string[][] = [];

    this.papa.parse(contents.data, {
      complete: parsedData => {
        data_csv_headerRow = parsedData.data.splice(0, 1)[0];
        data_csv_body = parsedData.data;
      }
    });
    return Productos.convert_array_str_to_array_products(data_csv_body);
  }

  // FUNCIONES PARA TESTING

  public export_products_csv_desktop(){
    AndroidFiles.export_file_desktop(this.papa.unparse(this.products_array), `${this.name_file} - ${this.getCurrentDate()}`, ".csv");
    Messages.toast_top("Archivo descargado (desktop)");
  }

  /*   public check_platform(){
    const plataformas: any[] = ['android', 'ios', 'ipad', 'iphone', 'tablet', 'electron', 'pwa', 'mobile', 'mobileweb', 'desktop', 'hybrid', 'cordova', 'capacitor'];

    for(let i: number = 0; i<plataformas.length; i++){
      if (this.plt.is(plataformas[i])) {
        alert(`You are USING ==> ${plataformas[i]}`);
      }
      else{
        alert(`You are NOT using ==> ${plataformas[i]}`);
      }
    }
  }
 */

  public export_products_json_desktop(){
    AndroidFiles.export_file_desktop(localStorage.getItem(this.products_token), `${this.name_file} - ${this.getCurrentDate()}`, ".json");
    Messages.toast_top("Archivo descargado (desktop)");
  }

}