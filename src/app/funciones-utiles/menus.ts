export class Menus{
    
    public static getMarco(tipo:number, longitud:number){
        let tipoMarco:string[] = ['░', '▒', '▓', '█', '-', '_', '=', '>', '<'];
        let result = '';
        for (let i = 0; i < longitud; i++) {
          result += tipoMarco[tipo];
        }
        return result;
    }
}