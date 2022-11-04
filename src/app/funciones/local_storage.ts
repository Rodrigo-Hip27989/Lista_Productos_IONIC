import { Producto } from "../models/producto";

export class LStorageConfig{
    public static token_file_name: string = "file_name";
    public static token_file_extension: string = "file_extension";
    public static token_file_directory: string = "file_directory";

    public static getFileName(): string{
        return localStorage.getItem(LStorageConfig.token_file_name);
    }

    public static setFileName(file_name: string): void{
        return localStorage.setItem(LStorageConfig.token_file_name, file_name);
    }

    public static getFileExtension(): string{
        return localStorage.getItem(LStorageConfig.token_file_extension);
    }

    public static setFileExtension(file_extension: string): void{
        return localStorage.setItem(LStorageConfig.token_file_extension, file_extension);
    }

    public static getFileDirectory(): string {
        return localStorage.getItem(LStorageConfig.token_file_directory);
    }

    public static setFileDirectory(file_directory: string): void {
        return localStorage.setItem(LStorageConfig.token_file_directory, file_directory);
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