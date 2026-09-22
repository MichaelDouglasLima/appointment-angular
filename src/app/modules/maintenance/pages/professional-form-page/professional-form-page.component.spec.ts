import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalFormPageComponent } from './professional-form-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DatePipe } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';

describe('ProfessionalFormPageComponent', () => {
  let component: ProfessionalFormPageComponent;
  let fixture: ComponentFixture<ProfessionalFormPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfessionalFormPageComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
      ],
      providers: [DatePipe],
    });
    fixture = TestBed.createComponent(ProfessionalFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should find professional form title "Cadastro de Profissionais:"', () => {
    const element = fixture.debugElement.nativeElement.querySelector('#title');
    expect(element.textContent.trim()).toEqual('Cadastro de Profissionais:');
  });

  it('should find cancel button "Cancelar', () => {
    const element =
      fixture.debugElement.nativeElement.querySelector('#btnCancel');
    expect(element.textContent.trim()).toEqual('Cancelar');
  });

  it('should find save button "Salvar', () => {
    const element =
      fixture.debugElement.nativeElement.querySelector('#btnSave');
    expect(element.textContent.trim()).toEqual('Salvar');
  });
});
