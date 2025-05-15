import { Component } from '@angular/core';
import { CollaboratorsListComponent } from './collaborators-list/collaborators-list.component';
import { Collaborator } from '../model/Collaborator';
import { CollaboratorDetailsComponent } from "./collaborator-details/collaborator-details.component";

@Component({
  selector: 'app-root',
  imports: [CollaboratorsListComponent, CollaboratorDetailsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Sharing Data between Components';

  collaborators: Collaborator[] = [];
  selectedCollaborator: Collaborator | undefined = undefined;

  constructor() {
    this.collaborators = [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Smith' },
    ]
  }

  selectCollaborator($event: Collaborator) {
    this.selectedCollaborator = $event;
  }
}
