import { FilesAccess } from "./files_access";
import { Messages } from "./messages";


export class FilesAccessValidation {

    static validate_file_export = async (file_directory: string, full_file_name: any, accion_de_exportar: any) => {
        if(!await FilesAccess.exist_file_or_dir(file_directory, full_file_name)){
          accion_de_exportar();
        }
        else{
          await Messages.alert_yes_no("Advertencia!", `¿Desea reemplazar el archivo <strong>${full_file_name}</strong>?`, accion_de_exportar);
        }
    };

    static validate_file_import = async (file_directory: string, full_file_name: any, accion_de_importar: any) => {
        if(!await FilesAccess.exist_file_or_dir(file_directory, full_file_name)){
          await Messages.alert_ok("Error!", `\nArchivo <strong>${full_file_name}</strong> no encontrado`);
        }
        else{
          await Messages.alert_yes_no("Advertencia!", "¿Desea reemplazar los datos en la aplicación?", accion_de_importar);
        }
    };

    static validate_file_deletion = async (file_directory: string, full_file_name: any, accion_de_eliminar: any) => {
        if(!await FilesAccess.exist_file_or_dir(file_directory, full_file_name)){
          await Messages.alert_ok("Error!", `\nArchivo <strong>${full_file_name}</strong> no encontrado`);
        }
        else{
          await Messages.alert_yes_no("Advertencia!", `¿Desea eliminar el archivo <strong>${full_file_name}</strong>?`, accion_de_eliminar);
        }
    };

    static share_any_file = async (file_directory: string, full_file_name: string, description_msg: string, data_to_string: string) => {
        await FilesAccess.export_file(data_to_string, file_directory, full_file_name);
        await FilesAccess.share_file(file_directory, full_file_name, description_msg);
        await FilesAccess.delete_file(file_directory, full_file_name);
    };
    
}