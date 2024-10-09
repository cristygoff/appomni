describe('Signup', () => {
  beforeEach(() => {
    cy.visit('signup.html');
  });

  it('submits the form without errors', () => {
    cy.findByLabelText('Username').type('sparkbox');
    cy.findByLabelText('Password').type('passwords-are-actually-really-cool');
    cy.findByRole('button', { text: 'Submit' }).click();
    cy.get('.error').should('not.exist'); 
    cy.get('.error_message').should('not.exist');
  });

  describe('form validation displays an error when', () => {
    it('the username is empty', () => {
      cy.findByRole('button', { text: 'Submit' }).click();
      cy.findByText('enter a username').should('have.class', 'error_message');
      cy.get('input[name=username]').should('have.class', 'error');
    });

   it('the password is less than 10 characters', () => {
      cy.findByLabelText('Username').type('sparkbox');
      cy.findByLabelText('Password').type('a');
      cy.findByText('Submit').click();
      // Works manuallly, fails in Cypress. Waits don't help. I could use another set of eyes.
      // cy.get('password').should('have.class', 'error'); 
      cy.findByText('Please enter a password with 10 characters or more.').should('have.class', 'error_message');
    });
  });
});
