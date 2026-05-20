import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OperatorFunction } from 'rxjs';
import { AppointmentType } from 'src/app/core/models/appointment-type';
import { Area } from 'src/app/core/models/area';
import { Client } from 'src/app/core/models/client';
import { Professional } from 'src/app/core/models/professional';

@Component({
  selector: 'app-form-create-appointment',
  templateUrl: './form-create-appointment.component.html',
  styleUrls: ['./form-create-appointment.component.css'],
})
export class FormCreateAppointmentComponent {
  @Input()
  areas: Area[] = [];

  @Input()
  professionals: Professional[] = [];

  @Input()
  appointmentTypes: AppointmentType[] = [];

  @Input()
  searchClients!: OperatorFunction<string, readonly Client[]>;

  @Output()
  selectedAreaEvent = new EventEmitter<Area>();

  formAppointment: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.formAppointment = this.formBuilder.group({
      area: ['', Validators.required],
      professional: ['', Validators.required],
      appointmentType: ['', Validators.required],
      client: ['', Validators.required],
    });
  }

  // Used by typeahead component
  formatter = (client: Client): string => {
    return client.name;
  };

  onAreaChange() {
    this.selectedAreaEvent.emit(this.formAppointment.value['area']);
  }

  get faClient() {
    return this.formAppointment.value['client'];
  }
}
