import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Client } from 'src/app/core/models/client';
import { ClientService } from 'src/app/core/services/client.service';

@Component({
  selector: 'app-client-form-page',
  templateUrl: './client-form-page.component.html',
  styleUrls: ['./client-form-page.component.css'],
})
export class ClientFormPageComponent {
  clientForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private clientService: ClientService,
    private location: Location,
  ) {
    this.clientForm = this.formBuilder.group({
      // id: {
      //   value: null,
      //   disabled: true,
      // },
      id: [''],
      name: ['', [Validators.required, Validators.minLength(3)]],
      phone: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]],
    });
  }

  save(): void {
    if (this.clientForm.valid) {
      this.clientService.save(this.clientForm.value).subscribe({
        next: () => {
          this.location.back();
        },
        error: () => {
          alert('Erro ao salvar o cliente!');
        },
      });
    }
  }

  // save(ngFormClient: any) {
  //   Object.assign(this.client, this.clientForm.value);

  //   if (this.clientForm.valid) {
  //     this.clientService.save(this.client).subscribe({
  //       next: () => {
  //         alert('Usuário cadastrado com sucesso!');
  //         ngFormClient.resetForm();
  //       },
  //       error: () => {
  //         alert('Ocorreu um erro ao salvar o usuário!');
  //       },
  //     });
  //   }
  // }

  cancel(): void {
    this.location.back();
  }

  get cfName() {
    return this.clientForm.get('name');
  }

  get cfPhone() {
    return this.clientForm.get('phone');
  }

  get cfDateOfBirth() {
    return this.clientForm.get('dateOfBirth');
  }
}
