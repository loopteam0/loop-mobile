import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-movie-download-modal',
  templateUrl: './movie-download-modal.page.html',
  styleUrls: ['./movie-download-modal.page.scss'],
})
export class MovieDownloadModalPage implements OnInit {
  data;

  constructor(public modalController: ModalController) { }

  ngOnInit() {
  }


  closeSlf() {
    this.modalController.dismiss();
  }
}
