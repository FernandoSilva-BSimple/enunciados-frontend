import { Component, Input } from '@angular/core';
import { Collaborator } from '../../model/Collaborator';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-collaborator-details',
  imports: [FormsModule],
  templateUrl: './collaborator-details.component.html',
  styleUrl: './collaborator-details.component.css'
})
export class CollaboratorDetailsComponent {

  @Input() collaborator: Collaborator | undefined;

}
