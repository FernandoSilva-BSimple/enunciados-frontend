import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Collaborator } from '../../model/Collaborator';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-collaborators-list',
  imports: [CommonModule],
  templateUrl: './collaborators-list.component.html',
  styleUrl: './collaborators-list.component.css'
})

export class CollaboratorsListComponent {
  @Input() collaborators: Collaborator[] = [];

  @Output() collaboratorSelected: EventEmitter<Collaborator> = new EventEmitter();

  selectedCollaborator(id: number) { 
    let collab: Collaborator | undefined = this.collaborators.find (collab => collab.id === id);

    if(collab) {
      this.collaboratorSelected.emit(collab);
    }
  }
}
