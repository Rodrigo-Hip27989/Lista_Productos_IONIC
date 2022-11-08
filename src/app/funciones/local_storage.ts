import { SimpleFile } from "../models/simple_file";
import { Producto } from "../models/producto";
import { ShoppingList } from "../models/shopping_list";

export class LStorageConfig{

    public static token_file_export_details: string = "file_export_details";

    public static getConfigExportImport(): SimpleFile{
        return JSON.parse(localStorage.getItem(LStorageConfig.token_file_export_details));
    }

    public static setConfigExportImport(config: SimpleFile): void{
        localStorage.setItem(LStorageConfig.token_file_export_details, JSON.stringify(config));
    }

}

export class LStorageData{
    public static token_products_array: string = "products_array";
    public static token_shopping_list_array: string = "shopping_list_array";

    public static getProductsArray(): Producto[]{
        return JSON.parse(localStorage.getItem(LStorageData.token_products_array));
    }

    public static setProductsArray(products_array: Producto[]): void{
        localStorage.setItem(LStorageData.token_products_array, JSON.stringify(products_array));
    }

    public static getShoppingList(): ShoppingList[]{
        return JSON.parse(localStorage.getItem(LStorageData.token_shopping_list_array));
    }

    public static setShoppingList(shopping_list_array: ShoppingList[]): void{
        localStorage.setItem(LStorageData.token_shopping_list_array, JSON.stringify(shopping_list_array));
    }
}