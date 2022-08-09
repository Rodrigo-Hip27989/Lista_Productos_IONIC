import { Papa } from 'ngx-papaparse';
import { ReadFileResult } from '@capacitor/filesystem';
import { Producto } from 'src/app/models/producto';

export class ConvertData{

  public static csv_to_array_products(papa: Papa, contents: ReadFileResult): Producto[]{ // Cambiar a tipo privado
    // Guarda las cabeceras y los datos del contenido recibido
    let data_csv_headerRow: string[] = [];
    let data_csv_body: string[][] = [];

    papa.parse(contents.data, {
      complete: parsedData => {
        data_csv_headerRow = parsedData.data.splice(0, 1)[0];
        data_csv_body = parsedData.data;
      }
    });
    return this.convert_array_str_to_array_products(data_csv_body);
  }

  public static convert_array_str_to_array_products(data_source: string[][]): Producto[]{
    let productos_array: Producto[] = [];

    for(let i: number = 0; i<data_source.length; i++){
      let producto_temp: Producto = new Producto();
      productos_array.push(Producto.convert_array_str(data_source[i]));
    }

    return productos_array;
  }
}