describe("Login Page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("should successfully login as Admin", () => {
    cy.get("#username").type("admin");
    cy.get("#password").type("admin123");
    cy.get("form").submit();
    cy.url().should("eq", "http://localhost:3000/");
    cy.get(".login-container").should("not.exist");
  });

  it("should display error message for invalid login", () => {
    cy.get("#username").type("invaliduser");
    cy.get("#password").type("invalidpassword");
    cy.get("form").submit();
    cy.get(".login-container").should("be.visible");
    cy.contains("Invalid username or password").should("be.visible");
  });
});
