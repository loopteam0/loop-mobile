import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { YtsService } from '../../../services/yts.service';
import { Router } from '@angular/router';
import { Subscription, timer } from 'rxjs';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { tap } from 'rxjs/operators';
import { IonContent } from '@ionic/angular';
import { PopcornService } from 'src/app/services/popcorn.service';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.page.html',
  styleUrls: ['./movies-list.page.scss']
})
export class MoviesListPage implements OnInit, OnDestroy {
  movies: Array<any> = [];
  loading;
  error;
  page = 1;
  pageSize = 50;
  onRetry: any;
  placeholder: boolean;
  enableSearch: boolean;
  loading_i: boolean;
  @ViewChild(IonContent) contentArea: IonContent;
  scrollPosition: number;
  fab: boolean;
  subs: Subscription;
  subs1: Subscription;

  constructor(
    private YTS: PopcornService,
    private route: Router,
    private UI: UiServiceService
  ) {}

  ngOnInit() {
    this.showMovies();
    this.loading_i = false;
  }

  ionChange(val: string) {
    if (val.trim().length === 0 || !val) {
      // do nothing
    } else if (val.length === 0) {
    } else {
      this.search(val);
    }
  }

  ionClear() {
    this.togleSearch();
  }

  togleSearch() {
    this.enableSearch = !this.enableSearch;
  }

  showMovies(e?) {
    this.loading = true;
    this.loading_i = true;
    this.error = false;
    e ? (this.placeholder = true) : null;
    this.subs = this.YTS.getMovieList(this.page).subscribe(
      res => {
        this.page++;
        this.movies = [...this.movies, ...res];
        this.loading = false;
        this.loading_i = false;
        this.error = false;
        if (e) {
          this.placeholder = false;
          e.target.complete();
        }
      },
      err => {
        this.loading = false;
        this.loading_i = false;
        this.error = true;
        this.UI.presentAlert('Error', err);
        if (e) {
          e.target.complete();
        }
      }
    );
  }

  search(keyword: string) {
    this.loading = true;
    this.error = false;
    this.contentArea.scrollToTop(1500);
    this.subs1 = this.YTS.getByKeyword('movies', keyword).subscribe(
      res => {
        this.loading = false;
        this.movies = [...res, ...this.movies];
        if (res.length === 0) {
          this.UI.presentToast('Nothing found ');
        } else {
          this.UI.presentToast(`${res.length} item(s) found`);
        }
        this.error = false;
      },
      err => {
        this.loading = false;
        this.error = true;
        this.UI.presentAlert('Error', err);
      }
    );
  }

  onNavigate(id: any, imdb_id: any) {
    this.route.navigate([`/tabs/movies-list/${id}/${imdb_id}`]);
  }

  ionScroll($event) {
    this.scrollPosition = $event.detail.currentY;
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
  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
    this.subs.unsubscribe();
    this.subs1.unsubscribe();
  }
}
