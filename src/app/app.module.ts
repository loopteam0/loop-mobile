import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NgArrayPipesModule } from 'ngx-pipes';
import { ShowsDownloadModalPageModule } from './pages/shows/shows-download-modal/shows-download-modal.module';
import { MovieDownloadModalPageModule } from './pages/movies/movie-download-modal/movie-download-modal.module';
import { AnimeDownloadModalPageModule } from './pages/anime/anime-download-modal/anime-download-modal.module';
import { IonicStorageModule } from '@ionic/storage';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],

  imports: [
    AnimeDownloadModalPageModule,
    ShowsDownloadModalPageModule,
    MovieDownloadModalPageModule,
    BrowserModule,
    HttpClientModule,
    NgArrayPipesModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    IonicStorageModule.forRoot({
      name: '_loopDB',
      driverOrder: ['sqlite', 'indexeddb', 'websql']
    })
  ],

  providers: [
    StatusBar,
    SplashScreen,
    InAppBrowser,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
