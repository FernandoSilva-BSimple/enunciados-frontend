import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteMoviesListComponent } from './favorite-movies-list.component';

describe('FavoriteMoviesListComponent', () => {
  let component: FavoriteMoviesListComponent;
  let fixture: ComponentFixture<FavoriteMoviesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoriteMoviesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoriteMoviesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have title <h2> Favorite Movies', () => {
    const bannerElement : HTMLElement = fixture.nativeElement ;
    const p = bannerElement.querySelector('h2')!;
    expect(p.textContent).toEqual('Favorite Movies');
  })

  it('shouldnt have <td> when no favorite movies' , () => {
    const bannerElement : HTMLElement = fixture.nativeElement;
    const td = bannerElement.querySelector('td');
    expect(td).toBeFalsy;
  })

  it('should show "Sem filmes favoritos" when no favorite movies', () => {
    const bannerElement : HTMLElement = fixture.nativeElement;
    const p = bannerElement.querySelector('p')!;
    expect(p.textContent).toEqual("Sem filmes favoritos.")
  })

  it('should have <td> when there are favorite movies', () => {
    component.favoriteMovies = [
      {id: 1, name: 'The avengers', isFavorite: true},
      {id: 2, name: 'The trolls', isFavorite: true},
    ];

    fixture.detectChanges();

    const bannerElement : HTMLElement = fixture.nativeElement;
    const p = bannerElement.querySelectorAll('p')!;
    expect(p[0].textContent).toContain('The avengers');
  })

  it('should have <td> with The avengers', async () => {
    const favoriteMovieDouble = [
      {id: 3, name: "The avengers", isFavorite:true}
    ]

    fixture.componentRef.setInput('favoriteMovies', favoriteMovieDouble);

    fixture.detectChanges();

    const bannerElement: HTMLElement = fixture.nativeElement;
    const p = bannerElement.querySelectorAll('p');
    expect(p[0].textContent).toEqual("The avengers");
  })
});
