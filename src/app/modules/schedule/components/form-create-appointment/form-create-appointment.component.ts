import { Component, Input, OnInit } from '@angular/core';
import { Area } from 'src/app/core/models/area';

@Component({
  selector: 'app-form-create-appointment',
  templateUrl: './form-create-appointment.component.html',
  styleUrls: ['./form-create-appointment.component.css'],
})
export class FormCreateAppointmentComponent {
  @Input()
  areas: Area[] = [];
}
