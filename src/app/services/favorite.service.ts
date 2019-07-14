import { Injectable, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';
import { UiServiceService } from './ui-service.service';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService implements OnInit {
  Favorites: BehaviorSubject<Array<any>> = new BehaviorSubject([]);
  Favorite: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private IonicStore: Storage, private UI: UiServiceService) {}

  ngOnInit(): void {
    // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    // Add 'implements OnInit' to the class.
  }

  async store(value: object) {
    await this.IonicStore.set(value['_id'], value)
      .then(res => {
        console.log(res);
        this.UI.presentToast(`${value['title']} added to favorites`, 1500);
      })
      .catch(err => {
        this.UI.presentToast(err, 1500);
      });
    await this.getKeys(value['_id']);
    await this.get();
  }

  setPreference(key: string, value: boolean) {
    this.IonicStore.set(key, value);
  }

  getPreference(key) {
    return this.IonicStore.get(key);
  }

  // b612s-25d
  async get() {
    const Favs = [];
    let toObject;
    await this.IonicStore.forEach((value, key, index) => {
      if (key !== 'torrent_available') {
        toObject = {
          key,
          index,
          value
        };
      }
      Favs.push(toObject);
    });
    return this.Favorites.next([...Favs]);
  }

  async getKeys(key) {
    await this.IonicStore.keys().then(val => {
      val.forEach((value, index) => {
        if (value === key) {
          return this.Favorite.next(true);
        }
      });
    });
  }

  removeFav(key) {
    this.IonicStore.remove(key).then(res => {
      this.UI.presentToast('Item removed', 1500);
      this.get();
    });
  }

  /// HOT
  clearFavs() {
    this.IonicStore.clear().then(res => {
      this.UI.presentToast('All Data Deleted', 1500);
      this.get();
    });
  }
}
