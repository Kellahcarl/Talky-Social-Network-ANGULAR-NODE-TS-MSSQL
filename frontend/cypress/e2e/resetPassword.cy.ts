describe('resets password for a user', () => {
  function generateRandomEmail() {}
  it('passes', () => {
    cy.visit('/reset');

    cy.get('[data-cy="userID"]').type('0e4abbef-1534-438a-8283-eec46b8c6740');

    cy.get('[data-cy="userPassword"]').type('@Qwerty123');
    cy.get('[data-cy="userConfirmPassword"]').type('@Qwerty123');

    cy.get('[data-cy="reset_user_btn"]').click();

    cy.get('[data-cy="reset-success-popup"]');
    cy.location('pathname').should('eq', '/login');
  });
  it('fails invalid resetcode/id ', () => {
    cy.visit('/reset');

    cy.get('[data-cy="userID"]').type('jane Doe');

    cy.get('[data-cy="userPassword"]').type('@Qwerty123');
    cy.get('[data-cy="userConfirmPassword"]').type('@Qwerty123');

    cy.get('[data-cy="reset_user_btn"]').click();

    cy.get('[data-cy="reset-error-popup"]');

    cy.location('pathname').should('eq', '/reset');
  });
});
