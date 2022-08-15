//  Regex para validar numeros naturales (>0) con una longitud de entre 1 a 3 caracteres
//  const prueba_num:any[] = [-32, -1, 0, 1, 2, 20, 303, 4444, " ", " 0", " 1", "0 ", "1 ", "22", "333", "4444"];
//  Regex para validar cadena de caracteres con una longitud de entre 3 a 16 caracteres (Tiene el detalle de que puede terminar con un espacio)
//  const prueba_str:any[] = [" ", "0", "1", "22", "A", "BB", "aA", "Aa", "AAA", "BBB", "aaaaaaaaaaaaaa", "bbbbbbbbbbbbbbbbbbbbbbbbbb", "ccccccccccccccccccccccccccccccccccccccccccccccccccccc"];
export class Validations{
    static regex_texto = /^[A-Za-z][A-Za-z\ ]{0,15}$/;
    static regex_numero = /^[1-9][0-9]{0,2}$/;
    static regex_no_blank_space = /^[A-Za-z][A-Za-z0-9_]{0,127}$/;
    
    public static numero(numero:string): boolean{
        let regex_valido = this.regex_numero.test(numero);
        return regex_valido;
    }

    public static texto(texto:string): boolean{
        let regex_valido = this.regex_texto.test(texto);
        return regex_valido;
    }

/*     public static no_blank_space(texto:string): boolean{
        let regex_valido: boolean = this.regex_no_blank_space.test(texto);
        return regex_valido;
    } */
}