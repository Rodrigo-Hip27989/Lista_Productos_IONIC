import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Papa } from 'ngx-papaparse';
import { FileInfo, ReadFileResult } from '@capacitor/filesystem';
import { LStorageConfig, LStorageData } from 'src/app/funciones/local_storage';
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

  constructor(private papa: Papa, private plt: Platform) {
    //Ruta de archivo(s)
    this.file_name = LStorageConfig.getFileName();
    this.file_directory = LStorageConfig.getFileDirectory();
    this.products_array = LStorageData.getProductsArray();
  }

  ngOnInit(): void {
    if (this.plt.is('capacitor')) { // Producción
      AndroidFiles.create_directory(this.file_directory);
    }
  }

  // FUNCIONES PRINCIPALES

  async export_products(extension: string){
    const exportar_data = async () => {
      await AndroidFiles.export_file(this.get_data_products_str(extension), this.file_directory, `${this.file_name}${extension}`);
      Messages.toast_top("Archivo exportado correctamente!");
    }
    await this.validate_file_export(this.file_directory, `${this.file_name}${extension}`, exportar_data);
  }

  async validate_file_export(file_directory: string, full_file_name: any, accion_de_exportar: any){
    AndroidFiles.create_directory(file_directory);
    if(!await AndroidFiles.exist_file_or_dir(file_directory, full_file_name)){
      accion_de_exportar();
    }
    else{
      await Messages.alert_yes_no("File already exist!", "¿Desea reemplazar el archivo existente?", accion_de_exportar);
    }
  }

  async import_products(extension: string){
    const importar_data = async () => {
      const contents = await AndroidFiles.read_file(this.file_directory, `${this.file_name}${extension}`);
      this.products_array = this.get_data_products_array(extension, contents);
      LStorageData.setProductsArray(this.products_array);
      Messages.toast_top("Archivo importado correctamente!");
    }
    await this.validate_file_import(this.file_directory, `${this.file_name}${extension}`, importar_data);
  }

  async validate_file_import(file_directory: string, full_file_name: any, accion_de_importar: any){
    AndroidFiles.create_directory(file_directory);
    if(!await AndroidFiles.exist_file_or_dir(file_directory, full_file_name)){
      await Messages.alert_ok("File not found!", `\n${file_directory}/${full_file_name}`);
    }
    else{
      await Messages.alert_yes_no("Aviso!", "¿Desea reemplazar sus datos actuales?", accion_de_importar);
    }
  }

  async delete_file_products(extension: string){
    const eliminar_archivo = async () => {
      await AndroidFiles.delete_file(this.file_directory, `${this.file_name}${extension}`);
      Messages.toast_top("Archivo eliminado");
    }
    this.validate_file_deletion(this.file_directory, `${this.file_name}${extension}`, eliminar_archivo);
  }

  async validate_file_deletion(file_directory: string, full_file_name: any, accion_de_eliminar: any){
    AndroidFiles.create_directory(this.file_directory);
    if(!await AndroidFiles.exist_file_or_dir(file_directory, full_file_name)){
      await Messages.alert_ok("File not found!", `\n${file_directory}/${full_file_name}`);
    }
    else{
      await Messages.alert_yes_no("Aviso!", "¿Desea eliminar el archivo?", accion_de_eliminar);
    }
  }

  async share_file_products(extension: string){
    let recovered_data: string = this.get_data_products_str(extension);
    let new_file_name: string = `${this.file_name}__${this.getLocalDate()}`;
    await this.share_any_file(this.file_directory, `${new_file_name}${extension}`, this.file_name, recovered_data);
  }

  async share_any_file(file_directory: string, full_file_name: string, description_msg: string, data_to_string: string){
    AndroidFiles.create_directory(file_directory);
    await AndroidFiles.export_file(data_to_string, file_directory, full_file_name);
    await AndroidFiles.share_file(file_directory, full_file_name, description_msg);
    await AndroidFiles.delete_file(file_directory, full_file_name);
  }

  // FUNCIONES PARA OBTENER DATOS

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
    return Productos.parse_array_str2d_to_array_obj1d(data_csv_body);
  }

  get_data_products_str(extension: string): string{
    if(extension === ".csv"){
      return this.papa.unparse(this.products_array);
    }
    else if(extension === ".json"){
      return LStorageData.getProductsStringify();
    }
    else{
      return null;
    }
  }

  get_data_products_array(extension: string, contents: ReadFileResult): Producto[]{
    if(extension === ".csv"){
      return this.convert_csv_to_array_products(contents);
    }
    else if(extension === ".json"){
      return JSON.parse(contents.data);
    }
    else{
      return null;
    }
  }

  // FUNCIONES PARA GUARDAR DATOS

  private update_localstorage_routes(){
    LStorageConfig.setFileName(this.file_name);
    LStorageConfig.setFileDirectory(this.file_directory);
    Messages.toast_middle("Ruta de archivos Actualizada!");
  }

  // FUNCIONES PARA TESTING

  public export_products_desktop(extension: string){
    AndroidFiles.export_file_desktop(this.get_data_products_str(extension), `${this.file_name}__${this.getLocalDate()}`, extension);
    Messages.toast_top("Archivo descargado (desktop)");
  }

  async ver_archivos_y_directorios(){
    const content_directory = await AndroidFiles.read_directory(this.file_directory);
    let list_of_files: FileInfo[] = content_directory.files;
    await Messages.alert_ok(`Resultado!`, `<strong>${list_of_files.length}</strong> Archivos Encontrados`);
    if(list_of_files.length !== 0){
      for(let i: number = 0; i<list_of_files.length; i++){
        const file_details = `
        <strong>* Tipo: </strong>${list_of_files[i].type}<hr/>
        <strong>* Nombre: </strong>${list_of_files[i].name}<hr/>
        <strong>* Creado: </strong>${(new Date(list_of_files[i].ctime)).toDateString()}<hr/>
        <strong>* Modificado: </strong>${(new Date(list_of_files[i].mtime)).toDateString()}<hr/>
        <strong>* Tamaño: </strong>${list_of_files[i].size}<hr/>
        <strong>* Ruta: </strong>${list_of_files[i].uri}`;
        await Messages.alert_ok(`Archivo - [${i}]`, file_details);
      }
    }
  }

  // VALIDACIONES DE RUTA Y ARCHIVO

  is_valid_file_directory(file_directory: string): void{
    if(!Validations.file_directory_str(file_directory)){
      Messages.toast("No se permite espacios en blanco ni caracteres especiales!", "middle", 2000);
    }
  }

  is_valid_file_name(file_name: string): void{
    if(!Validations.file_name_str(file_name)){
      Messages.toast("No se permite espacios en blanco ni caracteres especiales!", "middle", 2000);
    }
  }

  is_valid_form(): boolean{
    return (Validations.file_name_str(this.file_name) && Validations.file_directory_str(this.file_directory));
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