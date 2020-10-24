import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Cast, CastResponse } from '../interfaces/cast-response';

import { CaterleraResponse, Movie } from '../interfaces/catelera-response';
import { DetailResponse } from '../interfaces/movie-detail';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  public cargando = false;

  constructor(private http: HttpClient) { }

  getCartelera(page = 1): Observable<CaterleraResponse> {
    this.cargando = true;
    return this.http.get<CaterleraResponse>(`https://api.themoviedb.org/3/movie/now_playing?api_key=bd1f789d9e88337ce473bfe6d9e22ba0&language=es-ES&page=${page}`)
      .pipe(tap(() => this.cargando = false));
  }

  searchMovies(texto: string): Observable<Movie[]> {
    return this.http.get<CaterleraResponse>(`
    https://api.themoviedb.org/3/search/movie?api_key=bd1f789d9e88337ce473bfe6d9e22ba0&language=en-US&query=${texto}&page=1&include_adult=true`)
      .pipe(map(resp => resp.results));
  }

  getDetailMovie(id: string): Observable<DetailResponse> {
    return this.http.get<DetailResponse>(
      `https://api.themoviedb.org/3/movie/${id}?api_key=bd1f789d9e88337ce473bfe6d9e22ba0&language=es-ES`);
  }

  getCast(id: string): Observable<Cast[]> {
    return this.http.get<CastResponse>(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=bd1f789d9e88337ce473bfe6d9e22ba0`)
      .pipe(map(resp => resp.cast));
  }

}
