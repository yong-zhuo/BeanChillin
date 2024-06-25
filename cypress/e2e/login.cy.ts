describe('login', () => {
  it('Login existing user via credentials and redirect to home page', () => {
    cy.login('user2@example.com', 'password123')
    cy.url().should('include', '/home')
  })
})


describe('login', () => {
  
  it('Sign out of account', () => {
    cy.login('user2@example.com', 'password123')
    cy.url().should('include', '/home')
    cy.get(`#radix-\\:r3\\:`).click()
    cy.contains('Sign Out').click()
  })
})