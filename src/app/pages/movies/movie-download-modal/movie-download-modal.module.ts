import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MovieDownloadModalPage } from './movie-download-modal.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  declarations: [MovieDownloadModalPage],
  entryComponents: [MovieDownloadModalPage]
})
export class MovieDownloadModalPageModule {}
