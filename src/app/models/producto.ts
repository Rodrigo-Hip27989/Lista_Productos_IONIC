export class Producto{
    nombre:string;
    cantidad:number;
    medida:string;
    precio:number;
    precio_total: number;

    public constructor(nombre?: string, cantidad?:number, medida?:string, precio?:number){
        if(nombre !== undefined){
            this.nombre = nombre;
        }
        else{
            this.nombre = "";
            console.log("No se proporciono el nombre");
        }
        if(cantidad !== undefined){
            this.cantidad = cantidad;
        }
        else{
            this.cantidad = 0;
            console.log("No se proporciono la cantidad");
        }
        if(medida !== undefined){
            this.medida = medida;
        }
        else{
            this.medida = "";
            console.log("No se proporciono la medida");
        }
        if(precio !== undefined){
            this.precio = precio;
        }
        else{
            this.precio = 0;
            console.log("No se proporciono el precio");
        }
        if(cantidad !== undefined && precio !== undefined){
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