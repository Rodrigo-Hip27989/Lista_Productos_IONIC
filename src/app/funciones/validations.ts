//  Regex para validar numeros naturales (>0) con una longitud de entre 1 a 3 caracteres
//  const prueba_num:any[] = [-32, -1, 0, 1, 2, 20, 303, 4444, " ", " 0", " 1", "0 ", "1 ", "22", "333", "4444"];
//  Regex para validar cadena de caracteres con una longitud de entre 3 a 16 caracteres (Tiene el detalle de que puede terminar con un espacio)
//  const prueba_str:any[] = [" ", "0", "1", "22", "A", "BB", "aA", "Aa", "AAA", "BBB", "aaaaaaaaaaaaaa", "bbbbbbbbbbbbbbbbbbbbbbbbbb", "ccccccccccccccccccccccccccccccccccccccccccccccccccccc"];

export class Validations{
  static regex_texto = /^[A-Za-z][A-Za-z\ ]{0,15}$/;
  static regex_numero = /^[1-9][0-9]{0,2}$/;
  static regex_no_blank_space_no_characters_special = /^[A-Za-z][A-Za-z0-9_]{0,127}$/;

  public static numero(numero:string): boolean{
    let regex_valido = this.regex_numero.test(numero);
    return regex_valido;
  }

  public static texto(texto:string): boolean{
    let regex_valido = this.regex_texto.test(texto);
    return regex_valido;
  }

  public static file_directory_str(path_directory: string): boolean{
    let posibles_directorios: string[] = path_directory.split('/');
    for(let i: number = 0; i< posibles_directorios.length; i++){
      if(!Validations.regex_no_blank_space_no_characters_special.test(posibles_directorios[i])){
        return false;
      }
    }
    return true;
  }

  public static file_name_str(file_name: string): boolean{
    if(Validations.regex_no_blank_space_no_characters_special.test(file_name)){
      return true;
    }
    else{
      return false;
    }
  }

  public static file_extension_str(file_extension: string): boolean{
    if(file_extension===".csv" || file_extension===".json"){
      return true;
    }
    else{
      return false;
    }
  }
}