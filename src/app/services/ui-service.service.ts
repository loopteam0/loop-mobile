import { Injectable } from '@angular/core';
import {
  ModalController,
  AlertController,
  ToastController
} from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Injectable({
  providedIn: 'root'
})
export class UiServiceService {
  _downloadDir = '';

  constructor(
    public modalController: ModalController,
    private alertController: AlertController,
    public toastController: ToastController,
    private inAppBrowser: InAppBrowser
  ) {}

  // modal controller
  async modal(data, component, cssClass?) {
    const modal = await this.modalController.create({
      cssClass: [cssClass],
      component,
      componentProps: { data }
    });
    return await modal.present();
  }

  async presentAlert(header: string, message: any, subHeader?) {
    const alert = await this.alertController.create({
      header,
      subHeader,
      message,
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentToast(message: string, duration = 2000) {
    const toast = await this.toastController.create({
      message,
      duration
    });
    toast.present();
  }

  openLink(link: string) {
    const browser = this.inAppBrowser.create(link, '_system');
    browser.executeScript({ code: '(function() {  })()' });
    browser.on('loaderror');
  }

  checkAppAvailability(fileType: string, optionalType?: string) {
    // this.fileOpener
    //   .appIsInstalled(fileType || optionalType)
    //   .catch(res => this.presentToast('A torrent client is available', res))
    //   .catch(err => this.presentToast(err));
  }
}
