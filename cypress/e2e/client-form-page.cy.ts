/// <reference types="cypress" />

import { faker } from '@faker-js/faker';

describe('Client Form Page', () => {
  beforeEach(() => {
    cy.visit('client-form');
  });

  it('Should load all elements', () => {
    cy.contains('Cadastro de Clientes').should('be.visible');

    cy.get('input#name').should('exist');
    cy.get('input#phone').should('exist');
    cy.get('input#dateOfBirth').should('exist');
    cy.get('textarea#comments').should('exist');

    cy.contains('label', 'Nome:').should('exist');
    cy.contains('label', 'Telefone:').should('exist');
    cy.contains('label', 'Data de Nascimento:').should('exist');
    cy.contains('label', 'Comentários:').should('exist');

    cy.contains('button', 'Cancelar').should('exist');
    cy.contains('button', 'Salvar').should('exist');
  });

  it('Should display error messages when trying to save a client', () => {
    cy.get('#name').type('Nome do Cliente');
    cy.get('.btn-primary').click();
    cy.contains('small', 'Telefone obrigatório!').should('be.visible');
    cy.contains('small', 'Data de nascimento obrigatória!').should(
      'be.visible',
    );
    cy.get('#name').clear();
    cy.contains('small', 'Nome obrigatório!').should('be.visible');
  });

  // it('Should save a new client', () => {
  //   cy.visit('clients-table');
  //   cy.get('#btnNovo').click();
  //   cy.get('#name').type('Nome do Cliente');
  //   cy.get('#phone').type('123456789');
  //   cy.get('#dateOfBirth').type('1990-01-01');
  //   cy.get('#comments').type('No comments');
  //   cy.get('small.form-text.text-danger').should('not.exist');
  //   cy.get('.btn-primary').click();

  //   // cy.get('tbody tr').should('have.length', 4);

  //   cy.get('table').contains('td', 'Nome do Cliente').should('be.visible');
  //   cy.get('table').contains('td', '123456789').should('be.visible');
  //   cy.get('table').contains('td', '01/01/1990').should('be.visible');
  //   cy.get('table').contains('td', 'No comments').should('be.visible');
  // });

  it('Should save a new client', () => {
    const name = faker.person.fullName();
    const phone = faker.string.numeric(10);
    const date = faker.date.birthdate().toISOString().split('T')[0];
    const expDate = date.split('-').reverse().join('/');
    const comments = faker.lorem.sentence();

    cy.get('#name').type(name);
    cy.get('.btn-primary').click();
    cy.get('#phone').type(phone);
    cy.get('#dateOfBirth').type(date);
    cy.get('#comments').type(comments);
    cy.get('small.form-text.text-danger').should('not.exist');
    cy.get('.btn-primary').click();

    // cy.wait(1000);
    // cy.visit('clients-table');

    //cy.get('tbody tr').should('have.length', 4);

    cy.get('table').contains('td', name).should('be.visible');
    cy.get('table').contains('td', phone).should('be.visible');
    cy.get('table').contains('td', expDate).should('be.visible');
    cy.get('table').contains('td', comments).should('be.visible');
  });

  // it('should load all elements', () => {
  //   cy.contains('Cadastro de Clientes').should('be.visible');

  //   cy.get('input#name').should('exist');
  //   cy.get('input#phone').should('exist');
  //   cy.get('input#dateOfBirth').should('exist');
  //   cy.get('textarea#comments').should('exist');
  //   cy.get('button.btn.btn-danger').should('exist');
  //   cy.get('button.btn.btn-primary').should('exist');
  // });
});
