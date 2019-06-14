import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ShowsListPage } from './shows-list.page';
import { SharedModule } from 'src/shared/shared.module';
import { NgPipesModule } from 'ngx-pipes';

const routes: Routes = [
  {
    path: '',
    component: ShowsListPage
  }
];

@NgModule({
  imports: [
    NgPipesModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [ShowsListPage]
})
export class ShowsListPageModule {}
