/// <reference types="cypress" />

describe('Professionals Table Page', () => {
  beforeEach(() => {
    cy.visit('professionals-table');
  });

  it('Should have title: "Cadastro de Profissionais:"', () => {
    cy.contains('Cadastro de Profissionais').should('be.visible');
  });

  it('Should have professionals in table', () => {
    cy.get('table.table-striped').should('exist');
    cy.get('tbody tr').should('have.length.at.least', 3);

    cy.fixture('professionals').as('professionals');

    cy.get('tbody tr').then((tr) => {
      cy.get('@professionals').each((professional: any) => {
        cy.wrap(tr).should('contain', professional.id);
        cy.wrap(tr).should('contain', professional.name);
        cy.wrap(tr).should('contain', professional.phone);
        cy.wrap(tr).should(
          'contain',
          professional.active ? 'Ativado' : 'Desativado',
        );
      });
    });
  });

  it('Should navigate to ProfessionalForm when click Button "Novo"', () => {
    cy.get('#btnNovo').click();
    cy.contains('Cadastro de Profissionais:').should('be.visible');
  });
});
