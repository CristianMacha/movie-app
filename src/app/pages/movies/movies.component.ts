import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cast } from 'src/app/interfaces/cast-response';
import { DetailResponse } from 'src/app/interfaces/movie-detail';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  public movie: DetailResponse;
  public cast: Cast[];

  constructor(
    private activatedRouter: ActivatedRoute,
    private movieService: MoviesService,
    private location: Location,
    private router: Router,
  ) { }

  ngOnInit(): void {
    const { id } = this.activatedRouter.snapshot.params;
    this.movieService.getDetailMovie(id)
      .subscribe(
        (data) => this.movie = data,
        (error) => this.router.navigate(['/home'])
      );

    this.movieService.getCast(id)
      .subscribe(
        (data) => this.cast = data,
        (error) => console.error(error)
      );
  }

  onRegresar(): void {
    this.location.back();
  }

}
