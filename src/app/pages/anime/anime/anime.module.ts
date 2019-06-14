import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AnimePage } from './anime.page';
import { NgPipesModule } from 'ngx-pipes';

const routes: Routes = [
  {
    path: '',
    component: AnimePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    NgPipesModule
  ],
  declarations: [AnimePage]
})
export class AnimePageModule {}
