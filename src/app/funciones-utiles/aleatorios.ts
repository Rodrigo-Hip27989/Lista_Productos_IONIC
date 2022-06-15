/* Extraido de: 
  > https://es.stackoverflow.com/questions/281758/generar-cadenas-caracteres-aleatorios-typescript
Posiblemente util: 
  > https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Math/random */
export class Randoms{

    public static getStr(longitud: number): string {
        let result = '';
        const caracteres ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        const caracteresLength = caracteres.length;
        for (let i = 0; i < longitud; i++) {
        result += caracteres.charAt(Math.floor(Math.random()*caracteresLength));
        }
        return result;
    }
  
    public static getInt(longitud: number): number{
        let result = '';
        const caracteres ='0123456789';
        const caracteresLength = caracteres.length;
        for (let i = 0; i < longitud; i++) {
        result += caracteres.charAt(Math.floor(Math.random()*caracteresLength));
        }
        return parseInt(result);
    }    
}
  