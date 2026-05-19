import { Component, OnInit } from '@angular/core';
import { AppointmentType } from 'src/app/core/models/appointment-type';
import { Area } from 'src/app/core/models/area';
import { Professional } from 'src/app/core/models/professional';
import { AppointmentTypeService } from 'src/app/core/services/appointment-type.service';
import { AreaService } from 'src/app/core/services/area.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-create-appointment-page',
  templateUrl: './create-appointment-page.component.html',
  styleUrls: ['./create-appointment-page.component.css'],
})
export class CreateAppointmentPageComponent implements OnInit {
  areas: Area[] = [];
  professionalsByArea: Professional[] = [];
  appointmentTypes: AppointmentType[] = [];

  constructor(
    private areaService: AreaService,
    private appointmentTypeService: AppointmentTypeService,
    private toastService: ToastService,
  ) {}

  ngOnInit(): void {
    this.loadAreas();
    this.loadAppointmentType();
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

  loadAppointmentType() {
    this.appointmentTypeService.getAppointmentTypes().subscribe({
      next: (appointmentTypes) => {
        this.appointmentTypes = appointmentTypes;
      },
      error: () => {
        this.toastService.show('Erro ao carregar os tipos de agendamento!', {
          classname: 'bg-danger text-light',
        });
      },
    });
  }

  onSelectedArea(area: Area) {
    this.areaService.getActiveProfessionalsFromArea(area).subscribe({
      next: (professionals) => {
        this.professionalsByArea = professionals;
      },
      error: () => {
        this.toastService.show('Erro ao carregar os  profissionais por área!', {
          classname: 'bg-danger text-light',
        });
      },
    });
  }
}
