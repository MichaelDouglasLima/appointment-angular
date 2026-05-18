import { Component, OnInit } from '@angular/core';
import { Area } from 'src/app/core/models/area';
import { AreaService } from 'src/app/core/services/area.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-form-create-appointment',
  templateUrl: './form-create-appointment.component.html',
  styleUrls: ['./form-create-appointment.component.css'],
})
export class FormCreateAppointmentComponent implements OnInit {
  areas: Area[] = [];

  constructor(
    private areaService: AreaService,
    private toastService: ToastService,
  ) {}

  ngOnInit(): void {
    this.loadAreas();
  }

  loadAreas() {
    this.areaService.getAreas().subscribe({
      next: (areas) => {
        this.areas = areas;
      },
      error: () => {
        this.toastService.show('Erro ao carregar as áreas!', {
          classname: 'bg-danger text-light',
        });
      },
    });
  }
}
