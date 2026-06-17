import { Component, OnInit, ViewChild } from '@angular/core';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
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
import { JsonPipe } from '@angular/common';
import { Appointment } from 'src/app/core/models/appointment';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { AppointmentService } from 'src/app/core/services/appointment.service';
import { Page } from 'src/app/core/models/page';

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
  appointment: Appointment = {} as Appointment;

  // Calendar Component
  calendarMonth: Date = new Date();
  availableDays: number[] = [];
  selectedDate!: Date;
  calendarError: string = '';

  // Time Component
  availableTimes: Time[] = [];
  selectedTime!: Time;
  timeError: string = '';

  @ViewChild(FormCreateAppointmentComponent)
  private formCreateAppointmentComponent!: FormCreateAppointmentComponent;

  constructor(
    private areaService: AreaService,
    private appointmentTypeService: AppointmentTypeService,
    private clientService: ClientService,
    private professionalService: ProfessionalService,
    private toastService: ToastService,
    private appointmentService: AppointmentService,
    private json: JsonPipe,
  ) {}

  ngOnInit(): void {
    this.loadAreas();
    this.loadAppointmentTypes();
  }

  onSelectedArea(area: Area) {
    this.selectedProfessional = {} as Professional;
    this.availableDays = [];

    this.resetTimes();

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

  onSelectedProfessional(professional: Professional) {
    this.selectedProfessional = professional;
    this.calendarMonth = new Date();
    this.loadAvailableDays();
    this.resetTimes();
  }

  onSelectedDate(date: Date) {
    // alert(date);
    this.selectedDate = date;
    this.loadAvailableTimes();
    this.calendarError = '';
  }

  onSelectedTime(time: Time) {
    //alert(JSON.stringify(time));
    this.selectedTime = time;
    this.timeError = '';
  }

  onChangedMonth(date: Date) {
    this.calendarMonth = date;
    this.loadAvailableDays();

    this.resetTimes();
  }

  searchClients = (text: Observable<string>): Observable<Client[]> => {
    return text.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      filter((term) => term.length >= 2),
      switchMap((term) =>
        this.clientService.getClientsWithNameContaining(term),
      ),
      map((page) => page.content || []),
    );
  };

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

  loadAppointmentTypes() {
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

  loadAvailableTimes() {
    this.availableTimes = [];
    this.professionalService
      .getAvailableTimes(this.selectedProfessional, this.selectedDate)
      .subscribe({
        next: (times) => {
          this.availableTimes = times;
        },
        error: () => {
          this.toastService.show('Erro ao carregar os horários disponíveis!', {
            classname: 'bg-danger text-light',
          });
        },
      });
  }

  resetTimes() {
    this.selectedTime = {} as Time;
    this.availableTimes = [];
  }

  createAppointment(modalConfirm: ModalComponent) {
    this.formCreateAppointmentComponent.submitted = true;
    this.checkDateAndTimeErros();

    if (this.isAppointmentValid()) {
      this.appointment = this.createAppointmentObject();

      modalConfirm.open({ size: 'lg' }).then((confirm) => {
        if (confirm) {
          this.appointmentService
            .createAppointment(this.appointment)
            .subscribe({
              next: () => {
                this.toastService.show('Agendamento realizado com sucesso!', {
                  classname: 'bg-success text-light',
                });
                this.cleanForm();
              },
              error: (e) => {
                this.toastService.show(e.error.message, {
                  classname: 'bg-danger text-light',
                });
              },
            });
        }
      });
    }
  }

  cleanForm() {
    this.formCreateAppointmentComponent.cleanForm();
    this.availableDays = [];
    this.availableTimes = [];
    this.calendarMonth = new Date();
    this.selectedProfessional = {} as Professional;
    this.selectedDate = {} as Date;
    this.selectedTime = {} as Time;
    this.appointment = {} as Appointment;
  }

  private createAppointmentObject(): Appointment {
    let appointment: Appointment = {} as Appointment;

    appointment = {
      ...this.formCreateAppointmentComponent.appointmentForm.value,
    };

    appointment.startTime = this.selectedTime.startTime;
    appointment.endTime = this.selectedTime.endTime;
    appointment.date = this.selectedDate;

    return appointment;
  }

  private checkDateAndTimeErros() {
    this.calendarError = this.selectedDate ? '' : '*Selecione uma data!';
    this.timeError = this.selectedTime ? '' : '*Selecione um horário!';
  }

  private isAppointmentValid() {
    return !!(
      this.formCreateAppointmentComponent.appointmentForm.valid &&
      this.selectedDate &&
      this.selectedTime
    );
  }
}
