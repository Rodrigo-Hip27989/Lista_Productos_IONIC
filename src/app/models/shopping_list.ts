import { Producto } from "./producto";

export class ShoppingList{
    name: string;
    products: Producto [];
    date: string;
    note: string;

    constructor(name?: string, date?: string, products?: Producto[], note?: string){
        (name !== undefined) ? this.name = name : this.name = "";
        (products !== undefined) ? this.products = products :
        (date !== undefined) ? this.date = date : "";
        (note !== undefined) ? this.note = note : note = "";
    }

    public toString(): string{
        let properties_obj:string;
        properties_obj=`\nDETALLES DE LA LISTA()\n`;
        for(let property in this){
            properties_obj+=`\n${property}: ${this[property]}`;
        }
        return properties_obj;
    }
}