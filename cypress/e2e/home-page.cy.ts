/// <reference types="cypress" />

describe('Home Page', () => {
  it('should load home page', () => {
    cy.visit('http://localhost:4200');
  });

  it('Home Page: Cadastros->Cliente Should have Title: "Cadastro de Clientes"', () => {
    cy.visit('http://localhost:4200');
    cy.get('#navbarDropdownCadastros').click();
    cy.get('#navItemCliente').click();
    cy.contains('Cadastro de Clientes').should('be.visible');
  });

  it('Home Page: Cadastros->Agendar Should have Title: "Fazer um agendamento"', () => {
    cy.visit('http://localhost:4200');
    cy.get('#navbarDropdownAgendamentos').click();
    cy.get('#navItemAgendar').click();
    cy.contains('Fazer um agendamento').should('be.visible');
  });
});
