Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
  cy.get('input[id="firstName"]').type('Andre');
  cy.get('input[id="lastName"]').type('Molinari');
  cy.get('input[id="email"]').type('molinari.andref@gmail.com');
  cy.get('input[id="phone"]').type('41992282505');
  cy.get('textarea[id="open-text-area"]').type('Equipe excelente');
  cy.get('button[type="submit"]').click();
});
