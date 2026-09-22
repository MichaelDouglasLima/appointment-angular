/// <reference types="cypress" />

import { faker } from '@faker-js/faker';

describe('Professional Form Page', () => {
  beforeEach(() => {
    cy.visit('professional-form');
  });

  it('Should load all elements', () => {
    cy.contains('Cadastro de Profissionais').should('be.visible');

    cy.get('input#name').should('exist');
    cy.get('input#phone').should('exist');
    cy.get('select#active').should('exist');

    cy.contains('label', 'Nome:').should('exist');
    cy.contains('label', 'Telefone:').should('exist');
    cy.contains('label', 'Ativo:').should('exist');

    cy.contains('button', 'Cancelar').should('exist');
    cy.contains('button', 'Salvar').should('exist');
  });

  it('Should display error messages when trying to save a professional', () => {
    cy.get('#name').type('Nome do Profissional');
    cy.get('.btn-primary').click();
    cy.contains('small', 'Telefone obrigatório!').should('be.visible');
    cy.contains('small', 'Atividade é obrigatória!').should('be.visible');
    cy.get('#name').clear();
    cy.contains('small', 'Nome obrigatório!').should('be.visible');
  });

  it('Should save a new professional', () => {
    const name = faker.person.fullName();
    const phone = faker.string.numeric(10);
    const active = faker.datatype.boolean();

    cy.get('#name').type(name);
    cy.get('.btn-primary').click();
    cy.get('#phone').type(phone);
    cy.get('small.form-text.text-danger').should('not.exist');
    cy.get('#active').select(active ? 'Ativado' : 'Desativado');
    cy.get('.btn-primary').click();

    cy.get('table').contains('td', name).should('be.visible');
    cy.get('table').contains('td', phone).should('be.visible');
    cy.get('table')
      .contains('td', active ? 'Ativado' : 'Desativado')
      .should('be.visible');
  });
});
