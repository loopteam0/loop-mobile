import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AnimeDownloadModalPage } from './anime-download-modal.page';
import { NgPipesModule } from 'ngx-pipes';

@NgModule({
  imports: [NgPipesModule, CommonModule, FormsModule, IonicModule],
  declarations: [AnimeDownloadModalPage],
  entryComponents: [AnimeDownloadModalPage]
})
export class AnimeDownloadModalPageModule {}
