import { Producto } from '../models/producto';
import { Randoms } from '../funciones/aleatorios';
import { Messages } from 'src/app/funciones/messages';

export class Productos{

  public static fill_products(productos:Producto[], cantidadItems : number){
    for (let i = 0; i < cantidadItems; i++) {
      productos.push(new Producto(Randoms.getStr(7), Randoms.getInt(3), "Piezas", Randoms.getInt(3)));
    }
  }

  public static show_product_list(products:Producto[]){
    for(let prod_tmp of products){
      Messages.toast_middle(prod_tmp.toString());
    }
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