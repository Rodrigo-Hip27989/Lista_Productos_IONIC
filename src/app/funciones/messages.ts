import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

export class Messages{
  public static toastController: ToastController = new ToastController();
  public static alertController: AlertController = new AlertController();

  public constructor() { }

  public static async toast_top(mensaje_personalizado:string){
    await this.toast(mensaje_personalizado, "top", 1500)
  }

  public static async toast_middle(mensaje_personalizado:string){
    await this.toast(mensaje_personalizado, "middle", 1500)
  }

  public static async toast_bottom(mensaje_personalizado:string){
    await this.toast(mensaje_personalizado, "bottom", 1500)
  }

  public static async toast(mensaje_personalizado:string, posicion: any, tiempo: number){
    const toast = await this.toastController.create({
        message: mensaje_personalizado,
        duration: tiempo,
        position: posicion
    });
    toast.present();
  }

  public static async alert_yes_no(alert_titulo: string, alert_mensaje: string, opcion_si: any) {
    const alert = await this.alertController.create({
      header: alert_titulo,
      message: alert_mensaje,
      buttons: [
        { text: 'NO', handler: () => { Messages.toast_middle("Operacion cancelada!"); } },
        { text: 'SI', handler: () => { opcion_si(); } }
      ],
    });
    await alert.present();
  }

  public static async alert_ok(alert_titulo: string, alert_mensaje) {
    const alert = await this.alertController.create({
      header: alert_titulo,
      message: alert_mensaje,
      buttons: ['OK'],
    });
    await alert.present();
  }
}