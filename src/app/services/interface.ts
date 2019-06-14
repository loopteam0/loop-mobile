export interface MoviesInt {
    Movies: any;
    imdb_id: number;
    synopsis: string;
    released: number;
    trailer: string;
    seed: number;
    peer: number;
    filesize: string;
    genres: Array<string>;
    provider: string;
    data: Object;
    type: String;
    id: number;
    url: string;
    imdb_code: string;
    title: string;
    title_long: string;
    year: number;
    rating: number;
    runtime: number;
    genre: Array<string>;
    summary: string;
    language: string;
    background_image: string;
    large_cover_image: string;
    medium_cover_image: string;
    torrents: Array<any>;
    date_uploaded: string;
    date_uploaded_unix: string;
    slug: string;
    yt_trailer_code: string;
    images: any;
    en: object;
    title_english: string;
    description_intro: string;
    results: Array<any>;
    total_results: any;
    original_name: string;
    last_episode_to_air: object;
    next_episode_to_air: any;
    networks: Array<any>;
}

export interface Quotes {
    quote: string;
    author: string;
}

