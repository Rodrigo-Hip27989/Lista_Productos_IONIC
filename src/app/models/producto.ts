export class Producto{
    nombre:string;
    cantidad:number;
    medida:string;
    precio:number;
    precio_total: number;

    public constructor(nombre?: string, cantidad?:number, medida?:string, precio?:number, precio_total?:number){
        if(nombre !== undefined){
            this.nombre = nombre;
        }
        else{
            this.nombre = "";
//            console.log("No se proporciono el nombre");
        }
        if(cantidad !== undefined){
            this.cantidad = cantidad;
        }
        else{
            this.cantidad = 0;
//            console.log("No se proporciono la cantidad");
        }
        if(medida !== undefined){
            this.medida = medida;
        }
        else{
            this.medida = "";
//            console.log("No se proporciono la medida");
        }
        if(precio !== undefined){
            this.precio = precio;
        }
        else{
            this.precio = 0;
//            console.log("No se proporciono el precio");
        }
        if(precio_total !== undefined){
            this.precio_total = precio_total;
        }
        else{
            this.precio_total = 0;
//            console.log("No se proporciono el precio total");
        }
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
    
    public toString(): string{
        let properties_obj:string;
        properties_obj=`\nDETALLES DEL PRODUCTO()\n`;
        for(let property in this){
            properties_obj+=`\n${property}: ${this[property]}`;
        }
        return properties_obj;
    }
}