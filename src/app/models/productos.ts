import { Randoms } from '../funciones/aleatorios';
import { Menus } from '../funciones/menus';
import { Producto } from '../models/producto'; 

export class Productos{
    productos: Productos [] = [];    cantidad:number;
    precio_total: number;

    public constructor(productos_array?: Producto[], precio_total?:number){
        //this.productos = productos_array;
        this.precio_total = precio_total;
    }

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
}