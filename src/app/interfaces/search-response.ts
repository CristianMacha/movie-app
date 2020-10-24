export interface SearchResponse {
    page: number;
    total_results: number;
    total_pages: number;
    results: Result[];
}

export interface Result {
    popularity: number;
    vote_count: number;
    video: boolean;
    poster_path: null | string;
    id: number;
    adult: boolean;
    backdrop_path: null | string;
    original_language: OriginalLanguage;
    original_title: string;
    genre_ids: number[];
    title: string;
    vote_average: number;
    overview: string;
    release_date: Date;
}

export enum OriginalLanguage {
    En = 'en',
}
