import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { timer, Subscription } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PopcornService } from 'src/app/services/popcorn.service';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ShowsDownloadModalPage } from '../../shows/shows-download-modal/shows-download-modal.page';
import { SearchService } from 'src/app/services/search.service';
import { AnimeDownloadModalPage } from '../anime-download-modal/anime-download-modal.page';
import { FavoriteService } from 'src/app/services/favorite.service';

@Component({
  selector: 'app-anime-details',
  templateUrl: './anime-details.page.html',
  styleUrls: ['./anime-details.page.scss']
})
export class AnimeDetailsPage implements OnInit, OnDestroy {
  details;
  loading;
  error;
  Id;
  Image;
  subscription: Subscription;
  isFavorite = this.favorites.Favorite;
  // tslint:disable-next-line:no-input-rename
  @Input('gbImage') bgImage: HTMLElement;

  constructor(
    private route: ActivatedRoute,
    private popcorn: SearchService,
    private UI: UiServiceService,
    private satnitizer: DomSanitizer,
    private favorites: FavoriteService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const id = params.get('id');
      this.favorites.getKeys(id);
      // get imdb_id without tt
      this.Id = id;
    });

    this.showDetails(this.Id);
  }

  showDetails(id) {
    this.loading = true;
    this.error = false;

    this.subscription = this.popcorn.getAnimeDetails(id).subscribe(
      res => {
        this.details = res;
        this.loading = false;
        this.error = false;
      },
      err => {
        this.loading = false;
        this.error = true;
        this.UI.presentAlert('Error', err);
      }
    );
  }

  store(val: object) {
    this.favorites.store(val);
  }

  setBackground(url: string) {
    return this.satnitizer.bypassSecurityTrustUrl(url);
  }

  async showDownloadModal(data) {
    this.UI.modal(data, AnimeDownloadModalPage);
  }

  doRefresh(e) {
    this.showDetails(this.Id);
    timer(2000).subscribe(e.target.complete());
  }

  ngOnDestroy(): void {
    this.favorites.Favorite.next(false);
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }
}
