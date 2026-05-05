import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScheduleRoutingModule } from './schedule-routing.module';
import { TodayPageComponent } from './pages/today-page/today-page.component';
import { AppointmentPageComponent } from './pages/appointment-page/appointment-page.component';
import { CancelPageComponent } from './pages/cancel-page/cancel-page.component';
import { HistoryClientPageComponent } from './pages/history-client-page/history-client-page.component';
import { ProfessionalSchedulePageComponent } from './pages/professional-schedule-page/professional-schedule-page.component';


@NgModule({
  declarations: [
    TodayPageComponent,
    AppointmentPageComponent,
    CancelPageComponent,
    HistoryClientPageComponent,
    ProfessionalSchedulePageComponent
  ],
  imports: [
    CommonModule,
    ScheduleRoutingModule
  ]
})
export class ScheduleModule { }
