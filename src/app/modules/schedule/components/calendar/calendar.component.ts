import { Component } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent {
  calendarMonth: Date = new Date();

  onNextMonth() {
    this.calendarMonth = new Date(this.calendarMonth);
    this.calendarMonth.setMonth(this.calendarMonth.getMonth() + 1);
    this.calendarMonth.setDate(1);
  }

  onPreviousMonth() {
    this.calendarMonth = new Date(this.calendarMonth);
    if (this.calendarMonth > new Date()) {
      this.calendarMonth.setMonth(this.calendarMonth.getMonth() - 1);
      this.calendarMonth.setDate(1);
    }
  }
}
