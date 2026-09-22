import { TestBed } from '@angular/core/testing';

import { ProfessionalService } from './professional.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { DatePipe } from '@angular/common';
import { Professional } from '../models/professional';
import { Page } from '../models/page';

describe('ProfessionalService', () => {
  let service: ProfessionalService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DatePipe],
    });
    service = TestBed.inject(ProfessionalService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch professionals page', () => {
    const nameFilter = 'test';
    const page = 1;
    const mockPage: Page<Professional> = {
      content: [],
      numberOfElements: 0,
    };

    service.getProfessionalsPage(nameFilter, page).subscribe((response) => {
      expect(response).toEqual(mockPage);
    });

    const req = httpMock.expectOne(
      `${service.baseUrl}?name_like=${nameFilter}&_page=${page}&_limit=10&_sort=name`,
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockPage);
  });

  it('should fetch professional by id', () => {
    const mockProfessional: Professional = {
      id: 100,
      name: 'Erick Carlos',
      phone: '15 999999999',
      active: true,
    };

    service.getProfessionalById(100).subscribe((response) => {
      expect(response).toEqual(mockProfessional);
    });

    const req = httpMock.expectOne(`${service.baseUrl}/100`);
    expect(req.request.method).toBe('GET');
    req.flush(mockProfessional);
  });
});
