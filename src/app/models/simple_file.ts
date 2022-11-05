export class SimpleFile{
    name: string;
    extension: string;
    path: string;

    public constructor(name?: string, extension?: string, path?: string){
        (name !== undefined) ? this.name = name : this.name = "";
        (extension !== undefined) ? this.extension = extension : this.extension = "";
        (path !== undefined) ? this.path = path : this.path = "";
    }

}