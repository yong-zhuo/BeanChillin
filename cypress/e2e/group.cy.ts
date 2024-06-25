import 'cypress-file-upload';
describe('group', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/login');
        cy.login('user8@example.com', 'password123');
    })
    it('should create a group', () => {
        cy.contains('Groups').click();
        cy.url().should(url => {
            expect(url).to.include('/groups');
        });
        cy.contains('New Group').click();
        cy.get('#name').type('Group 1');
        cy.get('#description').type('This is a group');
        cy.get('[role="combobox"]').contains('Select a category that best suits your Group').click({force: true});
        cy.contains('Academics').click();
        cy.get('input[type="file"]').attachFile('qwe.jpeg', { subjectType: 'input' });

        
        cy.get('button').contains('Create').click();
        cy.url({timeout: 20000}).should(url => {
            expect(url).to.include('/groups/Group-1');
        });

        
    })

    it('should join a group', () => {
        cy.contains('Groups').click();
        cy.url().should(url => {
            expect(url).to.include('/groups');
        });
        
        
        cy.get('input[type="text"]').type('wqee');
        cy.contains('wqee').click();

        cy.url().should(url => {
            expect(url).to.include('/groups/wqee');
        });

        cy.contains('Join Group').click();
        
        cy.contains('Groups').click();
        cy.url().should(url => {
            expect(url).to.include('/groups');
        });
        cy.contains('wqee').should('exist');
    })

    
    })
