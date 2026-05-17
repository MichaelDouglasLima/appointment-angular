import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Client } from 'src/app/core/models/client';
import { ClientService } from 'src/app/core/services/client.service';

@Component({
  selector: 'app-client-form-page',
  templateUrl: './client-form-page.component.html',
  styleUrls: ['./client-form-page.component.css'],
})
export class ClientFormPageComponent {
  formGroupClient: FormGroup;

  client: Client = {} as Client;

  constructor(
    private formBuilder: FormBuilder,
    private clientService: ClientService,
  ) {
    this.formGroupClient = this.formBuilder.group({
      id: {
        value: null,
        disabled: true,
      },
      name: ['', [Validators.required, Validators.minLength(3)]],
      phone: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]],
    });
  }

  get cfgName() {
    return this.formGroupClient.get('name');
  }

  get cfgPhone() {
    return this.formGroupClient.get('phone');
  }

  get cfgDateOfBirth() {
    return this.formGroupClient.get('dateOfBirth');
  }

  save(ngFormClient: any) {
    Object.assign(this.client, this.formGroupClient.value);

    if (this.formGroupClient.valid) {
      this.clientService.save(this.client).subscribe({
        next: () => {
          alert('Usuário cadastrado com sucesso!');
          ngFormClient.resetForm();
          // this.client = {} as Client;
          //this.formGroupClient.reset();
          // this.client = {} as Client;
        },
        error: () => {
          alert('Ocorreu um erro ao salvar o usuário!');
        },
      });
    }
  }
}
