describe('login', () => {
  it('passes', () => {
    cy.login('user2@example.com', 'password123')
    cy.url().should('include', '/home')
  })
})