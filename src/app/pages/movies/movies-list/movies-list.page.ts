import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { YtsService } from '../../../services/yts.service';
import { Router } from '@angular/router';
import { Subscription, timer } from 'rxjs';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { tap } from 'rxjs/operators';
import { IonContent } from '@ionic/angular';

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
  subscription: Subscription;
  placeholder: boolean;
  enableSearch: boolean;
  loading_i: boolean;
  @ViewChild(IonContent) contentArea: IonContent;
  scrollPosition: number;
  fab: boolean;

  constructor(
    private YTS: YtsService,
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
    e ? (this.placeholder = false) : null;
    this.subscription = this.YTS.getMoviesList(
      this.page,
      this.pageSize
    ).subscribe(
      res => {
        this.page++;
        this.movies = [...this.movies, ...res['movies']];
        this.loading = false;
        this.loading_i = false;
        e ? (this.placeholder = false) : null;
        this.error = false;
        if (e) {
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
    this.subscription = this.YTS.getMoviesByKeyword(keyword).subscribe(
      res => {
        this.loading = false;
        this.movies = [...res['movies'], ...this.movies];
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
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }
}
