import { Component, OnInit, ViewChild } from '@angular/core';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  Observable,
  switchMap,
} from 'rxjs';
import { AppointmentType } from 'src/app/core/models/appointment-type';
import { Area } from 'src/app/core/models/area';
import { Client } from 'src/app/core/models/client';
import { Professional } from 'src/app/core/models/professional';
import { AppointmentTypeService } from 'src/app/core/services/appointment-type.service';
import { AreaService } from 'src/app/core/services/area.service';
import { ClientService } from 'src/app/core/services/client.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { FormCreateAppointmentComponent } from '../../components/form-create-appointment/form-create-appointment.component';
import { ProfessionalService } from 'src/app/core/services/professional.service';
import { Time } from '../../components/time/models/time';

@Component({
  selector: 'app-create-appointment-page',
  templateUrl: './create-appointment-page.component.html',
  styleUrls: ['./create-appointment-page.component.css'],
})
export class CreateAppointmentPageComponent implements OnInit {
  areas: Area[] = [];
  appointmentTypes: AppointmentType[] = [];
  professionalsByArea: Professional[] = [];
  selectedProfessional: Professional = {} as Professional;

  // Calendar Component
  calendarMonth: Date = new Date();
  availableDays: number[] = [];

  @ViewChild(FormCreateAppointmentComponent)
  private formCreateAppointmentComponent!: FormCreateAppointmentComponent;

  constructor(
    private areaService: AreaService,
    private appointmentTypeService: AppointmentTypeService,
    private clientService: ClientService,
    private professionalService: ProfessionalService,
    private toastService: ToastService,
  ) {}

  ngOnInit(): void {
    this.loadAreas();
    this.loadAppointmentType();
  }

  onSelectedProfessional(professional: Professional) {
    this.selectedProfessional = professional;
    this.calendarMonth = new Date();
    this.loadAvailableDays();
  }

  onSelectedDate(date: Date) {
    alert(date);
  }

  onSelectedTime(time: Time) {
    alert(JSON.stringify(time));
  }

  onChangedMonth(date: Date) {
    this.calendarMonth = date;
    this.loadAvailableDays();
  }

  searchClients = (text: Observable<string>): Observable<Client[]> => {
    return text.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      filter((term) => term.length >= 2),
      switchMap((term) =>
        this.clientService.getClientsWithNameContaining(term),
      ),
    );
  };

  loadAvailableDays() {
    this.professionalService
      .getAvailableDays(this.selectedProfessional, this.calendarMonth)
      .subscribe({
        next: (days) => {
          this.availableDays = days;
        },
        error: () => {
          this.toastService.show('Erro ao carregar os dias disponíveis', {
            classname: 'bg-danger text-light',
          });
        },
      });
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
        this.toastService.show('Erro ao carregar os profissionais por área!', {
          classname: 'bg-danger text-light',
        });
      },
    });
  }

  createAppointment() {
    this.formCreateAppointmentComponent.submitted = true;
    alert(
      JSON.stringify(this.formCreateAppointmentComponent.appointmentForm.value),
    );
  }
}
