import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PopcornService } from '../../../services/popcorn.service';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-shows-list',
  templateUrl: './shows-list.page.html',
  styleUrls: ['./shows-list.page.scss']
})
export class ShowsListPage implements OnInit {
  Shows: Array<any> = [];
  loading: boolean;
  error: boolean;
  page = 1;
  placeholer = false;
  enableSearch: boolean;
  fab: boolean;

  @ViewChild(IonContent) contentArea: IonContent;
  scrollPosition: number;
  constructor(
    private popcorn: PopcornService,
    private route: Router,
    private UI: UiServiceService
  ) {}

  ngOnInit() {
    this.showShows();
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

  async showShows(e?: any) {
    console.log(this.page);

    this.loading = true;
    this.error = false;
    e ? (this.placeholer = true) : null;
    await this.popcorn.getShowsList(this.page).subscribe(
      res => {
        this.page++;
        this.Shows = [...this.Shows, ...res];
        this.loading = false;
        this.error = false;
        e ? (this.placeholer = false) : null;
        // e ? e.target.complete : null;
        if (e) {
          e.target.complete();
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

  async search(keyword: string) {
    this.loading = true;
    this.error = false;
    this.contentArea.scrollToTop(1500);
    this.popcorn.getShowsByKeyword(keyword).subscribe(
      res => {
        this.Shows = [...res, ...this.Shows];
        this.loading = false;
        this.error = false;
      },
      error => {
        this.loading = false;
        this.error = true;
        this.UI.presentAlert('Error', error);
      }
    );
  }

  togleSearch() {
    this.enableSearch = !this.enableSearch;
  }

  ionScroll($event) {
    this.scrollPosition = $event.detail.currentY;
    this.fab = false;
  }

  ionScrollEnd($event?) {
    if (this.scrollPosition > 1000) {
      this.fab = true;
    } else {
      this.fab = false;
    }
  }

  scrollTo() {
    this.contentArea.scrollToTop(2000);
  }

  ionClear() {
    this.togleSearch();
  }

  onNavigate(id: any) {
    this.route.navigate([`/tabs/shows-list/${id}`]);
  }
}
