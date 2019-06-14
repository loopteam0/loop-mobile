import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UiServiceService } from 'src/app/services/ui-service.service';

@Component({
  selector: 'app-anime-download-modal',
  templateUrl: './anime-download-modal.page.html',
  styleUrls: ['./anime-download-modal.page.scss']
})
export class AnimeDownloadModalPage implements OnInit {
  @Input() data: any;

  constructor(
    private modalController: ModalController,
    private UI: UiServiceService
  ) {}

  ngOnInit() {}

  closeSlf() {
    this.modalController.dismiss();
  }

  showEpisodeDetails(e) {
    this.UI.presentAlert(e.title, e.overview);
  }
}
