import { Component, OnInit, OnDestroy } from '@angular/core';
import { YtsService } from '../../../services/yts.service';
import { ActivatedRoute } from '@angular/router';
import { ParamMap } from '@angular/router';
import { UiServiceService } from '../../../services/ui-service.service';
import { MovieDownloadModalPage } from '../movie-download-modal/movie-download-modal.page';
import {
  IonRouterOutlet,
  IonSlides,
  IonSlide,
  AlertController
} from '@ionic/angular';
import { map } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription, timer } from 'rxjs';
import { PopcornService } from 'src/app/services/popcorn.service';

@Component({
  selector: 'app-movies-details',
  templateUrl: './movies-details.page.html',
  styleUrls: ['./movies-details.page.scss']
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
    spaceBetween: 10
  };

  constructor(
    private route: ActivatedRoute,
    private YTS: YtsService,
    private UI: UiServiceService,
    private router: IonRouterOutlet,
    private sanitizer: DomSanitizer,
    private popcorn: PopcornService,
    public alertController: AlertController
  ) {}

  ngOnInit() {
    // this the id of the movie form the route
    this.parms = this.route.paramMap.subscribe((params: ParamMap) => {
      const imdb_id = params.get('imdb_id');
      this.Id = imdb_id;
    });

    this.showDetails(this.Id.substr(2));
    // this.showImages();
  }

  showDetails(id) {
    this.loading = true;
    this.error = false;

    this.subscription = this.popcorn.getMovieDetails(id).subscribe(
      res => {
        this.movie = res;
        this.fanart = res;
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

  setBackground(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  showDownloadModal(data) {
    this.UI.modal(data, MovieDownloadModalPage);
  }

  doRefresh() {
    this.showDetails(this.Id);
  }

  async download(torrent) {
    const alert = await this.alertController.create({
      header: 'File Info',
      message: `<p><strong>File size</strong>: ${torrent.filesize}</p>
                <p><strong>Seeds</strong>: ${torrent.seed}</p>
                <p><strong>Peers</strong>: ${torrent.peer}</p>
                <p><strong>Provider</strong>: ${torrent.provider}</p>`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {}
        },
        {
          text: 'Download',
          handler: _ => {
            this.UI.openLink(torrent.url);
          }
        }
      ]
    });

    await alert.present();
  }

  back() {
    this.router.canGoBack();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.parms.unsubscribe();
  }
}
