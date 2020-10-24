import { Component, HostListener, OnInit } from '@angular/core';

import { MoviesService } from 'src/app/services/movies.service';

import { Movie } from 'src/app/interfaces/catelera-response';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public movies: Movie[] = [];
  public moviesSlideShow: Movie[] = [];

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + 1300;
    const max = (document.documentElement.scrollHeight || document.body.scrollHeight);

    let page = 2;

    if (pos > max) {
      if (this.movieService.cargando) { return; }
      this.movieService.getCartelera(page)
        .subscribe(
          (data) => {
            this.movies.push(...data.results);
            page += 1;
          }
        );
    }
  }

  constructor(private movieService: MoviesService) {
    this.movieService.getCartelera()
      .subscribe(
        (data) => { this.movies = data.results; this.moviesSlideShow = data.results; },
        (error) => console.error(error)
      );
  }

  ngOnInit(): void {
  }

}
