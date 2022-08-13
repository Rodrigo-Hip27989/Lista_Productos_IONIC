import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';

export class AndroidFiles {

  static export_file = async (datos_source: string, sub_dir: string, full_file_name: string) => {
    await Filesystem.writeFile({
      path: sub_dir+'/'+full_file_name,
      data: datos_source,
      directory: Directory.ExternalStorage,
      encoding: Encoding.UTF8,
      recursive: true,
    });
  };

  static read_file = async (sub_dir: string, full_file_name: string) => {
    const contents = await Filesystem.readFile({
        path: sub_dir+'/'+full_file_name,
        directory: Directory.ExternalStorage,
        encoding: Encoding.UTF8,
    });
    return contents;
  };

  static delete_file = async (sub_dir: string, full_file_name: string) => {
    await Filesystem.deleteFile({
      path: sub_dir+'/'+full_file_name,
      directory: Directory.ExternalStorage,
    });
  };

  static create_directory = async (path_dir: string) => {
    const contents = await Filesystem.mkdir({
        path: path_dir,
        directory: Directory.ExternalStorage,
        recursive: true,
      });
    return contents;
  };

  static read_directory = async (path_dir: string) => {
    const contents = await Filesystem.readdir({
        path: path_dir,
        directory: Directory.ExternalStorage,
    });
    return contents;
  };

  static delete_directory = async (path_dir: string) => {
    const contents = await Filesystem.rmdir({
        path: path_dir,
        directory: Directory.ExternalStorage,
        recursive: true,
      });
    return contents;
  };

  static about_file = async (path_file: string) => {
    const contents = await Filesystem.stat({
        path: path_file,
        directory: Directory.ExternalStorage,
    });
    return contents;
  };

  static get_uri = async (path_dir: string) => {
    const contents = await Filesystem.getUri({
        path: path_dir,
        directory: Directory.ExternalStorage,
    });
    return contents;
  };

  static share_file = async (file_path: string, full_file_name: string, description_msg: string) => {
    // Obtener ruta completa del archivo descargado
    const full_path = await AndroidFiles.get_uri(file_path);
    await Share.share({
      title: description_msg,
      text: description_msg,
      url: full_path.uri+'/'+full_file_name,
      dialogTitle: 'Share',
    });
  }

  public static export_file_desktop(data_source: string, name_file: string, extension: string) {
  //  Implementación ficticia para fines de descarga de escritorio
      let blob = new Blob([data_source]);
      let a = window.document.createElement("a");
      a.href = window.URL.createObjectURL(blob);
      a.download = name_file+extension;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
}