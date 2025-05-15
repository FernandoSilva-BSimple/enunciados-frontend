import { Component } from '@angular/core';
import { ClientsListComponent } from './clients-list/clients-list.component';
import { ClientsFormComponent } from './clients-form/clients-form.component';
import { ClientsData } from './clients.data';
import { Client } from './client';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [ClientsListComponent, ClientsFormComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'client-management';

  clients = ClientsData.clients;
  selectedClient?: Client;
  showForm = false;

  openForm(client?: Client) 
  {
    this.selectedClient = client;
    this.showForm = true;

  }

 updateClient(client: Client) {
  if (client.id === 0) {
    const newId = this.clients.length > 0 ? Math.max(...this.clients.map(c => c.id)) + 1 : 1;
    client.id = newId;
    this.clients.push(client);

  } else {

    this.clients = this.clients.map(c => 
      c.id === client.id ? { ...c, ...client } : c
    );
  }

  this.showForm = false;

}}
