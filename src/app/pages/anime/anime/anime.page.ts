import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { timer, Subscription } from 'rxjs';

@Component({
  selector: 'app-anime',
  templateUrl: './anime.page.html',
  styleUrls: ['./anime.page.scss']
})
export class AnimePage implements OnInit, OnDestroy {
  loading: boolean;
  error: boolean;
  page = 1;
  placeholer: boolean;
  Anime: Array<any> = [];
  enableSearch: boolean;
  @ViewChild(IonContent) contentArea: IonContent;
  fab: boolean;
  scrollPosition: number;
  subs: Subscription;
  subs1: Subscription;

  constructor(
    private popcorn: SearchService,
    private route: Router,
    private UI: UiServiceService
  ) {}

  ngOnInit() {
    this.ShowAnime();
  }

  ionChange(val: string) {
    if (val.trim().length === 0 || !val) {
      // do nothing
    } else if (val.length === 0) {
      //do nothing
    } else {
      this.search(val);
    }
  }

  search(val: string) {
    this.loading = true;
    this.error = false;
    this.scrollTo();
    this.subs = this.popcorn.getAnimesByKeyword(val).subscribe(
      res => {
        this.loading = false;
        this.error = false;
        this.Anime = [...res, ...this.Anime];
        if (res.length === 0) {
          this.UI.presentToast('Nothing found ');
        } else {
          this.UI.presentToast(`${res.length} items found`);
        }
      },
      err => {
        this.error = true;
        this.loading = false;
        this.UI.presentAlert('Error', err);
      }
    );
  }

  async ShowAnime(e?: any) {
    this.loading = true;
    this.error = false;
    e ? (this.placeholer = true) : null;
    this.subs1 = await this.popcorn.getAnimesList(this.page).subscribe(
      res => {
        this.page++;
        this.Anime = [...this.Anime, ...res];
        this.loading = false;
        this.error = false;
        if (e) {
          e.target.complete();
          this.placeholer = false;
        }
      },
      err => {
        this.loading = false;
        this.error = true;
        this.UI.presentAlert('Error', err);
        if (e) {
          e.target.complete();
        }
      }
    );
  }

  ionClear() {
    this.togleSearch();
  }

  ionScroll($event) {
    this.scrollPosition = $event.detail.currentY;
    this.fab = false;
  }

  ionScrollEnd($event) {
    if (this.scrollPosition > 1000) {
      this.fab = true;
    } else {
      this.fab = false;
    }
  }

  scrollTo() {
    this.contentArea.scrollToTop(2000);
  }

  onNavigate(_id: any) {
    this.route.navigate([`/tabs/anime/${_id}`]);
  }

  togleSearch() {
    this.enableSearch = !this.enableSearch;
  }

  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
  }
}
