import { Component, Input } from '@angular/core';
import { Movie } from '../movie';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favorite-movies-list',
  imports: [CommonModule],
  templateUrl: './favorite-movies-list.component.html',
  styleUrl: './favorite-movies-list.component.css'
})
export class FavoriteMoviesListComponent {

  @Input() favoriteMovies : Movie[] = [];

}
