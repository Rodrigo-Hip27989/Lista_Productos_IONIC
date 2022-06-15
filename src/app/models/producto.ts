import { Randoms } from 'src/app/funciones-utiles/aleatorios';
import { Menus } from 'src/app/funciones-utiles/menus'; 

export class Producto{
    nombre:string;
    cantidad:number;
    medida:string;
    precio:number;
    precio_total: number;

    public constructor(nombre?: string, cantidad?:number, medida?:string, precio?:number){
        this.nombre = nombre; 
        this.cantidad = cantidad; 
        this.medida = medida; 
        this.precio = precio;
        if(this.cantidad !== undefined && this.precio !== undefined){
            this.precio_total = this.cantidad*this.precio;
        }
    }

    public static getMedidadDefault(): string[]{
        let medidasDefault: string[] = [];
        let unidades: string[] = ["Piezas", "Unidades"];
        let tanteo: string [] = ["Medidas", "Manojos", "Otros"];
        let comunes: string[] = ["Bolsas", "Botellas", "Rollos", "Paquetes", "Cajas", "Conos"];
        let internacional: string[] = ["Kilos", "Gramos", "Litros", "Metros"];
        medidasDefault = [...medidasDefault, ...unidades, ...tanteo, ...comunes, ...internacional];
        return medidasDefault.sort();
    }
    
    public toString(): string{
        let properties_obj:string;
        properties_obj=`\nDETALLES DEL PRODUCTO()\n`;
        for(let property in this){
            properties_obj+=`\n${property}: ${this[property]}`;
        }
        return properties_obj;
    }
}

export function fill_products(productos:Producto[], cantidadItems : number){
    console.log(Menus.getMarco(7,16), "FILL_PRODUCTS()", Menus.getMarco(7,16));
    for (let i = 0; i < cantidadItems; i++) {
        productos.push(new Producto(Randoms.getStr(7), Randoms.getInt(3), "Piezas", Randoms.getInt(3)));
    }
}

export function show_product_list(products:Producto[]){
    console.log(Menus.getMarco(8,16), "SHOW_PRODUCT_LIST()", Menus.getMarco(8,16));
    for(let prod_tmp of products){
        console.log(prod_tmp.toString());
    }
}
