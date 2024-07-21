describe('friend', () => {
    
    it('should send a friend request', () => {
        cy.visit('http://localhost:3000/login');
        cy.login('user2@example.com', 'password123');
        cy.get('input[placeholder="Search for groups or users"]').type('User User')

        cy.contains('User User').click();

        cy.url({timeout:10000}).should('match', /\/profile\/[a-zA-Z0-9]+$/);

        cy.contains('Add Friend').click();

        cy.contains('Pending').should('exist');
    })

    it('should accept friend request', () => {
        cy.visit('http://localhost:3000/login');
        cy.login('user9@example.com', 'password123');
        cy.get('button').contains('Friends').click();
        cy.url({timeout:10000}).should(url => {
            expect(url).to.include('/friends');
        });
        cy.contains('Friend Requests').click();

        cy.contains('View Profile').click();

        cy.url({timeout:10000}).should('match', /\/profile\/[a-zA-Z0-9]+$/);

        cy.contains('Accept').click();
        cy.wait(10000)

        cy.get('button').contains('Friends').click();
        cy.url({timeout:10000}).should(url => {
            expect(url).to.include('/friends');
        });
        cy.contains('Random User').should('exist');
    })
})