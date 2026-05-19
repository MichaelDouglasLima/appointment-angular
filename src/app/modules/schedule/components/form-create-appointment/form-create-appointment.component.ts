import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppointmentType } from 'src/app/core/models/appointment-type';
import { Area } from 'src/app/core/models/area';
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

  @Output()
  selectedAreaEvent = new EventEmitter<Area>();

  appointmentForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.appointmentForm = this.formBuilder.group({
      area: ['', Validators.required],
      professional: ['', Validators.required],
      appointmentType: ['', Validators.required],
    });
  }

  onAreaChange() {
    this.selectedAreaEvent.emit(this.appointmentForm.value['area']);
  }
}
