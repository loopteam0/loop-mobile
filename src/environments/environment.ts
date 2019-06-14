// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  POPCORN_URL: 'https://tv-v2.api-fetch.website',
  EZTV_URL: 'https://eztv.io/api/get-torrents?imdb_id=',
  MOVIEDB_APIKEY: 'c3a07ff98aaeb2065ebee321bf08d23a',
  MOVIEDB_APIURL: 'https://api.themoviedb.org/3',
  YTS_API: 'https://yts.am/api/v2/',
  FANART_URL: 'http://webservice.fanart.tv/v3',
  FANART_APIKEY: '9835c7b65e0db4c3c367c14c9b596483'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
