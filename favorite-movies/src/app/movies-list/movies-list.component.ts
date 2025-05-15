import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Movie } from '../movie';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movies-list',
  imports: [CommonModule],
  templateUrl: './movies-list.component.html',
  styleUrl: './movies-list.component.css'
})
export class MoviesListComponent {
@Input() movies: Movie[] = [];
@Output() toggledFavoriteMovie = new EventEmitter<Movie | undefined>

toggleFavoriteMovie(movie : Movie)
{
  this.toggledFavoriteMovie.emit(movie);
}
}
