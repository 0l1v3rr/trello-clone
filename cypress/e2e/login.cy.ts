describe("login page tests", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("should log in a user", () => {
    cy.get('[data-test-id="login-email"]').type("test");
    cy.get('[data-test-id="login-password"').type("test");
    cy.get('[data-test-id="login-submit-btn"]').click();
    cy.location("pathname").should("eq", "/");

    cy.visit("/login");

    cy.get('[data-test-id="login-email"]').type("test@gmail.com");
    cy.get('[data-test-id="login-password"').type("test");
    cy.get('[data-test-id="login-submit-btn"]').click();
    cy.location("pathname").should("eq", "/");
  });

  it("should not log in a user because of wrong credentials", () => {
    cy.contains(/Invalid login credentials/i).should("not.exist");
    cy.get('[data-test-id="login-submit-btn"]').click();
    cy.contains(/Invalid login credentials/i);

    cy.reload();

    cy.contains(/Invalid login credentials/i).should("not.exist");
    cy.get('[data-test-id="login-email"]').type("doesntexist@aaa.com");
    cy.get('[data-test-id="login-password"').type(
      "ThisIsAnIncorrectPasswordComeOn!"
    );
    cy.get('[data-test-id="login-submit-btn"]').click();
    cy.contains(/Invalid login credentials/i);
  });

  it("should redirect to the register page", () => {
    cy.get('[data-test-id="reg-btn"]').click();
    cy.location("pathname").should("eq", "/register");
  });
});
