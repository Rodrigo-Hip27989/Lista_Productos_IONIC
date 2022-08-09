import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

export class AndroidFiles {

  static export_file = async (datos_source: string, sub_dir: string, name_file: string, extension: string) => {
    await Filesystem.writeFile({
      path: sub_dir+'/'+name_file+extension,
      data: datos_source,
      directory: Directory.ExternalStorage,
      encoding: Encoding.UTF8,
      recursive: true,
    });
  };

  static read_file = async (sub_dir: string, name_file: string, extension: string) => {
    const contents = await Filesystem.readFile({
        path: sub_dir+'/'+name_file+extension,
        directory: Directory.ExternalStorage,
        encoding: Encoding.UTF8,
    });
    return contents;
  };

  static delete_file = async (sub_dir: string, name_file: string, extension: string) => {
    await Filesystem.deleteFile({
      path: sub_dir+'/'+name_file+extension,
      directory: Directory.ExternalStorage,
    });
  };

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