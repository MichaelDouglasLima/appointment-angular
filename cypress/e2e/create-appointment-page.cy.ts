/// <reference types="cypress" />

describe('template spec', () => {
  beforeEach(() => {
    cy.visit('create-appointment');
  });

  it('Should have title: "Fazer um agendamento:"', () => {
    cy.contains('Fazer um agendamento').should('be.visible');
  });

  it('Should display error messages when trying to save a professional', () => {
    cy.get('.btn-primary').click();
    cy.contains('small', 'Selecione a área do profissional!').should(
      'be.visible',
    );
    cy.contains('small', 'Selecione o tipo de agendamento!').should(
      'be.visible',
    );
    cy.contains('small', 'Selecione o cliente!').should('be.visible');
    cy.contains('small', 'Selecione uma data!').should('be.visible');
    cy.contains('small', 'Selecione um horário!').should('be.visible');
  });

  it('Should create a Appointment', () => {
    cy.get('#area').select('Fisioterapia');
    cy.get('#professional').select('Marcelo Silva');
    cy.get('#appointmentType').select('Particular');
    cy.get('#client').type('Ana Maria');
    cy.get('#ngb-typeahead-0-0').click();
    cy.get('#comments').type('No comments');

    cy.get('#nextMonth').click();
    cy.get('.col.day.day-available').first().click();
    cy.get('.col.time.time-available').first().click();

    cy.get('.btn-primary').click();
    cy.get('#btnConfirmModal').click();
  });
});
