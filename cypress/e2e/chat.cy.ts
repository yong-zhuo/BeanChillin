describe('chat', () => {
    before(() => {
        cy.visit('http://localhost:3000/login');
        cy.login('user9@example.com', 'password123');
    })

    it('should be able to send message to friend', () => {
        cy.get('a[href*="/chat/chat"]').click();
        cy.url({timeout:10000}).should(url => {
            expect(url).to.include('/chat/chat');
        });
        cy.contains('bean chillin').click();
        cy.get('textarea').type('Hello');
        cy.get('button').contains('Send').click();
        cy.reload();
        cy.contains('Hello').should('exist');
    })
})