import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalSchedulePageComponent } from './professional-schedule-page.component';

describe('ProfessionalSchedulePageComponent', () => {
  let component: ProfessionalSchedulePageComponent;
  let fixture: ComponentFixture<ProfessionalSchedulePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfessionalSchedulePageComponent]
    });
    fixture = TestBed.createComponent(ProfessionalSchedulePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
