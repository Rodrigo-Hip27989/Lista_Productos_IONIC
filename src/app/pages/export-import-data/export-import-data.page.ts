import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Papa } from 'ngx-papaparse';
import { ReadFileResult } from '@capacitor/filesystem';
import { AndroidFiles } from 'src/app/funciones/android-files';
import { Messages } from 'src/app/funciones/messages';
import { Producto } from 'src/app/models/producto';
import { Productos } from 'src/app/models/productos';
import { Validations } from 'src/app/funciones/validations';

@Component({
  selector: 'app-export-import-data',
  templateUrl: './export-import-data.page.html',
  styleUrls: ['./export-import-data.page.scss'],
})

export class ExportImportDataPage implements OnInit{
  products_array: Producto[];
  products_token: string;
  path_directory: string;
  path_directory_temp: string;
  name_file: string;
  private is_mobile_platform: boolean;
  valid_path_directory;
  valid_name_file;

  constructor(private papa: Papa, private plt: Platform) {
    this.products_token = "products_array";
    this.name_file = "listaproducts";
    this.path_directory = "Toronja/ListaProductos";
    this.path_directory_temp = "Download";
    this.is_mobile_platform = false;
    this.valid_path_directory = false;
    this.valid_name_file = false;
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

  async export_products_csv(){
    const exportar_archivo = () => {
      AndroidFiles.export_file(this.papa.unparse(this.products_array), this.path_directory, `${this.name_file}.csv`);
      Messages.toast_top("Archivo exportado correctamente!");
    }
    await this.export_products(this.papa.unparse(this.products_array), this.path_directory, this.name_file, ".csv", exportar_archivo);
  }

  async export_products_json(){
    const exportar_archivo = () => {
      AndroidFiles.export_file(localStorage.getItem(this.products_token), this.path_directory, `${this.name_file}.json`);
      Messages.toast_top("Archivo exportado correctamente!");
    }
    await this.export_products(localStorage.getItem(this.products_token), this.path_directory, this.name_file, ".json", exportar_archivo);
  }

  async import_products_csv(){
    const importar_csv = async () => {
      const contents = await AndroidFiles.read_file(this.path_directory, `${this.name_file}.csv`);
      this.products_array.splice(0);
      this.products_array = this.convert_csv_to_array_products(contents);
      this.update_localstorage();
      await Messages.toast_top("Archivo importado correctamente!");
    }
    await this.import_products(this.path_directory, this.name_file, ".csv", importar_csv);
  }

  async import_products_json(){
    const importar_json = async () => {
      const contents = await AndroidFiles.read_file(this.path_directory, `${this.name_file}.json`);
      this.products_array.splice(0);
      this.products_array = JSON.parse(contents.data);
      this.update_localstorage();
      await Messages.toast_top("Archivo importado correctamente!");
    }
    await this.import_products(this.path_directory, this.name_file, ".json", importar_json);
  }

  async delete_file_products_csv(){
    this.delete_file_products(this.path_directory, this.name_file, ".csv");
  }

  async delete_file_products_json(){
    this.delete_file_products(this.path_directory, this.name_file, ".json");
  }

  async share_file_product_list_csv(){
    let recovered_data: string = this.papa.unparse(this.products_array);
    let description_msg: string = `${this.name_file} - ${this.getCurrentDate()}`;
    await this.share_file_product_list(recovered_data, this.path_directory_temp, `${this.name_file}.csv`, description_msg);
  }

  async share_file_product_list_json(){
    let recovered_data: string = localStorage.getItem(this.products_token);
    let description_msg: string = `${this.name_file} - ${this.getCurrentDate()}`;
    await this.share_file_product_list(recovered_data, this.path_directory_temp, `${this.name_file}.json`, description_msg);
  }

  // FUNCIONES PRINCIPALES

  async export_products(datos: string, ruta_carpeta: string, nombre_archivo: string, extension: string, accion_de_exportar: any){
    AndroidFiles.create_directory(this.path_directory);
    const content_directory = await AndroidFiles.read_directory(ruta_carpeta);
    if(await content_directory.files.indexOf(`${nombre_archivo}${extension}`) === -1){
      accion_de_exportar();
    }
    else{
      await Messages.alert_yes_no("File already exist!", "¿Desea reemplazar el archivo existente?", accion_de_exportar);
    }
  }

  async import_products(ruta_carpeta: string, nombre_archivo: string, extension: string, accion_de_importar: any){
    AndroidFiles.create_directory(this.path_directory);
    const content_directory = await AndroidFiles.read_directory(ruta_carpeta);
    if(await content_directory.files.indexOf(`${nombre_archivo}${extension}`) === -1){
      await Messages.alert_ok("File not found!", `\n${ruta_carpeta}/${nombre_archivo}${extension}`);
    }
    else{
      await accion_de_importar();
    }
  }

  async delete_file_products(ruta_carpeta: string, nombre_archivo: string, extension: string){
    AndroidFiles.create_directory(this.path_directory);
    const content_directory = await AndroidFiles.read_directory(ruta_carpeta);
    if(await content_directory.files.indexOf(`${nombre_archivo}${extension}`) === -1){
      await Messages.alert_ok("File not found!", `\n${ruta_carpeta}/${nombre_archivo}${extension}`);
    }
    else{
      await AndroidFiles.delete_file(ruta_carpeta, `${nombre_archivo}${extension}`);
      Messages.toast_top("Archivo eliminado");
    }
  }

  async share_file_product_list(data_to_string: string, path_file: string, full_file_name: string, description_msg: string){
    AndroidFiles.create_directory(path_file);
    await AndroidFiles.export_file(data_to_string, path_file, full_file_name);
    await AndroidFiles.share_file(path_file, full_file_name, description_msg);
    await AndroidFiles.delete_file(path_file, full_file_name);
  }

  // FUNCIONES SECUNDARIAS

  validate_path(ruta_directorio: string): void{
    let posibles_directorios: string[] = ruta_directorio.split('/');
    for(let i: number = 0; i< posibles_directorios.length; i++){
      if(Validations.regex_no_blank_space.test(posibles_directorios[i])){
        this.valid_path_directory = true;
      }
      else{
        this.valid_path_directory = false;
        Messages.toast("Solo se permiten letras!", "middle", 2500);
        break;
      }
    }
  }

  validate_name_file(ruta_archivo: string): void{
    if(Validations.regex_no_blank_space.test(ruta_archivo)){
      this.valid_name_file = true;
    }
    else{
      Messages.toast("Solo se permiten letras!", "middle", 2500);
    }
  }

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
      await Messages.alert_ok("Resultado!", `No se encontraron archivos`);
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