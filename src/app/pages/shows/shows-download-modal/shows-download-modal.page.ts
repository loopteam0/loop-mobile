import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { OrderByPipe } from 'ngx-pipes';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { PopcornService } from 'src/app/services/popcorn.service';
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-shows-download-modal',
  templateUrl: './shows-download-modal.page.html',
  styleUrls: ['./shows-download-modal.page.scss'],
  providers: [DatePipe]
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
      name: 'Popcorn TV',
      value: 'popcorn'
    },
    {
      name: 'Eztv',
      value: 'eztv'
    }
  ];

  pageSize = 50;

  constructor(
    public modalController: ModalController,
    private UI: UiServiceService,
    private popcorn: PopcornService,
    private date: DatePipe,
    public alertController: AlertController
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
          this.loading = false;
          this.error = false;
          if (e) {
            e.target.complete();
          }
        },
        error => {
          this.loading = false;
          this.error = true;
          this.UI.presentAlert('Error', error);
          if (e) {
            e.target.complete();
          }
        }
      );
  }

  async showEpisodeDetails(type, e) {
    if (type === 'popcorn') {
      this.UI.presentAlert(`${e.title}`, e.overview, 'Overview');
    } else if (type === 'eztv') {
      const alert = await this.alertController.create({
        header: `Season ${e.season} Episode ${e.episode}`,
        subHeader: 'File Info',
        message: `<p><strong>Title</strong>: ${e.title}</p>
                  <p><strong>File Size</strong>: ${Math.round(
                    e.size_bytes * 8e-6
                  )} MB</p>
                  <p><strong>Seeds</strong>: ${e.seeds}</p>
                  <p><strong>Peers</strong>: ${e.peers}</p>
                  <p><strong>Date</strong>: ${this.date.transform(
                    e.date_released_unix * 1000,
                    'mediumDate'
                  )}</p>`,
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {}
          },
          {
            text: 'Download',
            handler: _ => {
              this.UI.openLink(e.magnet_url);
            }
          }
        ]
      });

      await alert.present();
    }
  }

  closeSlf() {
    this.modalController.dismiss();
  }

  download(url) {
    this.UI.openLink(url);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
