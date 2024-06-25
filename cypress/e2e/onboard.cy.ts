import 'cypress-file-upload';

describe('onboard', () => {
    before(() => {
        cy.visit('http://localhost:3000/register');
    })
   

    it('should redirect user to home page after onboarding', () => {

        cy.url().should('include', '/register');
        //fill in the form
        cy.get('#email').should('exist').type('user6@example.com');
        cy.get('#password').type('password123');
        cy.get('#confirm').type('password123');
        //submit the form
        cy.contains('Create Account').click();
        cy.url().should('include', '/onboard');

        cy.get('#firstName').clear().type('we');
        cy.get('input[type="file"]').attachFile('qwe.jpeg', { subjectType: 'input' });
        cy.contains('Next').click();
        cy.get('textarea').clear().type('I am a new user');
        cy.contains('Next').click();
        cy.contains('Go to Home Page').click();
        cy.url().should(url => {
            expect(url).to.include('/home');
        });
    })
})