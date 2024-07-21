describe('feed', () => {
    before(() => {
        cy.visit('http://localhost:3000/register');
        cy.login('user2@example.com', 'password123');})
    it('should see a post', () => {
        cy.contains('Feed').click()
        cy.url().should(url => {
            expect(url).to.include('/feed');
        });
        cy.contains('Post').should('exist');
    }
    )
})
