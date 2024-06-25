describe('post', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/register');
        cy.login('user2@example.com', 'password123');
    })

    it('should create a post', () => {
        cy.contains('Groups').click();
        cy.url().should(url => {
            expect(url).to.include('/groups');
        });
        cy.contains('View').click();
        cy.url({timeout:30000}).should(url => {
            expect(url).to.include('/groups/wqee');
        });
        cy.get('input[placeholder="Click here to create a post. (Only group members can create a post)"]').click();

        cy.url({timeout:30000}).should(url => {
            expect(url).to.include('/groups/wqee/submit-post');
        });

        cy.get('textarea[placeholder="Add your title here!"]').clear().type('Post');
        cy.get('div[data-placeholder="Start writing your post here!"]').type('This is a post');
        cy.get('button').contains('Post').click();

        cy.url({timeout:20000}).should(url => {
            expect(url).to.include('/groups/wqee');
        });

        cy.contains('Post').should('exist');
    })

    it('should upvote a post and verify vote count increase', () => {
        cy.contains('Groups').click();
        cy.url().should(url => {
            expect(url).to.include('/groups');
        });
        cy.contains('View').click();
        cy.url({timeout:20000}).should(url => {
            expect(url).to.include('/groups/wqee');
        });
    
        
        cy.get('a[href^="/groups/wqee/post"]').first().click();
        cy.url({timeout:10000}).should('match', /\/groups\/wqee\/post\/[a-zA-Z0-9]+$/);
    
        // Capture the initial vote count and use an alias
    cy.get('#vote').invoke('text').then((text) => {
        const voteCount = parseInt(text);
        cy.wrap(voteCount).as('initialVoteCount');
    });

    cy.intercept('PATCH', '/api/group/posts/vote').as('voteUpdate');

    cy.get('button[aria-label="UPVOTE"]').filter(':visible').click();
    cy.wait('@voteUpdate');


    cy.contains('Feed').click();

// Use the captured initial vote count for comparison
    cy.get('#vote').first().should('have.text', '1');
    });

    it('should comment on a post', () => {
        cy.contains('Groups').click();
        cy.url().should(url => {
            expect(url).to.include('/groups');
        });
        cy.contains('View').click();
        cy.url({timeout:20000}).should(url => {
            expect(url).to.include('/groups/wqee');
        });
    
        cy.get('a[href^="/groups/wqee/post"]').first().click();
        cy.url({timeout:10000}).should('match', /\/groups\/wqee\/post\/[a-zA-Z0-9]+$/);
    
        
        cy.get('textarea[placeholder="Write a comment..."]').type('This is a comment');
        cy.get('button').contains('Comment').click();

        cy.contains('This is a comment').should('exist');
    });
})
    