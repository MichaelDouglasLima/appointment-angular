import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryClientPageComponent } from './history-client-page.component';

describe('HistoryClientPageComponent', () => {
  let component: HistoryClientPageComponent;
  let fixture: ComponentFixture<HistoryClientPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistoryClientPageComponent]
    });
    fixture = TestBed.createComponent(HistoryClientPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
