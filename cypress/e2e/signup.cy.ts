describe('signup', () => {
    it('should signup new user and direct to onboarding page', () => {

        //go to login page
        cy.visit('http://localhost:3000')

        //click on sign up now link
        cy.get('a[href*="register"]').click()
        cy.url().should('include', '/register');
        //fill in the form
        cy.get('#email').should('exist').type('user8@example.com');
        cy.get('#password').type('password123');
        cy.get('#confirm').type('password123');
        //submit the form
        cy.contains('Create Account').click();
        cy.url().should('include', '/onboard');
    })
 })





