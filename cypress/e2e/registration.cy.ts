describe("registration page tests", () => {
  beforeEach(() => {
    cy.visit("/register");
  });

  it("should create a user", () => {
    cy.get('[data-test-id="reg-name"]').type("John Doe");
    cy.get('[data-test-id="reg-email"]').type("johndoe@test.com");
    cy.get('[data-test-id="reg-password"]').type("TestPass1@3");
    cy.get('[data-test-id="reg-password-confirm"]').type("TestPass1@3");
    cy.get('[data-test-id="reg-submit-btn"]').click();
    cy.location("pathname").should("eq", "/login");
  });

  it("should not create a user because the given email already exist", () => {
    cy.contains(/User with this email already exists/i).should("not.exist");
    cy.get('[data-test-id="reg-name"]').type("Test User");
    cy.get('[data-test-id="reg-email"]').type("test@gmail.com");
    cy.get('[data-test-id="reg-password"]').type("TestPass1@3");
    cy.get('[data-test-id="reg-password-confirm"]').type("TestPass1@3");
    cy.get('[data-test-id="reg-submit-btn"]').click();
    cy.contains(/User with this email already exists/i);
  });

  it("should redirect to the login page", () => {
    cy.get('[data-test-id="login-btn"]').click();
    cy.location("pathname").should("eq", "/login");
  });
});
