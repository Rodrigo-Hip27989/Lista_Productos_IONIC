import { SimpleFile } from "../models/simple_file";
import { Producto } from "../models/producto";

export class LStorageConfig{

    public static token_file_config_export: string = "file_config_export";

    public static getConfigExportImport(): SimpleFile{
        return JSON.parse(localStorage.getItem(LStorageConfig.token_file_config_export));
    }

    public static setConfigExportImport(config: SimpleFile): void{
        return localStorage.setItem(LStorageConfig.token_file_config_export, JSON.stringify(config));
    }

}

export class LStorageData{
    public static token_products_array: string = "products_array";

    public static getProductsArray(): Producto[]{
        return JSON.parse(localStorage.getItem(LStorageData.token_products_array));
    }

    public static setProductsArray(products_array: Producto[]): void{
        localStorage.setItem(LStorageData.token_products_array, JSON.stringify(products_array));
    }
}