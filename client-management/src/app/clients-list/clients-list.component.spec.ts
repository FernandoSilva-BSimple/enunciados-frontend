import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientsListComponent } from './clients-list.component';
import { Client } from '../client';

describe('ClientsListComponent', () => {
  let component: ClientsListComponent;
  let fixture: ComponentFixture<ClientsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientsListComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ClientsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create ClientsListComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should emit selectedClient when selectClient is called', () => {
    const mockClient: Client = { id: 1, name: 'Client Test', email: 'client@test.com' };
    spyOn(component.selectedClient, 'emit');

    component.selectClient(mockClient);

    expect(component.selectedClient.emit).toHaveBeenCalledWith(mockClient);
  });

  it('should emit new client when addClient is called', () => {
    spyOn(component.selectedClient, 'emit');

    component.addClient();

    expect(component.selectedClient.emit).toHaveBeenCalledWith(jasmine.objectContaining({ id: 0 }));
  });

  it('should render clients in table', () => {
    component.clients = [
      { id: 1, name: 'Client1', email: 'client1@email.com' },
      { id: 2, name: 'Client2', email: 'client2@email.com' },
    ];

    fixture.detectChanges();

    const rows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(rows.length).toBe(2);
  });
});
