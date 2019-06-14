import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MoviesInt } from './interface';
import { catchError, retry, retryWhen, delay, timeout } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieDbService {
  constructor(private httpClient: HttpClient) {}

  baseUrl = environment.MOVIEDB_APIURL;
  apiKey = environment.MOVIEDB_APIKEY;

  // example
  // https://api.themoviedb.org/3/movie/550?api_key=c3a07ff98aaeb2065ebee321bf08d23a
  // https://api.themoviedb.org/3/tv/latest?api_key

  /** error handling */
  private handleError(error: HttpErrorResponse) {
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
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened, check internet connection and retry.'
    );
  }

  getDetails(id, type): Observable<MoviesInt> {
    const url = `${this.baseUrl}/${type}/${id}?api_key=${this.apiKey}`;
    const request = this.httpClient.get<MoviesInt>(url);

    return request;
  }

  getLatest(type, page): Observable<any> {
    const url = `${this.baseUrl}/${type}/latest?api_key=${
      this.apiKey
    }&page=${page}&language=en-US`;
    const request = this.httpClient.get(url).pipe(
      timeout(30000),
      retry(2), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );

    return request;
  }

  getOnAir(type, page): Observable<MoviesInt> {
    const url = `${this.baseUrl}/${type}/on_the_air?api_key=${
      this.apiKey
    }&page=${page}&language=en-US`;
    const request = this.httpClient.get<MoviesInt>(url).pipe(
      timeout(30000),
      retry(2), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );

    return request;
  }
  getUpcoming(page): Observable<MoviesInt> {
    const url = `${this.baseUrl}/movie/upcoming?api_key=${
      this.apiKey
    }&page=${page}&language=en-US`;
    const request = this.httpClient.get<MoviesInt>(url).pipe(
      timeout(30000),
      retry(2), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );

    return request;
  }
  getAiringToday(type, page): Observable<MoviesInt> {
    const url = `${this.baseUrl}/${type}/airing_today?api_key=${
      this.apiKey
    }&page=${page}&language=en-US`;
    const request = this.httpClient.get<MoviesInt>(url).pipe(
      timeout(30000),
      retry(2), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );

    return request;
  }

  getNowPlaying(page): Observable<MoviesInt> {
    const url = `${this.baseUrl}/movie/now_playing?api_key=${
      this.apiKey
    }&page=${page}&region=US`;
    const request = this.httpClient.get<MoviesInt>(url).pipe(
      timeout(30000),
      retry(2), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );

    return request;
  }

  getPopular(type, page): Observable<any> {
    const url = `${this.baseUrl}/${type}/popular?api_key=${
      this.apiKey
    }&page=${page}&language=en-US`;
    const request = this.httpClient.get(url).pipe(
      timeout(30000),
      retry(2), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );

    return request;
  }

  getTopRated(type, page): Observable<MoviesInt> {
    const url = `${this.baseUrl}/${type}/top_rated?api_key=${
      this.apiKey
    }&page=${page}&adult=false&region=US`;
    const request = this.httpClient.get<MoviesInt>(url).pipe(
      timeout(30000),
      retry(2), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );

    return request;
  }
  getSimilar(type, page): Observable<any> {
    const url = `${this.baseUrl}/${type}/similar?api_key=${
      this.apiKey
    }&page=${page}&adult=false&language=en-US`;
    const request = this.httpClient.get(url).pipe(
      timeout(30000),
      retry(2), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );

    return request;
  }

  searchKeyword(keyword, type, page): Observable<any> {
    const url = `${this.baseUrl}/search/${type}?api_key=${
      this.apiKey
    }&query=${keyword}&page=${page}&adult=false&language=en-US`;
    const request = this.httpClient.get(url).pipe(
      timeout(30000),
      map(res => res['results']),
      retry(2), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );

    return request;
  }
  SearchAll(keyword, page): Observable<any> {
    const url = `${this.baseUrl}/search/multi?api_key=${
      this.apiKey
    }&query=${keyword}&page=${page}&language=en-US`;
    const request = this.httpClient.get(url).pipe(
      timeout(30000),
      retry(2), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );

    return request;
  }

  find(id): Observable<any> {
    const url = `${this.baseUrl}/find/${id}?api_key=${
      this.apiKey
    }&external_source=imdb_id&adult=false&language=en-US`;
    const request = this.httpClient.get(url).pipe(
      timeout(30000),
      retry(2), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );

    return request;
  }
}
