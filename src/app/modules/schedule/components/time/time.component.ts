import { Component, OnInit } from '@angular/core';
import { Time } from './models/time';

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.css'],
})
export class TimeComponent implements OnInit {
  times: Time[] = [];

  ngOnInit(): void {
    this.resetTimes();
  }

  resetTimes() {
    this.times = [
      { startTime: '08:00:00', endTime: '08:30:00', available: false },
      { startTime: '08:30:00', endTime: '09:00:00', available: false },
      { startTime: '09:00:00', endTime: '09:30:00', available: false },
      { startTime: '09:30:00', endTime: '10:00:00', available: false },
      { startTime: '10:00:00', endTime: '10:30:00', available: false },
      { startTime: '10:30:00', endTime: '11:00:00', available: false },
      { startTime: '11:30:00', endTime: '12:00:00', available: false },
      // { startTime: '12:00:00', endTime: '12:30:00', available: false },
      // { startTime: '12:30:00', endTime: '13:00:00', available: false },
      // { startTime: '13:00:00', endTime: '13:30:00', available: false },
      // { startTime: '13:30:00', endTime: '14:00:00', available: false },
      { startTime: '14:00:00', endTime: '14:30:00', available: false },
      { startTime: '14:30:00', endTime: '15:00:00', available: false },
      { startTime: '15:00:00', endTime: '15:30:00', available: false },
      { startTime: '15:30:00', endTime: '16:00:00', available: false },
      { startTime: '16:00:00', endTime: '16:30:00', available: false },
      { startTime: '16:30:00', endTime: '17:00:00', available: false },
      { startTime: '17:00:00', endTime: '17:30:00', available: false },
      { startTime: '17:30:00', endTime: '18:00:00', available: false },
    ];
  }
}
