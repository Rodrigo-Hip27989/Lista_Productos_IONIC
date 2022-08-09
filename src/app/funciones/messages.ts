import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

export class Messages{
  public static toastController: ToastController = new ToastController();
  public static alertController: AlertController = new AlertController();

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

  public static async alert_yes_no(alert_titulo: string, alert_mensaje: string, opcion_si: any, opcion_no: any) {
    const alert = await this.alertController.create({
      header: alert_titulo, 
      message: alert_mensaje,
      buttons: [
        { text: 'NO', handler: () => { opcion_no(); }},
        { text: 'SI', handler: () => { opcion_si(); } }
      ],
    });
    await alert.present();
  }
}