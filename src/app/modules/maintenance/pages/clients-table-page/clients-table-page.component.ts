import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/core/models/client';
import { ClientService } from 'src/app/core/services/client.service';

@Component({
  selector: 'app-clients-table-page',
  templateUrl: './clients-table-page.component.html',
  styleUrls: ['./clients-table-page.component.css'],
})
export class ClientsTablePageComponent implements OnInit {
  clients: Client[] = [];
  nameFilter: string = '';

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.clientService.getClients(this.nameFilter).subscribe({
      next: (clients) => (this.clients = clients),
    });
  }

  filterName() {
    this.loadClients();
  }

  remove(client: Client): void {
    this.clientService.deleteClient(client).subscribe({
      next: () => {
        this.clients = this.clients.filter((c) => c.id !== client.id); //OR... this.loadClients()
      },
    });
  }
}
