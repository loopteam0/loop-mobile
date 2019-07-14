import { Component } from '@angular/core';
import { Platform, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FavoriteService } from './services/favorite.service';
import { UiServiceService } from './services/ui-service.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private favorite: FavoriteService,
    private UI: UiServiceService,
    public alertController: AlertController
  ) {
    this.initializeApp();

    this.favorite
      .getPreference('torrent_available')
      .then(res => {
        if (res === false || res === undefined || res === null) {
          this.presentAlert();
        }
      })
      .catch(err => {
        this.UI.presentToast('Failed to check for supported app');
      });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      /// this.statusBar.overlaysWebView(true);
      this.splashScreen.hide();
    });
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Info',
      message: 'Torrent Client is required to download any media',
      buttons: [
        {
          text: 'Already have one installed',
          handler: () => {
            this.favorite.setPreference('torrent_available', true);
          }
        },
        {
          text: 'Install one now',
          handler: _ => {
            this.favorite.setPreference('torrent_available', true);
            this.UI.openLink(
              'https://play.google.com/store/search?q=torrent&c=apps'
            );
          }
        }
      ]
    });

    await alert.present();
  }
}
