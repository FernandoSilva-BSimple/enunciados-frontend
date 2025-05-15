import { Component, Input, OnChanges, OnInit, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Client } from '../client';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-clients-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './clients-form.component.html',
  styleUrl: './clients-form.component.css'
})
export class ClientsFormComponent implements OnInit, OnChanges {
  @Input() client?: Client;
  @Output() clientSaved = new EventEmitter<Client>();  

  
  clientForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.clientForm = this.fb.group({
      id: [0],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });

    if (this.client) {
      this.clientForm.patchValue({
        id: this.client.id,
        name: this.client.name,
        email: this.client.email
      });
  }
}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['client'] && this.clientForm) {
      this.clientForm.patchValue({
        id: this.client?.id || 0,
        name: this.client?.name || '',
        email: this.client?.email || ''
      });
    }
  }

  save(): void {
    if (this.clientForm.valid) {
      const client: Client = this.clientForm.value;
      console.log('Form data:', client);
      this.clientSaved.emit(client);
    }
  }
}
