import { ToastController } from '@ionic/angular';

export class Messages{
  public static toastController: ToastController = new ToastController();

  public constructor() { }

  public static async toast_top(mensaje_personalizado:string){
    const toast = await this.toastController.create({
        message: mensaje_personalizado, 
        duration: 1500, 
        position: "top"
    });
    toast.present();
  }
  public static async toast_middle(mensaje_personalizado:string){
    const toast = await this.toastController.create({
        message: mensaje_personalizado, 
        duration: 1500, 
        position: "middle"
    });
    toast.present();
  }
  public static async toast_bottom(mensaje_personalizado:string){
    const toast = await this.toastController.create({
        message: mensaje_personalizado, 
        duration: 1500, 
        position: "bottom"
    });
    toast.present();
  }
}