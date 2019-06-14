import { Component, OnInit } from '@angular/core';
import { FavoriteService } from 'src/app/services/favorite.service';
import { BehaviorSubject, Observable, timer } from 'rxjs';
import { Router } from '@angular/router';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-musics',
  templateUrl: './musics.page.html',
  styleUrls: ['./musics.page.scss']
})
export class MusicsPage implements OnInit {
  enableSearch: boolean;
  favs: BehaviorSubject<any[]>;

  constructor(
    private favorites: FavoriteService,
    private route: Router,
    public alertController: AlertController
  ) {}

  ngOnInit() {
    this.favorites.get().then(_ => {
      this.favs = this.favorites.Favorites;
    });

    // this.favorites.getKeys();
  }

  async removefav(fav) {
    const alert = await this.alertController.create({
      header: 'Warning',
      message: `${fav.value.title} will be removed. Do you want to continue`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {}
        },
        {
          text: 'Yes',
          handler: _ => {
            this.favorites.removeFav(fav.key);
          }
        }
      ]
    });

    await alert.present();
  }

  async clearAllFavs() {
    const alert = await this.alertController.create({
      header: 'Warning',
      message: 'All saved data will be deleted. Do you want to continue',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {}
        },
        {
          text: 'Yes',
          handler: _ => {
            this.favorites.clearFavs();
          }
        }
      ]
    });

    await alert.present();
  }

  getFavs(e) {
    this.favorites.get();
    timer(2000).subscribe(_ => e.target.complete());
  }

  onNavigate(fav: any) {
    if (fav.mal_id) {
      this.route.navigate([`/tabs/anime/${fav._id}`]);
    } else if (fav.imdb_id) {
      this.route.navigate([`/tabs/shows-list/${fav.imdb_id}`]);
    }
  }

  removefavs(key) {
    this.favorites.removeFav(key);
  }

  ionChange() {}

  ionClear() {}
}
