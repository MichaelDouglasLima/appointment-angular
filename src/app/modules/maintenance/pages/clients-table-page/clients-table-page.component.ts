import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/core/models/client';
import { Page } from 'src/app/core/models/page';
import { ClientService } from 'src/app/core/services/client.service';

@Component({
  selector: 'app-clients-table-page',
  templateUrl: './clients-table-page.component.html',
  styleUrls: ['./clients-table-page.component.css'],
})
export class ClientsTablePageComponent implements OnInit {
  clientPage: Page<Client> = {} as Page<Client>;
  page = 1;
  nameFilter: string = '';

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.clientService.getClients(this.nameFilter, this.page).subscribe({
      next: (response) => {
        ((this.clientPage.content = response.body),
          (this.clientPage.numberOfElements = parseInt(
            response.headers.get('X-Total-Count') || '0',
          )));
      },
    });
  }

  pageChange() {
    this.loadClients();
  }

  filterName() {
    this.loadClients();
  }

  delete(client: Client): void {
    this.clientService.delete(client).subscribe({
      next: () => {
        // this.clients = this.clients.filter((c) => c.id !== client.id); //OR... this.loadClients()
        this.loadClients();
      },
      error: () => {
        alert('Erro ao remover o cliente!');
      },
    });
  }
}
