import { Component } from '@angular/core';
import { MoviesData } from './movies.data';
import { MoviesListComponent } from "./movies-list/movies-list.component";
import { FavoriteMoviesListComponent } from "./favorite-movies-list/favorite-movies-list.component";
import { Movie } from './movie';

@Component({
  selector: 'app-root',
  imports: [MoviesListComponent, FavoriteMoviesListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'favorite-movies';

  movies = MoviesData.movies;

  favoriteMovies = this.movies.filter(m => m.isFavorite);

  selectedMovie?: Movie;
  
  toggleMovie(movie?: Movie) {
  if (!movie) {
    return;
  }
    this.selectedMovie = movie;
    movie.isFavorite = !movie.isFavorite;
    this.favoriteMovies = this.movies.filter(m => m.isFavorite);
  }
}
