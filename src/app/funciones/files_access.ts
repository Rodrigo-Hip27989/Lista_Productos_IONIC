import { Filesystem, Directory, Encoding, FileInfo } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';
import { Messages } from 'src/app/funciones/messages';

export class FilesAccess {

  static export_file = async (datos_source: string, sub_dir: string, full_file_name: string) => {
    try{
      await Filesystem.writeFile({
        path: sub_dir+'/'+full_file_name,
        data: datos_source,
        directory: Directory.ExternalStorage,
        encoding: Encoding.UTF8,
        recursive: true,
      });
    }
    catch(err){
      Messages.alert_ok("Error - Filesystem.writeFile", `${err}`);
    }
  };

  static read_file = async (sub_dir: string, full_file_name: string) => {
    try{
      const file_contents = await Filesystem.readFile({
        path: sub_dir+'/'+full_file_name,
        directory: Directory.ExternalStorage,
        encoding: Encoding.UTF8,
      });
      return file_contents;
    }
    catch(err){
      Messages.alert_ok("Error - Filesystem.readFile", `${err}`);
    }
  };

  static delete_file = async (sub_dir: string, full_file_name: string) => {
    try{
      await Filesystem.deleteFile({
        path: sub_dir+'/'+full_file_name,
        directory: Directory.ExternalStorage,
      });
    }
    catch(err){
      Messages.alert_ok("Error Filesystem.deleteFile", `${err}`);
    }
  };

  static create_directory = async (path_dir: string) => {
    try{
      const contents = await Filesystem.mkdir({
        path: path_dir,
        directory: Directory.ExternalStorage,
        recursive: true,
      });
      return contents;
    }
    catch(err){
      Messages.alert_ok("Error - Filesystem.mkdir", `${err}`);
    }
  };

  static read_directory = async (path_dir: string) => {
    try{
      const contents = await Filesystem.readdir({
        path: path_dir,
        directory: Directory.ExternalStorage,
      });
      return contents;
    }
    catch(err){
      Messages.alert_ok("Error - Filesystem.readdir", `${err}`);
    }
  };

  static delete_directory = async (path_dir: string) => {
    try{
      const contents = await Filesystem.rmdir({
        path: path_dir,
        directory: Directory.ExternalStorage,
        recursive: true,
      });
      return contents;
    }
    catch(err){
      Messages.alert_ok("Error - Filesystem.rmdir", `${err}`);
    }
  };

  static about_file = async (path_file: string) => {
    try{
      const contents = await Filesystem.stat({
        path: path_file,
        directory: Directory.ExternalStorage,
      });
      return contents;
    }
    catch(err){
      Messages.alert_ok("Error - Filesystem.stat", `${err}`);
    }
  };

  static get_uri = async (path_dir: string) => {
    try{
      const contents = await Filesystem.getUri({
        path: path_dir,
        directory: Directory.ExternalStorage,
      });
      return contents;
    }
    catch(err){
      Messages.alert_ok("Error - Filesystem.getUri", `${err}`);
    }
  };

  static share_file = async (file_path: string, full_file_name: string, description_msg: string) => {
    try{
      // Obtener ruta completa del archivo descargado
      const full_path = await FilesAccess.get_uri(file_path);
      await Share.share({
        title: description_msg,
        text: description_msg,
        url: full_path.uri+'/'+full_file_name,
        dialogTitle: 'Share',
      });
    }
    catch(err){
      Messages.alert_ok("Error - Share.share", `${err}`);
    }
  }

  public static async exist_file(file_directory: string, full_file_name: string): Promise<boolean>{
    const files_and_dirs: FileInfo[] = (await FilesAccess.read_directory(file_directory)).files;
    let status_file_exist: boolean = false;
    for(let i: number = 0; i<files_and_dirs.length; i++){
      if(files_and_dirs[i].name === full_file_name){
        status_file_exist = true;
        break;
      }
    }
    return status_file_exist;
  }

  public static export_file_desktop(data_source: string, name_file: string, extension: string) {
    try{
      //  Implementación ficticia para fines de descarga de escritorio
      let blob = new Blob([data_source]);
      let a = window.document.createElement("a");
      a.href = window.URL.createObjectURL(blob);
      a.download = name_file+extension;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
    catch(err){
      Messages.alert_ok("Oops", `Ocurrio un error al exportar el archivo desde el navegador`);
    }
  }
}