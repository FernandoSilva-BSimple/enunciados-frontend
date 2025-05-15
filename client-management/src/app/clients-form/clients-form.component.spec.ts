import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientsFormComponent } from './clients-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Client } from '../client';

describe('ClientsFormComponent', () => {
  let component: ClientsFormComponent;
  let fixture: ComponentFixture<ClientsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientsFormComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ClientsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create ClientsFormComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with client data', () => {
    const mockClient: Client = { id: 1, name: 'Test Client', email: 'test@email.com' };

    component.client = mockClient;
    component.ngOnChanges({ client: { currentValue: mockClient, previousValue: null, isFirstChange: () => true, firstChange: true } });
    fixture.detectChanges();

    expect(component.clientForm.value.name).toBe('Test Client');
  });

  it('should emit clientSaved when form is valid and save is called', () => {
    spyOn(component.clientSaved, 'emit');

    component.clientForm.setValue({ id: 0, name: 'New Client', email: 'new@email.com' });
    component.save();

    expect(component.clientSaved.emit).toHaveBeenCalledWith(jasmine.objectContaining({ name: 'New Client' }));
  });

  it('should not emit if form is invalid', () => {
    spyOn(component.clientSaved, 'emit');

    component.clientForm.setValue({ id: 0, name: '', email: '' });
    component.save();

    expect(component.clientSaved.emit).not.toHaveBeenCalled();
  });
});
