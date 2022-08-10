import { ReadFileResult } from '@capacitor/filesystem';
import { Papa } from 'ngx-papaparse';
import { Producto } from '../models/producto';
import { Randoms } from '../funciones/aleatorios';
import { Menus } from '../funciones/menus';

export class Productos{

//  productos: Productos [] = [];    cantidad:number;
//  precio_total: number;
//
//  public constructor(productos_array?: Producto[], precio_total?:number){
//      //this.productos = productos_array;
//      this.precio_total = precio_total;
//  }

  public fill_products(productos:Producto[], cantidadItems : number){
    console.log(Menus.getMarco(7,16), "FILL_PRODUCTS()", Menus.getMarco(7,16));
    for (let i = 0; i < cantidadItems; i++) {
        productos.push(new Producto(Randoms.getStr(7), Randoms.getInt(3), "Piezas", Randoms.getInt(3)));
    }
  }

  public show_product_list(products:Producto[]){
    console.log(Menus.getMarco(8,16), "SHOW_PRODUCT_LIST()", Menus.getMarco(8,16));
    for(let prod_tmp of products){
        console.log(prod_tmp.toString());
    }
  }

  public static convert_csv_to_array_products(papa: Papa, contents: ReadFileResult): Producto[]{ // Cambiar a tipo privado
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