import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodayPageComponent } from './pages/today-page/today-page.component';
import { AppointmentPageComponent } from './pages/appointment-page/appointment-page.component';
import { CancelPageComponent } from './pages/cancel-page/cancel-page.component';
import { HistoryClientPageComponent } from './pages/history-client-page/history-client-page.component';
import { ProfessionalSchedulePageComponent } from './pages/professional-schedule-page/professional-schedule-page.component';

const routes: Routes = [
  {
    path: 'today',
    component: TodayPageComponent,
  },
  {
    path: 'appointment',
    component: AppointmentPageComponent,
  },
  {
    path: 'cancel',
    component: CancelPageComponent,
  },
  {
    path: 'history-client',
    component: HistoryClientPageComponent,
  },
  {
    path: 'professional-schedule',
    component: ProfessionalSchedulePageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScheduleRoutingModule {}
