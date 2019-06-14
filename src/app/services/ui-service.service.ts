import { Injectable } from '@angular/core';
import {
  ModalController,
  AlertController,
  ToastController
} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UiServiceService {
  _downloadDir = '';

  constructor(
    public modalController: ModalController,
    private alertController: AlertController,
    public toastController: ToastController,
  ) {}

  // modal controller
  async modal(data, component, cssClass?) {
    const modal = await this.modalController.create({
      cssClass: [cssClass],
      component: component,
      componentProps: { data: data }
    });
    return await modal.present();
  }

  async presentAlert(type: string, message: any) {
    const alert = await this.alertController.create({
      header: type,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentToast(message: string, duration = 2000) {
    const toast = await this.toastController.create({
      message: message,
      duration: duration
    });
    toast.present();
  }

  openFile(path: string) {
    // this.fileOpener
    //   .open(path, 'application/x-bittorrent')
    //   .then(res => this.presentToast(res))
    //   .catch(err => this.presentToast(err));
  }

  checkAppAvailability(fileType: string, optionalType?: string) {
    // this.fileOpener
    //   .appIsInstalled(fileType || optionalType)
    //   .catch(res => this.presentToast('A torrent client is available', res))
    //   .catch(err => this.presentToast(err));
  }
}
