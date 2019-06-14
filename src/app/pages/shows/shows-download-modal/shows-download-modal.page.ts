import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { OrderByPipe } from 'ngx-pipes';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { PopcornService } from 'src/app/services/popcorn.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shows-download-modal',
  templateUrl: './shows-download-modal.page.html',
  styleUrls: ['./shows-download-modal.page.scss'],
  providers: [OrderByPipe]
})
export class ShowsDownloadModalPage implements OnInit, OnDestroy {
  @Input() data: any;
  subscription: Subscription;
  loading: boolean;
  error: boolean;
  downloadOpt: any;
  page = 1;
  Episodes: Array<any> = [];

  downloadOpts = [
    {
      name: 'Default'
    },
    {
      name: 'Eztv'
    }
  ];

  pageSize = 50;

  constructor(
    public modalController: ModalController,
    private UI: UiServiceService,
    private popcorn: PopcornService
  ) {}

  ngOnInit() {
    console.log(this.data);

    this.getShowEpisodes();
  }

  async getShowEpisodes(e?) {
    this.loading = true;
    this.error = false;
    this.subscription = this.popcorn
      .getShowEpisopse(this.data.imdb_id.substr(2), this.pageSize, this.page)
      .subscribe(
        res => {
          this.page++;
          this.Episodes = [...this.Episodes, ...res['torrents']];
          console.log(this.Episodes, this.Episodes.length);
          this.loading = false;
          this.error = false;
        },
        error => {
          this.loading = false;
          this.error = true;
          this.UI.presentAlert('Error', error);
        }
      );
    if (e) {
      e.target.complete();
    }
  }

  showEpisodeDetails(type, e) {
    if (type === 'default') {
      this.UI.presentAlert(e.title, e.overview);
    } else if (type === 'eztv') {
      this.UI.presentAlert(
        `Season ${e.season} Episode ${e.episode}`,
        `Seeds: ${e.seeds} \n Peers: ${e.peers}`
      );
    }
  }

  closeSlf() {
    this.modalController.dismiss();
  }

  download(url) {
    this.UI.checkAppAvailability('bittorrent', 'Bittorrent');
    this.UI.openFile(url);
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }
}
