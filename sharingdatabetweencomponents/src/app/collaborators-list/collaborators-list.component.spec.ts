import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaboratorsListComponent } from './collaborators-list.component';

describe('CollaboratorsListComponent', () => {
  let component: CollaboratorsListComponent;
  let fixture: ComponentFixture<CollaboratorsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollaboratorsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollaboratorsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have <h3> with "Collaborators List"', () => {
    const bannerElement: HTMLElement = fixture.nativeElement;
    const p = bannerElement.querySelector('h3')!;
    expect(p.textContent).toEqual('Collaborators List');
  });

  it('should have <table>', () => {
    const bannerElement: HTMLElement = fixture.nativeElement;
    const table = bannerElement.querySelector('table')!;
    expect(table).toBeTruthy();
  });

  it('shouldn´t have <td>', () => {
    const bannerElement: HTMLElement = fixture.nativeElement;
    const td = bannerElement.querySelector('td')!;
    expect(td).toBeFalsy();
  });

  it('should have <td> with "John Doe" if setting the class property', async () => {

    // setting the property value OOP-style
    component.collaborators = [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Smith' },
    ];

    // force Angular to update the view
    fixture.detectChanges();

    const bannerElement: HTMLElement = fixture.nativeElement;
    const td = bannerElement.querySelectorAll('td')!;
    expect(td[1].textContent).toEqual('John Doe');
  });

  it('should have <td> with "Maria Nazaré"', async () => {

    const collaboratorsDouble = [
      { id: 3, name: 'Maria Nazaré' },
    ];
    
    // simulate the parent setting the @Input property with that colaboratorsDouble
    fixture.componentRef.setInput('collaborators', collaboratorsDouble);

    // force Angular to update the view
    fixture.detectChanges();
    
    const bannerElement: HTMLElement = fixture.nativeElement;
    const td = bannerElement.querySelectorAll('td')!;
    expect(td[1].textContent).toEqual('Maria Nazaré');
  });

  it('should have <td> with <button>', async () => {

    const collaboratorsDouble = [
      { id: 3, name: 'Maria Nazaré' },
    ];
    
    // simulate the parent setting the @Input property with that colaboratorsDouble
    fixture.componentRef.setInput('collaborators', collaboratorsDouble);

    // force Angular to update the view
    fixture.detectChanges();

    const bannerElement: HTMLElement = fixture.nativeElement;
    const button = bannerElement.querySelector('button')!;
    expect(button.textContent).toEqual('Details');
  });

  // test the button click: the controller + the template
  it('should emit when button is clicked', () => {

    // arrange
    const mockCollaborator = { id: 33, name: 'Alice' };
    spyOn(component.collaboratorSelected, 'emit');

    component.collaborators = [mockCollaborator];
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button');

    // act
    button.click();

    // assert
    expect(component.collaboratorSelected.emit).toHaveBeenCalledWith(mockCollaborator);
  });

  it('should emit collaboratorSelected when selectCollaborator is called', () => {
    // arrange
    const mockCollaborator = { id: 33, name: 'Alice' };
    const collaboratorsDouble = [
      mockCollaborator
    ];

    // simulate the parent setting the @Input property with that colaboratorsDouble
    fixture.componentRef.setInput('collaborators', collaboratorsDouble);
    
    // no nee to force Angular to update the view, because we are not testing the template
    // fixture.detectChanges();

    spyOn(component.collaboratorSelected, 'emit');

    // act
    component.selectedCollaborator(33); // find the collaborator by id + emit, hence the need for populate the collaborators property + spy the emitter

    // assert
    expect(component.collaboratorSelected.emit).toHaveBeenCalledWith(mockCollaborator);
  });
});
