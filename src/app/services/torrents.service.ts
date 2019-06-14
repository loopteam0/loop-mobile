import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import {
  catchError,
  retry,
  retryWhen,
  debounceTime,
  delay,
  throttle,
} from 'rxjs/operators';
import { map, startWith, switchMap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { TorrentSearchApi } from 'torrent-search-api';
// tslint:disable-next-line:import-spacing

//const torrent = __non_webpack_require__('torrent-search-api');

@Injectable({
  providedIn: 'root',
})
export class TorrentsService {
  torrentApi: TorrentSearchApi;
  torrent: any;

  constructor() {
    this.torrentApi = window.require('torrent-search-api');
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      retryWhen(errors => errors.pipe(delay(1000)));
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, body was: ${error.status}`
      );
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened, Check internet connection and retry.'
    );
  }

  async getTorrents(title, cat, limit) {
    try {
      this.torrentApi.enableProvider('1337x');
      const torrents = await this.torrentApi.search(title, cat, limit);

      return torrents;
    } catch (error) {
      throwError(error);
    }
  }
}
