import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesListComponent } from './movies-list.component';

describe('MoviesListComponent', () => {
  let component: MoviesListComponent;
  let fixture: ComponentFixture<MoviesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoviesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoviesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have <h2> with "Movies List"', () => {
    const bannerElement : HTMLElement = fixture.nativeElement;
    const p = bannerElement.querySelector('h2')!;
    expect(p.textContent).toEqual('Movies List');
  })

  it('should have table', () => {
    const bannerElement : HTMLElement = fixture.nativeElement;
    const table = bannerElement.querySelector('table')!;
    expect(table).toBeTruthy;
  })

  it('shouldt have <td>', () => {
    const bannerElement : HTMLElement = fixture.nativeElement;
    const td = bannerElement.querySelector('td');
    expect(td).toBeFalsy;
  })

  it('should have <td> with "The Avengers" if setting the class property', async () => {
    component.movies = [
      {id: 1, name:"The Avengers", isFavorite: false},
      {id: 2, name:"Harry Potter", isFavorite: false}
    ];

    fixture.detectChanges();

    const bannerElement : HTMLElement = fixture.nativeElement;
    const td = bannerElement.querySelectorAll('td')!;
    expect(td[1].textContent).toEqual('The Avengers');
  })

  it('should have <td> with "Lion King"' , async () => {
    const moviesDouble = [{id:3, name:"Lion King", isFavorite:true}]
    
    fixture.componentRef.setInput('movies', moviesDouble);

    fixture.detectChanges();

    const bannerElement: HTMLElement = fixture.nativeElement;
    const td = bannerElement.querySelectorAll('td')!;
    expect(td[1].textContent).toEqual('Lion King');

  })

  it('should have <td> with <button> "Remove from favs" when isFavorite is true' , async () => {

    const moviesDouble = [{id:3, name:"Lion King", isFavorite:true}]

    fixture.componentRef.setInput('movies', moviesDouble);

    fixture.detectChanges();

    const bannerElement: HTMLElement = fixture.nativeElement;
    const button = bannerElement.querySelector('button')!;
    expect(button.textContent).toEqual("Remove from favs");
  })

    it('should have <td> with <button> "Add to favs" when isFavorite is false' , async () => {

    const moviesDouble = [{id:3, name:"Lion King", isFavorite:false}]

    fixture.componentRef.setInput('movies', moviesDouble);

    fixture.detectChanges();

    const bannerElement: HTMLElement = fixture.nativeElement;
    const button = bannerElement.querySelector('button')!;
    expect(button.textContent).toEqual("Add to favs");
  })

  it('should emit when button is clicked', () => {
    const mockMovie = {id: 55, name: "Spider Man" , isFavorite: false}
    spyOn(component.toggledFavoriteMovie, 'emit');

    component.movies = [mockMovie];
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button');

    button.click();

    expect(component.toggledFavoriteMovie.emit).toHaveBeenCalledWith(mockMovie);
  })

  it('should emit toggledFavoriteMovie when toggleFavoriteMovie is called', () => {
    const mockMovie = {id: 55, name: "Spider Man" , isFavorite: false}
    const moviesDouble = [mockMovie];

    fixture.componentRef.setInput('movies', moviesDouble);

    spyOn(component.toggledFavoriteMovie, 'emit');

    component.toggleFavoriteMovie(mockMovie);

    expect(component.toggledFavoriteMovie.emit).toHaveBeenCalledWith(mockMovie);
  })
});
