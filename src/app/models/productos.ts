import { Producto } from '../models/producto';
import { Randoms } from '../funciones/randoms';
import { Messages } from 'src/app/funciones/messages';

export class Productos{

  public static fill_products(productos:Producto[], cantidadItems : number){
    for (let i = 0; i < cantidadItems; i++) {
      productos.push(new Producto(Randoms.getStr(7), Randoms.getInt(3), "Piezas", Randoms.getInt(3)));
    }
  }

  public static show_product_list(products:Producto[]){
    for(let prod_tmp of products){
      console.log(prod_tmp.toString());
    }
  }

  public static parse_array_str2d_to_array_obj1d(data_source: string[][]): Producto[]{
    let productos_array: Producto[] = [];

    for(let i: number = 0; i<data_source.length; i++){
      let producto_temp: Producto = new Producto();
      productos_array.push(Producto.parse_array_str1d_to_obj(data_source[i]));
    }
    return productos_array;
  }

}