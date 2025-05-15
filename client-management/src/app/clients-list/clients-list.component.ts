import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Client } from '../client';

@Component({
  selector: 'app-clients-list',
  imports: [CommonModule],
  templateUrl: './clients-list.component.html',
  styleUrl: './clients-list.component.css'
})
export class ClientsListComponent {
  @Input() clients: Client[] = [];
  @Output() selectedClient = new EventEmitter<Client | undefined>;
  addMode?: boolean;

  selectClient(client: Client)
  {
    this.selectedClient.emit(client);
  }
  
  addClient()
  {
      this.selectedClient.emit(undefined);
  }
}
