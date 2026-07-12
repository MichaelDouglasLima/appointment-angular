import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

import { ProfessionalsTablePageComponent } from './professionals-table-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DatePipe, formatDate } from '@angular/common';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { FormsModule } from '@angular/forms';
import { ProfessionalService } from 'src/app/core/services/professional.service';
import { Page } from 'src/app/core/models/page';
import { Professional } from 'src/app/core/models/professional';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

const professionalPage: Page<Professional> = {
  content: [
    {
      id: 1,
      name: 'Caique Henrique',
      phone: '15 999999999',
      active: true,
    },
    {
      id: 2,
      name: 'Ricardo Alves',
      phone: '15 999999999',
      active: true,
    },
    {
      id: 3,
      name: 'Luana Souza',
      phone: '15 999999999',
      active: true,
    },
  ],
  numberOfElements: 3,
};

describe('ProfessionalsTablePageComponent', () => {
  let component: ProfessionalsTablePageComponent;
  let fixture: ComponentFixture<ProfessionalsTablePageComponent>;
  let service: ProfessionalService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfessionalsTablePageComponent, ModalComponent],
      imports: [
        HttpClientTestingModule,
        NgbPagination,
        FormsModule,
        RouterTestingModule,
      ],
      providers: [DatePipe],
    });
    fixture = TestBed.createComponent(ProfessionalsTablePageComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(ProfessionalService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load professionals from service on init component', fakeAsync(() => {
    spyOn(service, 'getProfessionalsPage').and.returnValue(
      of(professionalPage),
    );
    component.ngOnInit();
    tick();
    expect(service.getProfessionalsPage).toHaveBeenCalled();
    expect(component.professionalPage).toEqual(professionalPage);
  }));

  it('should have 3 professionals in table', fakeAsync(() => {
    spyOn(service, 'getProfessionalsPage').and.returnValue(
      of(professionalPage),
    );
    component.ngOnInit();
    tick();
    fixture.detectChanges();
    const tableRows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(tableRows.length).toBe(3);
  }));

  it(`should have professionals data in table`, fakeAsync(() => {
    spyOn(service, 'getProfessionalsPage').and.returnValue(
      of(professionalPage),
    );
    component.ngOnInit();
    tick();
    fixture.detectChanges();

    const tableRows = fixture.nativeElement.querySelectorAll('tbody tr');

    // Verify the data in each row
    tableRows.forEach((row: HTMLElement, index: number) => {
      const expectProfessional = professionalPage?.content?.[index]; // Get the corresponding professional data
      const columns = row.querySelectorAll('td');

      if (expectProfessional) {
        expect(columns[0].textContent).toBe(expectProfessional.name); // Check professional name
        expect(columns[1].textContent).toBe(expectProfessional.phone); // Check professional phone
        expect(columns[2].textContent?.trim()).toBe('Ativado'); // Check professional active
      }
    });
  }));
});
