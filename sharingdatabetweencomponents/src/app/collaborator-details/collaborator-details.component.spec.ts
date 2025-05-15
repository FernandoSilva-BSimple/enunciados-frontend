/// <reference types="jasmine" />

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaboratorDetailsComponent } from './collaborator-details.component';

describe('ColaboratorDetailsComponent', () => {
  let component: CollaboratorDetailsComponent;
  let fixture: ComponentFixture<CollaboratorDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollaboratorDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollaboratorDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have <p> with "No collaborator selected."', () => {
    const bannerElement: HTMLElement = fixture.nativeElement;
    const p = bannerElement.querySelector('p')!;
    expect(p.textContent).toEqual('No collaborator selected.');
  });

  it('shouldn´t have <form>', () => {
    const bannerElement: HTMLElement = fixture.nativeElement;
    const form = bannerElement.querySelector('form')!;
    expect(form).toBeFalsy();
  });

  it('should have <form> with "John Doe" if setting the class property', async () => {

    // arrange
    // setting the property value OOP-style
    component.collaborator = { id: 1, name: 'John Doe' };

    // act
    // force Angular to update the view
    fixture.detectChanges();

    // because [(ngModel)] is asynchronous, it is necessary to wait for updating the view
    await fixture.whenStable();

    // assert
    const bannerElement: HTMLElement = fixture.nativeElement;
    const forms = bannerElement.querySelectorAll('form')!;
    const input = bannerElement.querySelectorAll('input')!;

    expect(forms.length).toEqual(1);
    expect(input[0].value).toEqual('1');
    expect(input[1].value).toEqual('John Doe');
  });

  it('should have <input> with "Maria Nazaré" if setting @Input', async () => {

    const collaboratorDouble = { id: 3, name: 'Maria Nazaré' };
    
    // simulate the parent setting the @Input property with that colaboratorsDouble
    fixture.componentRef.setInput('collaborator', collaboratorDouble);

    // act
    // force Angular to update the view
    fixture.detectChanges();

    // because [(ngModel)] is asynchronous, it is necessary to wait for updating the view
    await fixture.whenStable();

    // assert    
    // querying the form by input's id, instead of type
    const idInput = fixture.nativeElement.querySelector('#id') as HTMLInputElement;
    const nameInput = fixture.nativeElement.querySelector('#name') as HTMLInputElement;
    expect(idInput.value).toBe('3');
    expect(nameInput.value).toBe('Maria Nazaré');
  });
});
