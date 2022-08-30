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

  async export_products_csv(){
    const exportar_csv = () => {
      AndroidFiles.export_file(this.papa.unparse(this.products_array), this.file_directory, `${this.file_name}.csv`);
      Messages.toast_top("Archivo exportado correctamente!");
    }
    await this.export_any_file(this.file_directory, `${this.file_name}.csv`, exportar_csv);
  }

  async export_products_json(){
    const exportar_json = () => {
      AndroidFiles.export_file(LStorageData.getProductsStringify(), this.file_directory, `${this.file_name}.json`);
      Messages.toast_top("Archivo exportado correctamente!");
    }
    await this.export_any_file(this.file_directory, `${this.file_name}.json`, exportar_json);
  }

  async import_products_csv(){
    const importar_csv = async () => {
      const contents = await AndroidFiles.read_file(this.file_directory, `${this.file_name}.csv`);
      this.products_array.splice(0);
      this.products_array = this.convert_csv_to_array_products(contents);
      LStorageData.setProductsArray(this.products_array);
      await Messages.toast_top("Archivo importado correctamente!");
    }
    await this.import_any_file(this.file_directory, `${this.file_name}.csv`, importar_csv);
  }

  async import_products_json(){
    const importar_json = async () => {
      const contents = await AndroidFiles.read_file(this.file_directory, `${this.file_name}.json`);
      this.products_array.splice(0);
      this.products_array = JSON.parse(contents.data);
      LStorageData.setProductsArray(this.products_array);
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
    let recovered_data_json: string = LStorageData.getProductsStringify();
    let new_file_name: string = `${this.file_name}__${this.getLocalDate()}`;
    await this.share_any_file(this.file_directory, `${new_file_name}.json`, this.file_name, recovered_data_json);
  }

  // FUNCIONES PRINCIPALES

  async export_any_file(file_directory: string, full_file_name: any, accion_de_exportar: any){
    AndroidFiles.create_directory(file_directory);
    const files_and_dirs: FileInfo[] = (await AndroidFiles.read_directory(file_directory)).files;
    if(!this.exist_file_or_dir(files_and_dirs, full_file_name)){
      accion_de_exportar();
    }
    else{
      await Messages.alert_yes_no("File already exist!", "¿Desea reemplazar el archivo existente?", accion_de_exportar);
    }
  }

  async import_any_file(file_directory: string, full_file_name: any, accion_de_importar: any){
    AndroidFiles.create_directory(file_directory);
    const files_and_dirs: FileInfo[] = (await AndroidFiles.read_directory(file_directory)).files;
    if(!this.exist_file_or_dir(files_and_dirs, full_file_name)){
      await Messages.alert_ok("File not found!", `\n${file_directory}/${full_file_name}`);
    }
    else{
      await Messages.alert_yes_no("Aviso!", "¿Desea reemplazar sus datos actuales?", accion_de_importar);
    }
  }

  async delete_any_file(file_directory: string, full_file_name: any){
    AndroidFiles.create_directory(this.file_directory);
    const files_and_dirs: FileInfo[] = (await AndroidFiles.read_directory(file_directory)).files;
    if(!this.exist_file_or_dir(files_and_dirs, full_file_name)){
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

  private update_localstorage_routes(){
    LStorageConfig.setFileName(this.file_name);
    LStorageConfig.setFileDirectory(this.file_directory);
    Messages.toast_middle("Ruta de archivos Actualizada!");
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
    return Productos.parse_array_str2d_to_array_obj1d(data_csv_body);
  }

  // FUNCIONES PARA TESTING

  public export_products_csv_desktop(){
    AndroidFiles.export_file_desktop(this.papa.unparse(this.products_array), `${this.file_name}__${this.getLocalDate()}`, ".csv");
    Messages.toast_top("Archivo descargado (desktop)");
  }

  public export_products_json_desktop(){
    AndroidFiles.export_file_desktop(LStorageData.getProductsStringify(), `${this.file_name}__${this.getLocalDate()}`, ".json");
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

// Validaciones

  exist_file_or_dir(files_and_dirs: FileInfo[], full_file_name: string): boolean{
    let status_file_exist: boolean = false;
    for(let i: number = 0; i<files_and_dirs.length; i++){
      if(files_and_dirs[i].name === full_file_name){
        status_file_exist = true;
        break;
      }
    }
    return status_file_exist;
  }

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