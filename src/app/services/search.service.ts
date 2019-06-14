import { Injectable } from '@angular/core';
import { Observable, interval, TimeoutError } from 'rxjs';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { MoviesInt } from './interface';
import {
  catchError,
  retry,
  retryWhen,
  debounceTime,
  delay,
  throttle,
  timeout
} from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  /// show
  eztv_url = environment.EZTV_URL;
  base_url = environment.POPCORN_URL;

  loading: any;

  constructor(private http: HttpClient) {}

  /**
   *  TODOs
   *  In the next version :
   *  0timize api loading speed in movies;
   */

  /** error handling */
  public handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      retryWhen(errors => errors.pipe(delay(500)));
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, body was: ${error.status}`
      );
    }

    if (error instanceof TimeoutError) {
      return throwError(
        `${error.message}: Check internet connection and retry.`
      );
    }
    // return an observable with a user-facing error message
    return throwError(
      `${
        error.name
      }: Something bad happened, Check internet connection and retry.`
    );
  }

  /** GET ANIMATIONS */
  getAnimesList(animePage: number): Observable<MoviesInt[]> {
    const url = `${
      this.base_url
    }/animes/${animePage}?sort=trending&order=-1&genre=all`;
    return this.http.get<MoviesInt[]>(url).pipe(
      timeout(20000),
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );
  }

  getAnimeDetails(imdb_id: string): Observable<MoviesInt[]> {
    const url = `${this.base_url}/anime/${imdb_id}`;
    return this.http.get<MoviesInt[]>(url).pipe(
      timeout(20000),
      retry(2), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );
  }

  getAnimesByKeyword(keyword: string): Observable<MoviesInt[]> {
    const url = `${
      this.base_url
    }/animes/1?sort=year&order=-1&genre=all&keywords=${keyword}`;
    return this.http.get<MoviesInt[]>(url).pipe(
      timeout(20000),
      retry(2), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );
  }

  getQuotes(): Observable<any> {
    const url = `http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1`;
    return this.http.get(url).pipe(
      throttle(() => interval(500)),
      debounceTime(500),
      retry(10)
    );
  }
}
