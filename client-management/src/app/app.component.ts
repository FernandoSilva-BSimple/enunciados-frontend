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
  this.clients = this.clients.map(c => 
    c.id === client.id ? { ...c, ...client } : c
  );
}

}
