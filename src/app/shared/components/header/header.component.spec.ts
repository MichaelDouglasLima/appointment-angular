import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { By } from '@angular/platform-browser';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
    });
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('it should have title "Agenda" - Angular', () => {
    const element = fixture.debugElement.query(
      By.css('.navbar-brand'),
    ).nativeElement;

    expect(element.textContent).toEqual('Agenda');
  });

  it('it should have title "Agenda" - DOM', () => {
    const element =
      fixture.debugElement.nativeElement.querySelector('.navbar-brand');
    expect(element.textContent).toEqual('Agenda');
  });

  it('it should have nav-item "Cadastros" - DOM', () => {
    const element = fixture.debugElement.nativeElement.querySelector(
      '#navbarDropdownCadastros',
    );
    expect(element.textContent).toEqual('Cadastros');
  });

  it('it should have nav-item "Agendamentos" - DOM', () => {
    const element = fixture.debugElement.nativeElement.querySelector(
      '#navbarDropdownAgendamentos',
    );
    expect(element.textContent).toEqual('Agendamentos');
  });

  it('it should have nav-item "Home" - DOM', () => {
    const element = fixture.debugElement.nativeElement.querySelector('#home');
    expect(element.textContent).toEqual('Home');
  });

  it('it should find logout button "Sair" - DOM', () => {
    const element =
      fixture.debugElement.nativeElement.querySelector('#btnLogout');
    expect(element.textContent.trim()).toEqual('Sair');
  });

  it(`should have button 'Sair'`, () => {
    const buttonElements = fixture.debugElement.queryAll(By.css('.btn'));
    const buttonWithSairText = buttonElements.find(
      (element) => element.nativeElement.textContent.trim() === 'Sair',
    );
    expect(buttonWithSairText).toBeTruthy();
  });

  it(`should contain dropdown itens with routers links in 'Cadastros'`, () => {
    const dropDownMenu = fixture.debugElement.query(
      By.css('[aria-labelledby="navbarDropdownCadastros"]'),
    );
    const dropDownItems = dropDownMenu.queryAll(By.css('a[ngbDropdownItem]'));
    const expectedRouterLinks = [
      'area',
      'professionals-table',
      'appointment-type',
      'clients-table',
      'user',
    ];
    dropDownItems.forEach((item, index) => {
      expect(item.attributes['routerLink']).toBe(expectedRouterLinks[index]);
    });
  });

  it(`should contain dropdown itens with routers links in 'Agendamentos'`, () => {
    const dropDownMenu = fixture.debugElement.query(
      By.css('[aria-labelledby="navbarDropdownAgendamentos"]'),
    );
    const dropDownItems = dropDownMenu.queryAll(By.css('a[ngbDropdownItem]'));
    const expectedRouterLinks = [
      'today-appointments',
      'create-appointment',
      'cancel-appointment',
      'client-history',
      'professional-workdays',
    ];
    dropDownItems.forEach((item, index) => {
      expect(item.attributes['routerLink']).toBe(expectedRouterLinks[index]);
    });
  });
});
