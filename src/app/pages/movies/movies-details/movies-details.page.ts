import { Component, OnInit, OnDestroy } from '@angular/core';
import { YtsService } from '../../../services/yts.service';
import { ActivatedRoute } from '@angular/router';
import { ParamMap } from '@angular/router';
import { UiServiceService } from '../../../services/ui-service.service';
import { MovieDownloadModalPage } from '../movie-download-modal/movie-download-modal.page';
import { IonRouterOutlet, IonSlides, IonSlide } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { PopcornService } from 'src/app/services/popcorn.service';

@Component({
  selector: 'app-movies-details',
  templateUrl: './movies-details.page.html',
  styleUrls: ['./movies-details.page.scss'],
})
export class MoviesDetailsPage implements OnInit, OnDestroy {
  movie: any;
  loading: boolean;
  error: boolean;
  parms: Subscription;
  Id: any;
  img_id;
  fanart;
  subscription: Subscription;
  Image_subscription: Subscription;

  sliderConfig = {
    slidesPerView: 2,
    spaceBetween: 10,
  };

  constructor(
    private route: ActivatedRoute,
    private YTS: YtsService,
    private UI: UiServiceService,
    private router: IonRouterOutlet,
    private sanitizer: DomSanitizer,
    private popcorn: PopcornService
  ) {}

  ngOnInit() {
    // this the id of the movie form the route
    this.parms = this.route.paramMap.subscribe((params: ParamMap) => {
      const imdb_id = params.get('imdb_id');
      this.img_id = params.get('id');
      this.Id = imdb_id;
    });

    this.showDetails(this.Id);
    this.showImages();
  }

  showDetails(id) {
    this.loading = true;
    this.error = false;

    this.subscription = this.YTS.getMovieDetails(id).subscribe(
      res => {
        this.movie = res['movie'];
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

  showImages() {
    this.Image_subscription = this.popcorn
      .getMovieDetails(this.img_id.substr(2))
      .subscribe(res => {
        this.fanart = res;
        console.log(res);
      });
  }

  setBackground(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  showDownloadModal(data) {
    this.UI.modal(data, MovieDownloadModalPage);
  }

  doRefresh(e) {
    this.showDetails(this.Id);
    e.target.complete();
  }

  download(url) {
    console.log(url);
    window.open(url, '_system', 'location=yes');
  }

  back() {
    this.router.canGoBack();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.parms.unsubscribe();
    this.Image_subscription.unsubscribe();
  }
}
