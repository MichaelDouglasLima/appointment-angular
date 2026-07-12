import { Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from 'src/app/app.component';
import { AppModule } from 'src/app/app.module';
import { routes } from './schedule-routing.module';

describe('Schedule Routing and Load Components', () => {
  let router: Router;
  let location: Location;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
        AppModule,
        HttpClientTestingModule,
      ],
    });

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    fixture = TestBed.createComponent(AppComponent);
  });

  it('should navigate to "/today-appointments"', fakeAsync(() => {
    router.navigate(['/today-appointments']).then(() => {
      expect(location.path()).toBe('/today-appointments');
    });
  }));

  it('should navigate to "/create-appointment"', fakeAsync(() => {
    router.navigate(['/create-appointment']).then(() => {
      expect(location.path()).toBe('/create-appointment');
    });
  }));

  it('should navigate to "/cancel-appointment"', fakeAsync(() => {
    router.navigate(['/cancel-appointment']).then(() => {
      expect(location.path()).toBe('/cancel-appointment');
    });
  }));

  it('should navigate to "/client-history"', fakeAsync(() => {
    router.navigate(['/client-history']).then(() => {
      expect(location.path()).toBe('/client-history');
    });
  }));

  it('should navigate to "/professional-workdays"', fakeAsync(() => {
    router.navigate(['/professional-workdays']).then(() => {
      expect(location.path()).toBe('/professional-workdays');
    });
  }));

  it('should navigate to "/today-appointments and load TodayAppointmentsPageComponent"', fakeAsync(() => {
    router.navigate(['/today-appointments']).then(() => {
      expect(location.path()).toBe('/today-appointments');
      fixture.detectChanges();
      const todayAppointmentsPageComponent =
        fixture.debugElement.nativeElement.querySelector(
          'app-today-appointments-page',
        );
      expect(todayAppointmentsPageComponent).toBeTruthy();
    });
  }));

  it('should navigate to "/create-appointment and load CreateAppointmentPageComponent"', fakeAsync(() => {
    router.navigate(['/create-appointment']).then(() => {
      expect(location.path()).toBe('/create-appointment');
      fixture.detectChanges();
      const createAppointmentPageComponent =
        fixture.debugElement.nativeElement.querySelector(
          'app-create-appointment-page',
        );
      expect(createAppointmentPageComponent).toBeTruthy();
    });
  }));

  it('should navigate to "/cancel-appointment and load CancelAppointmentPageComponent"', fakeAsync(() => {
    router.navigate(['/cancel-appointment']).then(() => {
      expect(location.path()).toBe('/cancel-appointment');
      fixture.detectChanges();
      const cancelAppointmentPageComponent =
        fixture.debugElement.nativeElement.querySelector(
          'app-cancel-appointment-page',
        );
      expect(cancelAppointmentPageComponent).toBeTruthy();
    });
  }));

  it('should navigate to "/client-history and load ClientHistoryPageComponent"', fakeAsync(() => {
    router.navigate(['/client-history']).then(() => {
      expect(location.path()).toBe('/client-history');
      fixture.detectChanges();
      const clientHistoryPageComponent =
        fixture.debugElement.nativeElement.querySelector(
          'app-client-history-page',
        );
      expect(clientHistoryPageComponent).toBeTruthy();
    });
  }));

  it('should navigate to "/professional-workdays and load ProfessionalWorkdaysPageComponent"', fakeAsync(() => {
    router.navigate(['/professional-workdays']).then(() => {
      expect(location.path()).toBe('/professional-workdays');
      fixture.detectChanges();
      const professionalWorkdaysPageComponent =
        fixture.debugElement.nativeElement.querySelector(
          'app-professional-workdays-page',
        );
      expect(professionalWorkdaysPageComponent).toBeTruthy();
    });
  }));
});
