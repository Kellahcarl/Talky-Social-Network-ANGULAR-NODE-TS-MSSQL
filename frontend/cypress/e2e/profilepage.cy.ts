describe('profile page', () => {
  beforeEach('', () => {
    cy.loginUser();
    cy.visit('/profile');
  });

  // it('should update user profile', () => {
  //   cy.get('[data-cy="profiletop1"]').get('[data-cy="updateProfile"]').click();
  //   cy.wait(30000);
  //   cy.get('#profileform').should('be.visible');

  // })

  it('should navigate to my posts', () => {
    // cy.get('[data-cy="profile"]').contains('Posts:').click();
    // cy.wait(5000)
    // cy.get('[data-cy="myposts"]')
    cy.get('app-profile');
  });

  it('should navigate to followers', () => {
    cy.visit('/followers');
    // cy.get('[data-cy="profiletop2"]').contains('Followers:').click();
    cy.get('app-followers');
  });

  it('should navigate to following', () => {
    cy.visit('/followings');
    // cy.get('[data-cy="profiletop2"]').contains('Following:').click();
    cy.get('app-following');
    // cy.visit('/login')
  });
});
describe('Profile Update', () => {
  beforeEach(() => {
    cy.loginUser();
  });

  it('should update the profile', () => {
    cy.visit('/about');

    cy.contains('Edit Profile').click();

    // // Add a file using the ngx-dropzone
    // const filePath = 'path/to/new-profile-pic.jpg';
    // cy.fixture(filePath).then((fileContent) => {
    //   cy.get('ngx-dropzone').attachFile({
    //     fileContent: fileContent.toString(),
    //     fileName: 'new-profile-pic.jpg',
    //     mimeType: 'image/jpeg',
    //   });
    // });

    const newUsername = 'Test';
    const newFullName = 'Test User';
    cy.get('[formControlName=user_name]').clear().type(newUsername);
    cy.get('[formControlName=fullName]').clear().type(newFullName);

    cy.contains('Update profile').click();

    // cy.get('.modal').should('not.be.visible');

    // cy.get('#profile_pic').should('have.attr', 'src', 'new-profile-pic.jpg');
    cy.get('[data-cy="userName"]').should('contain', newUsername);
    cy.get('[data-cy="fullName"]').should('contain', newFullName);
  });
});