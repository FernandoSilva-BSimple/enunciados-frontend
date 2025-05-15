import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ClientsListComponent } from './clients-list/clients-list.component';
import { ClientsFormComponent } from './clients-form/clients-form.component';
import { CommonModule } from '@angular/common';

describe('AppComponent', () => {

  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, ClientsListComponent, ClientsFormComponent, CommonModule]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create AppComponent', () => {
    expect(component).toBeTruthy();
  });

  it(`should have the title 'client-management'`, () => {
    expect(component.title).toEqual('client-management');
  });

  it('should open the form when a client is selected from the list', () => {
    // encontrar o ClientsListComponent
    const listComponent = fixture.debugElement.query(By.directive(ClientsListComponent))?.componentInstance;

    // criar um cliente falso
    const testClient = { id: 1, name: 'Test Client', email: 'test@email.com' };

    // emitir o evento como se o botão "Edit" tivesse sido clicado
    listComponent.selectedClient.emit(testClient);
    fixture.detectChanges();

    expect(component.selectedClient).toEqual(testClient);
    expect(component.showForm).toBeTrue();

    // verificar se o ClientsFormComponent apareceu
    const formComponent = fixture.debugElement.query(By.directive(ClientsFormComponent));
    expect(formComponent).toBeTruthy();
  });

  it('should add a new client when saving a new client from the form', () => {
    const initialLength = component.clients.length;

    // encontrar o ClientsListComponent
    const listComponent = fixture.debugElement.query(By.directive(ClientsListComponent))?.componentInstance;

    // simular clique no botão "Add Client"
    listComponent.selectedClient.emit({ id: 0, name: '', email: '' });
    fixture.detectChanges();

    const formComponent = fixture.debugElement.query(By.directive(ClientsFormComponent))?.componentInstance;

    // emitir evento de save com dados preenchidos
    const newClient = { id: 0, name: 'New Client', email: 'newclient@email.com' };
    formComponent.clientSaved.emit(newClient);
    fixture.detectChanges();

    expect(component.clients.length).toBe(initialLength + 1);
    expect(component.clients.some(c => c.name === 'New Client')).toBeTrue();
    expect(component.showForm).toBeFalse();
  });

  it('should update an existing client when saving edited client from the form', () => {
    const existingClient = component.clients[0];
    const updatedClient = { ...existingClient, name: 'Updated Name' };

    // encontrar o ClientsListComponent
    const listComponent = fixture.debugElement.query(By.directive(ClientsListComponent))?.componentInstance;

    // simular seleção do cliente existente
    listComponent.selectedClient.emit(existingClient);
    fixture.detectChanges();

    const formComponent = fixture.debugElement.query(By.directive(ClientsFormComponent))?.componentInstance;

    // emitir evento de salvar cliente atualizado
    formComponent.clientSaved.emit(updatedClient);
    fixture.detectChanges();

    const clientInList = component.clients.find(c => c.id === existingClient.id);
    expect(clientInList?.name).toBe('Updated Name');
    expect(component.showForm).toBeFalse();
  });

  it('should render clients in the list', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const tableRows = compiled.querySelectorAll('tbody tr');
    expect(tableRows.length).toBe(component.clients.length);
  });

});
