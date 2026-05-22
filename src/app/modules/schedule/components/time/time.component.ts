import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Time } from './models/time';

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.css'],
})
export class TimeComponent implements OnInit, OnChanges {
  @Input()
  times: Time[] = [];

  selectedTime: Time = {} as Time;

  @Output()
  selectedTimeEvent = new EventEmitter<Time>();

  ngOnInit(): void {
    this.resetTimes();
  }

  ngOnChanges(): void {
    this.selectedTime = {} as Time;
  }

  resetTimes() {
    this.selectedTime = {} as Time;
  }

  onSelectedTime(time: Time) {
    this.selectedTime = time;
    this.selectedTimeEvent.emit(this.selectedTime);
  }
}
