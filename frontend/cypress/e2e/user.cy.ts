describe('user functionality', () => {
  beforeEach('', () => {
    cy.loginUser();
  });

  // it('search for a product', () => {
  //   cy.visit('/products');
  //   const searchterm = 'winter';
  //   cy.get('[data-cy="searchproduct"]').type(searchterm);
  //   cy.get('[data-cy="feed"]').should('have.length.greaterThan', 0);
  // });

  it('views a feed', () => {
    cy.visit('/newsfeed');

    // Select the first feed and alias it for later use
    cy.get('[data-cy="feed"]:first').as('firstfeed').click();
  });

  it('creates a post without media', () => {
    cy.visit('/newsfeed');

    cy.get('[data-cy="textarea"]').trigger('mouseover').type('test post');

    // Check if the features div is visible
    cy.get('[data-cy="publish-btn"]').click();

  });


  it('should add a comment to the first post', () => {
    cy.get('.feed_footer_right .fa-comments-o').first().click();
    cy.get('.feedcomments textarea').first().type('This is a test comment');
    cy.get('.feedcomments button[type="submit"]').first().click();
    cy.get('.feed_footer_right li').first().should('contain', 'comment');
  });

  it('should edit a comment on the first post', () => {
    cy.get('.feed_footer_right .fa-comments-o').first().click();
     cy.get('.feedcomments li')
       .first()
       .within(() => {
         // Click on the edit (fa-pencil) icon
         cy.get('.fa-pencil').click();
       });
    cy.get('.editcomment').first().clear().type('This is an edited comment');
    cy.get('.editsubmit[type="submit"]').first().click();
    cy.get('.swal2-confirm').click();
    cy.get('.editedcomment')
      .first()
      .should('contain', 'This is an edited comment');
  })

  it('should delete a comment on first post', () => {
    cy.get('.feed_footer_right .fa-comments-o').first().click();
    cy.get('.feedcomments li')
      .first()
      .within(() => {

        cy.get('.fa-trash').click();
      });
    cy.get('.swal2-confirm').click()
  })

  // it('should like and unlike a post', () => {
  //   const likeButtonSelector = '.feed_footer_left .fa-heart';

  //   // Getting the initial like count and the initial class of the like button
  //   let initialLikeCount: number | undefined;
  //   let initialLikeClass;
  //   cy.get('.feed_footer_left p')
  //     .invoke('text')
  //     .then((text) => {
  //       initialLikeCount = parseInt(text);
  //     });

  //   cy.get(likeButtonSelector)
  //     .invoke('attr', 'class')
  //     .then((classAttr) => {
  //       initialLikeClass = classAttr;
  //     });

  //   cy.get(likeButtonSelector).click();

  //   // Verify that the like count has increased by one
  //   cy.get('.feed_footer_left p').should(
  //     'contain',
  //     initialLikeCount! + 1 + ' Likes'
  //   );

  //   // Verify that the like button class has changed to 'fa-heart-o'
  //   cy.get(likeButtonSelector).should('have.class', 'fa-heart-o');

  //   // Click on the like button again to unlike
  //   cy.get(likeButtonSelector).click();

  //   // Verify that the like count is back to the initial value
  //   cy.get('.feed_footer_left p').should(
  //     'contain',
  //     initialLikeCount + ' Likes'
  //   );

  //   // Verify that the like button class has changed back to the initial class 'fa-heart'
  //   cy.get(likeButtonSelector).should('have.class', initialLikeClass);
  // });
});





