describe("Home Page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get("#username").type("admin");
    cy.get("#password").type("admin123");
    cy.get("form").submit();
  });

  it("should navigate to New Transaction page when 'New Transaction' button is clicked", () => {
    cy.get(".top-button button").contains("New Transaction").click();
    cy.url().should("eq", "http://localhost:3000/newTransaction");
  });

  it("should navigate to Submitted Transactions page when 'View Submitted Transactions' button is clicked (only for Admin)", () => {
    cy.get(".bottom-button button")
      .contains("View Submitted Transactions")
      .click();
    cy.url().should("eq", "http://localhost:3000/submittedTransactions");
  });
});
