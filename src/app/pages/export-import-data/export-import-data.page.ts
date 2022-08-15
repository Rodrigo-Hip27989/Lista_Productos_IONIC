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
  file_name: string;
  file_directory: string;
  //Centinelas
  valid_file_name;
  valid_file_directory;
  private is_mobile_platform: boolean;
  //Tokens para recuperar del localstorage
  token_products_array: string;
  token_file_name: string;
  token_file_directory: string;

  constructor(private papa: Papa, private plt: Platform) {
    //Centinelas
    this.valid_file_directory = true;
    this.valid_file_name = true;
    this.is_mobile_platform = false;
    //Tokens para recuperar del localstorage
    this.token_products_array = "products_array";
    this.token_file_name = "file_name";
    this.token_file_directory = "file_directory";
    //Ruta de archivo(s)
    this.file_name = localStorage.getItem(this.token_file_name);
    this.file_directory = localStorage.getItem(this.token_file_directory);
  }

  ngOnInit(): void {
    this.products_array = JSON.parse(localStorage.getItem(this.token_products_array));
    if (this.plt.is('capacitor')) { // Producción
      this.is_mobile_platform = true;
      AndroidFiles.create_directory(this.file_directory);
    }
    else if(this.plt.is('desktop') || this.plt.is('mobileweb')){ //Desarrollo
      this.is_mobile_platform = false;
    }
  }

  // FUNCIONES PRINCIPALES

  async export_products_csv(){
    const exportar_csv = () => {
      AndroidFiles.export_file(this.papa.unparse(this.products_array), this.file_directory, `${this.file_name}.csv`);
      Messages.toast_top("Archivo exportado correctamente!");
    }
    await this.export_any_file(this.file_directory, `${this.file_name}.csv`, exportar_csv);
  }

  async export_products_json(){
    const exportar_json = () => {
      AndroidFiles.export_file(localStorage.getItem(this.token_products_array), this.file_directory, `${this.file_name}.json`);
      Messages.toast_top("Archivo exportado correctamente!");
    }
    await this.export_any_file(this.file_directory, `${this.file_name}.json`, exportar_json);
  }

  async import_products_csv(){
    const importar_csv = async () => {
      const contents = await AndroidFiles.read_file(this.file_directory, `${this.file_name}.csv`);
      this.products_array.splice(0);
      this.products_array = this.convert_csv_to_array_products(contents);
      this.update_localstorage_array_productos();
      await Messages.toast_top("Archivo importado correctamente!");
    }
    await this.import_any_file(this.file_directory, `${this.file_name}.csv`, importar_csv);
  }

  async import_products_json(){
    const importar_json = async () => {
      const contents = await AndroidFiles.read_file(this.file_directory, `${this.file_name}.json`);
      this.products_array.splice(0);
      this.products_array = JSON.parse(contents.data);
      this.update_localstorage_array_productos();
      await Messages.toast_top("Archivo importado correctamente!");
    }
    await this.import_any_file(this.file_directory, `${this.file_name}.json`, importar_json);
  }

  async delete_file_products_csv(){
    this.delete_any_file(this.file_directory, `${this.file_name}.csv`);
  }

  async delete_file_products_json(){
    this.delete_any_file(this.file_directory, `${this.file_name}.json`);
  }

  async share_file_product_list_csv(){
    let recovered_data_csv: string = this.papa.unparse(this.products_array);
    let new_file_name: string = `${this.file_name}__${this.getLocalDate()}`;
    await this.share_any_file(this.file_directory, `${new_file_name}.csv`, this.file_name, recovered_data_csv);
  }

  async share_file_product_list_json(){
    let recovered_data_json: string = localStorage.getItem(this.token_products_array);
    let new_file_name: string = `${this.file_name}__${this.getLocalDate()}`;
    await this.share_any_file(this.file_directory, `${new_file_name}.json`, this.file_name, recovered_data_json);
  }

  // FUNCIONES PRINCIPALES

  async export_any_file(file_directory: string, full_file_name: string, accion_de_exportar: any){
    AndroidFiles.create_directory(file_directory);
    const content_directory = await AndroidFiles.read_directory(file_directory);
    if(await content_directory.files.indexOf(full_file_name) === -1){
      accion_de_exportar();
    }
    else{
      await Messages.alert_yes_no("File already exist!", "¿Desea reemplazar el archivo existente?", accion_de_exportar);
    }
  }

  async import_any_file(file_directory: string, full_file_name: string, accion_de_importar: any){
    AndroidFiles.create_directory(file_directory);
    const content_directory = await AndroidFiles.read_directory(file_directory);
    if(await content_directory.files.indexOf(full_file_name) === -1){
      await Messages.alert_ok("File not found!", `\n${file_directory}/${full_file_name}`);
    }
    else{
      await Messages.alert_yes_no("Aviso!", "¿Desea reemplazar sus datos actuales?", accion_de_importar);
    }
  }

  async delete_any_file(file_directory: string, full_file_name: string){
    AndroidFiles.create_directory(this.file_directory);
    const content_directory = await AndroidFiles.read_directory(file_directory);
    if(await content_directory.files.indexOf(full_file_name) === -1){
      await Messages.alert_ok("File not found!", `\n${file_directory}/${full_file_name}`);
    }
    else{
      await AndroidFiles.delete_file(file_directory, full_file_name);
      Messages.toast_top("Archivo eliminado");
    }
  }

  async share_any_file(file_directory: string, full_file_name: string, description_msg: string, data_to_string: string){
    AndroidFiles.create_directory(file_directory);
    await AndroidFiles.export_file(data_to_string, file_directory, full_file_name);
    await AndroidFiles.share_file(file_directory, full_file_name, description_msg);
    await AndroidFiles.delete_file(file_directory, full_file_name);
  }

  // FUNCIONES SECUNDARIAS

  private update_localstorage_array_productos(){
    localStorage.setItem(this.token_products_array, JSON.stringify(this.products_array));
  }

  private update_localstorage_routes(){
    localStorage.setItem(this.token_file_name, this.file_name);
    localStorage.setItem(this.token_file_directory, this.file_directory);
    Messages.toast_middle("Ruta de archivos Actualizada!");
  }

  validate_path(ruta_directorio: string): void{
    let posibles_directorios: string[] = ruta_directorio.split('/');
    for(let i: number = 0; i< posibles_directorios.length; i++){
      if(Validations.regex_no_blank_space.test(posibles_directorios[i])){
        this.valid_file_directory = true;
      }
      else{
        this.valid_file_directory = false;
        Messages.toast("No se permite espacios en blanco ni caracteres especiales!", "middle", 2500);
        break;
      }
    }
  }

  validate_name_file(ruta_archivo: string): void{
    if(Validations.regex_no_blank_space.test(ruta_archivo)){
      this.valid_file_name = true;
    }
    else{
      this.valid_file_name = false;
      Messages.toast("No se permite espacios en blanco ni caracteres especiales!", "middle", 2500);
    }
  }

  private getLocalDate(): string{
    return (new Date()).toDateString().replace(/ /g, "_");
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
    AndroidFiles.export_file_desktop(this.papa.unparse(this.products_array), `${this.file_name}__${this.getLocalDate()}`, ".csv");
    Messages.toast_top("Archivo descargado (desktop)");
  }

  public export_products_json_desktop(){
    AndroidFiles.export_file_desktop(localStorage.getItem(this.token_products_array), `${this.file_name}__${this.getLocalDate()}`, ".json");
    Messages.toast_top("Archivo descargado (desktop)");
  }

  async ver_archivos_y_directorios(){
    const content_directory = await AndroidFiles.read_directory(this.file_directory);
    let list_of_files: string[] = content_directory.files;
    if(list_of_files.length === 0){
      await Messages.alert_ok("Resultado!", `No se encontraron archivos`);
    }
    else{
      for(let i: number = 0; i<list_of_files.length; i++){
        const info_file = await AndroidFiles.about_file(`${this.file_directory}/${list_of_files[i]}`);
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