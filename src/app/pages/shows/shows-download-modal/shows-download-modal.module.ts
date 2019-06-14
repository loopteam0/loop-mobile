import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ShowsDownloadModalPage } from './shows-download-modal.page';
import { SharedModule } from 'src/shared/shared.module';
import { NgArrayPipesModule } from 'ngx-pipes';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    NgArrayPipesModule
  ],
  declarations: [ShowsDownloadModalPage],
  entryComponents: [ShowsDownloadModalPage]
})
export class ShowsDownloadModalPageModule {}
