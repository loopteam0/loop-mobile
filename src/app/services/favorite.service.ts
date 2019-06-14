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
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
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

  // b612s-25d
  async get() {
    const Favs = [];
    await this.IonicStore.forEach((value, key, index) => {
      const toObject = {
        key: key,
        index: index,
        value: value
      };
      Favs.push(toObject);
    });
    return this.Favorites.next([...Favs]);
  }

  async getKeys(key) {
    await this.IonicStore.keys().then(val => {
      val.forEach((value, index) => {
        if (value === key) {
          console.log('true');
          return this.Favorite.next(true);
        }
      });
    });
  }

  removeFav(key) {
    this.IonicStore.remove(key).then(res => {
      console.log(res);
      this.UI.presentToast(res, 1500);
      this.get();
    });
  }

  ///HOT
  clearFavs() {
    this.IonicStore.clear().then(res => {
      this.UI.presentToast('All Data Deleted', 1500);
      this.get();
    });
  }
}
