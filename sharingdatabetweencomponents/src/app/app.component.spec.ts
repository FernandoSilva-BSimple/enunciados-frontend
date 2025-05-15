import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CollaboratorsListComponent } from './collaborators-list/collaborators-list.component';
import { CollaboratorDetailsComponent } from './collaborator-details/collaborator-details.component';

describe('AppComponent', () => {

  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, CollaboratorsListComponent, CollaboratorDetailsComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have the 'Sharing Data between Components' title`, () => {
    expect(component.title).toEqual('Sharing Data between Components');
  });

  it('should render title', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Examples');
  });

  // NB: this test does not respects the data in AppComponent
  it('should update selected collaborator when list emits selection', () => {
    // Find the stubbed list component
    const listComponent: CollaboratorsListComponent = fixture.debugElement.query(By.directive(CollaboratorsListComponent))?.componentInstance;

    // Simulate selection
    const testCollaborator = { id: 1, name: 'Maria Nazaré' };
    listComponent.collaboratorSelected.emit(testCollaborator);
    fixture.detectChanges();

    // Check that AppComponent updated its selection
    expect(component.selectedCollaborator).toEqual(testCollaborator);

    // Check that the details component received the input
    const detailsComponent: CollaboratorDetailsComponent = fixture.debugElement.query(By.directive(CollaboratorDetailsComponent)).componentInstance;

    expect(detailsComponent.collaborator).toEqual(testCollaborator);
  });

  // NB: instead, this test respects the data in AppComponent
  it('should update selected collaborator when CollaboratorListComponent.selectedCollaborator() is called', () => {
      // Find the stubbed list component
      const listComponent: CollaboratorsListComponent = fixture.debugElement.query(By.directive(CollaboratorsListComponent))?.componentInstance;

      // Simulate selection
      listComponent.selectedCollaborator(1);
      fixture.detectChanges();

    const testCollaborator = { id: 1, name: 'John Doe' }; // This is the first collaborator hardcoded in the AppComponent

    // Check that AppComponent updated its selection
    expect(component.selectedCollaborator).toEqual(testCollaborator);

    // Check that the details component received the input
    const detailsComponent: CollaboratorDetailsComponent = fixture.debugElement.query(By.directive(CollaboratorDetailsComponent)).componentInstance;

    expect(detailsComponent.collaborator).toEqual(testCollaborator);

    const bannerElement: HTMLElement = fixture.nativeElement;
    const td = bannerElement.querySelectorAll('td')!;
    expect(td[1].textContent).toEqual('John Doe');
  });

  it('should reflect changes made in collaborator details back to the list', () => {
    const testCollaborator = { id: 1, name: 'Maria Nazaré' };
    component.collaborators = [testCollaborator];
    component.selectedCollaborator = testCollaborator;
    fixture.detectChanges();

    // Simulate editing in the details component
    const detailsComponent = fixture.debugElement
      .query(By.directive(CollaboratorDetailsComponent)).componentInstance;

    detailsComponent.collaborator.name = 'Maria Madalena'; // change shared object
    fixture.detectChanges();

    // Now verify the change is visible from the list perspective
    const listDebugComponent = fixture.debugElement.query(By.directive(CollaboratorsListComponent));
    const listNativeComponent = listDebugComponent.nativeElement as HTMLElement;

    const tdElements = listNativeComponent.querySelectorAll('td');
    expect(tdElements[1].textContent).toContain('Maria Madalena');
  });


  it('should reflect changes on list occurring upon click button', async () => {

    const listDebugComponent = fixture.debugElement.query(By.directive(CollaboratorsListComponent));
    const listNativeComponent = listDebugComponent.nativeElement as HTMLElement;

    // Find all buttons in the table
    const buttons = listNativeComponent.querySelectorAll('button');

    // act on the list component
    // Click the first button (you can add logic to pick the right one)
    buttons[0].click();
    fixture.detectChanges();
    await fixture.whenStable();

    // assert the change is visible from the details perspective
    // check that the details component received the input
    const detailsNativeComponent: HTMLElement = fixture.debugElement.query(By.directive(CollaboratorDetailsComponent)).nativeElement;

    const nameInput: HTMLInputElement = detailsNativeComponent.querySelector('#name')! as HTMLInputElement;
    expect(nameInput.value).toEqual('John Doe');
  });
});