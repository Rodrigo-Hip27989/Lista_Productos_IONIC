export class Producto{
    nombre:string;
    cantidad:number;
    medida:string;
    precio:number;
    precio_total: number;
    fecha: string;
    nota: string;

    public constructor(nombre?: string, cantidad?:number, medida?:string, precio?:number, precio_total?:number, fecha?:string, nota?:string){
        (nombre !== undefined) ? this.nombre = nombre : this.nombre = "";
        (cantidad !== undefined) ? this.cantidad = cantidad : this.cantidad = 0;
        (medida !== undefined) ? this.medida = medida : this.medida = "";
        (precio !== undefined) ? this.precio = precio : this.precio = 0;
        (precio_total !== undefined) ? this.precio_total = precio_total : this.precio_total = 0;
        (fecha !== undefined) ? this.fecha = fecha : this.fecha = "";
        (nota !== undefined) ? this.nota = nota : this.nota = "";
    }

    public static getMedidadDefault(): string[]{
        let medidasDefault: string[] = [];
        let internacional: string[] = ["Gramos", "Kilos", "Litros", "Metros"];
        let tanteo: string [] = ["Tazas", "Medidas", "Bolsas", "Manojos", "Ramos"];
        let comunes: string[] = ["Cajas", "Rollos", "Paquetes", "Botellas", "Conos"];
        let unidades: string[] = ["Unidades", "Piezas"];
        medidasDefault = [...medidasDefault, ...internacional, ...tanteo, ...comunes, ...unidades];
        return medidasDefault;
    }

    public static parse_array_str1d_to_obj(array_str: string[]): Producto{
        // El orden debe ser: nombre, cantidad, medida, precio, precio_total
        let producto_temp: Producto = new Producto();
        producto_temp.nombre = array_str[0];
        producto_temp.cantidad = Number(array_str[1]);
        producto_temp.medida = array_str[2];
        producto_temp.precio = Number(array_str[3]);
        producto_temp.precio_total = Number(array_str[4]);
        producto_temp.fecha = array_str[5];
        return producto_temp;
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