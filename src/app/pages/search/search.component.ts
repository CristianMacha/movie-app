import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/interfaces/catelera-response';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public movies: Movie[] = [];
  public texto = '';

  constructor(private activatedRouter: ActivatedRoute, private movieService: MoviesService) { }

  ngOnInit(): void {
    this.activatedRouter.params.subscribe(params => {
      this.texto = params.texto;
      this.movieService.searchMovies(this.texto)
        .subscribe(
          (data) => this.movies = data,
          (error) => console.error(error)
        );
    });
  }

}
