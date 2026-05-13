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
  search: string = '';

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.clientService
      .getClients(
        this.search.trim().length > 0
          ? `?name_like=${this.search.trim()}`
          : undefined,
      )
      .subscribe({
        next: (clients) => (this.clients = clients),
      });
  }
}
