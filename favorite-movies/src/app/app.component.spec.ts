import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FavoriteMoviesListComponent } from './favorite-movies-list/favorite-movies-list.component';

describe('AppComponent', () => {

  let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, MoviesListComponent, FavoriteMoviesListComponent],
    }).compileComponents();

fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'favorite-movies' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('favorite-movies');
  });

  it('should update toggled movie when list emits selection', () => {
    const listComponent: MoviesListComponent = fixture.debugElement.query(By.directive(MoviesListComponent))?.componentInstance;

    const testMovie = {id: 1, name: "The avengers", isFavorite:true};
    listComponent.toggledFavoriteMovie.emit(testMovie);
    fixture.detectChanges();

    expect(component.selectedMovie).toEqual(testMovie);
    
  })
});
