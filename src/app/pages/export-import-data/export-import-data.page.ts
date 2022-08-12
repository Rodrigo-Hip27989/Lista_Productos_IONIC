import { Component, OnInit } from '@angular/core';
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

export class ExportImportDataPage implements OnInit{
  products_array: Producto[];
  products_token: string;
  path_directory: string;
  name_file: string;
  private is_mobile_platform: boolean;

  constructor(private papa: Papa, private plt: Platform) {
    this.products_token = "products_array";
    this.name_file = "products_movil";
    this.path_directory = "Toronja/ListaProductos";
    this.is_mobile_platform = false;
  }

  ngOnInit(): void {
    this.products_array = JSON.parse(localStorage.getItem(this.products_token));
    if (this.plt.is('capacitor')) { // Producción
      this.is_mobile_platform = true;
      AndroidFiles.create_directory(this.path_directory);
    }
    else if(this.plt.is('desktop') || this.plt.is('mobileweb')){ //Desarrollo
      this.is_mobile_platform = false;
    }    
  }

  // FUNCIONES PRINCIPALES

  async export_products(datos: string, ruta_carpeta: string, nombre_archivo: string, extension: string){
     const exportar_archivo = () => {
      AndroidFiles.export_file(datos, ruta_carpeta, nombre_archivo, extension);
      Messages.toast_top("Archivo exportado correctamente!");
    }
    const exportar_cancelado = () => {
      Messages.toast_top("Operacion cancelada!");
    }
    const content_directory = await AndroidFiles.read_directory(ruta_carpeta);
    if(await content_directory.files.indexOf(`${nombre_archivo}${extension}`) === -1){
      exportar_archivo();
    }
    else{
      await Messages.alert_yes_no("File already exist!", "¿Desea reemplazar el archivo existente?", exportar_archivo, exportar_cancelado);
    }
  }

  async export_products_csv(){
    await this.export_products(this.papa.unparse(this.products_array), this.path_directory, this.name_file, ".csv");
  }

  async export_products_json(){
    await this.export_products(localStorage.getItem(this.products_token), this.path_directory, this.name_file, ".json");
  }

  async import_products(ruta_carpeta: string, nombre_archivo: string, extension: string){
    const content_directory = await AndroidFiles.read_directory(ruta_carpeta);
    if(await content_directory.files.indexOf(`${nombre_archivo}${extension}`) === -1){
      await Messages.alert_ok("File not found!", `\n${ruta_carpeta}/${nombre_archivo}${extension}!`);
    }
    else{
      const contents = await AndroidFiles.read_file(ruta_carpeta, nombre_archivo, extension);
      if(extension === ".csv"){
        this.products_array.splice(0);
        this.products_array = this.convert_csv_to_array_products(contents);
        this.update_localstorage();
        await Messages.toast_top("Archivo importado correctamente!");
      }
      else if(extension === ".json"){
        this.products_array.splice(0);
        this.products_array = JSON.parse(contents.data);
        this.update_localstorage();
        await Messages.toast_top("Archivo importado correctamente!");
      }
      else{
        await Messages.alert_ok("Aviso", `El tipo de archivo <strong>${extension}</strong> no esta soportado!`);
      }
    }
  }

  async import_products_csv(){
    await this.import_products(this.path_directory, this.name_file, ".csv");
  }

  async import_products_json(){
    await this.import_products(this.path_directory, this.name_file, ".json");
  }

  async delete_file_products(ruta_carpeta: string, nombre_archivo: string, extension: string){
    const content_directory = await AndroidFiles.read_directory(ruta_carpeta);
    if(await content_directory.files.indexOf(`${nombre_archivo}${extension}`) === -1){
      await Messages.alert_ok("File not found!", `\n${ruta_carpeta}/${nombre_archivo}${extension}!`);
    }
    else{
      await AndroidFiles.delete_file(ruta_carpeta, nombre_archivo, extension);
      Messages.toast_top("Archivo eliminado");
    }
  }

  async delete_file_products_csv(){
    this.delete_file_products(this.path_directory, this.name_file, ".csv");
  }

  async delete_file_products_json(){
    this.delete_file_products(this.path_directory, this.name_file, ".json");
  }

  async share_file_product_list(datos: string, directorio_descarga: string, nombre_archivo: string, extension: string){
    let description: string = `${nombre_archivo} - ${this.getCurrentDate()}`;
    // Descarga temporal del archivo en la ruta especificada
    await AndroidFiles.export_file(datos, directorio_descarga, nombre_archivo, extension);
    // Obtener ruta del archivo descargado
    const full_path = await AndroidFiles.get_uri(directorio_descarga);
    await Share.share({
      title: description,
      text: description,
      url: full_path.uri+'/'+nombre_archivo+extension,
      dialogTitle: 'Compartir',
    });
    // Se elimina la descarga temporal del archivo en la ruta especificada
    await AndroidFiles.delete_file(directorio_descarga, nombre_archivo, extension);
  }

  async share_file_product_list_csv(){
    let datos: string = this.papa.unparse(this.products_array);
    this.share_file_product_list(datos, "Download", this.name_file, ".csv");
  }

  async share_file_product_list_json(){
    let datos: string = localStorage.getItem(this.products_token);
    this.share_file_product_list(datos, "Download", this.name_file, ".json");
  }

  // FUNCIONES SECUNDARIAS

  private update_localstorage(){
    localStorage.setItem(this.products_token, JSON.stringify(this.products_array));
  }

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

  public export_products_json_desktop(){
    AndroidFiles.export_file_desktop(localStorage.getItem(this.products_token), `${this.name_file} - ${this.getCurrentDate()}`, ".json");
    Messages.toast_top("Archivo descargado (desktop)");
  }

  async ver_archivos_y_directorios(){
    const content_directory = await AndroidFiles.read_directory(this.path_directory);
    let list_of_files: string[] = content_directory.files;
    if(list_of_files.length === 0){
      await Messages.alert_ok("Resultado!", `No se encontraron archivo`);
    }
    else{
      for(let i: number = 0; i<list_of_files.length; i++){
        const info_file = await AndroidFiles.about_file(`${this.path_directory}/${list_of_files[i]}`);;
        await Messages.alert_ok(`File [${i}]: ${list_of_files[i]}`, `${info_file.type}\n${info_file.size}\n${info_file.mtime}\n${info_file.uri}`);
      }
    }
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
}