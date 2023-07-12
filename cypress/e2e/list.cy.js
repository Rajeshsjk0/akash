describe("Home Page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get("#username").type("admin");
    cy.get("#password").type("admin123");
    cy.get("form").submit();
    cy.get(".bottom-button button")
      .contains("View Submitted Transactions")
      .click();
  });

  it("should display transaction data fetched from API", () => {
    // cy.intercept(
    //   "GET",
    //   "https://63e63fd9c8839ccc2854503d.mockapi.io/contacts/transactions"
    // ).as("fetchTransactions");

    cy.request(
      "https://63e63fd9c8839ccc2854503d.mockapi.io/contacts/transactions"
    ).then((response) => {
      console.log(response);
      expect(response.status).to.eq(200);
      expect(response.body).to.have.length.above(0);
    });

    cy.get(".MuiTableContainer-root").should("be.visible");

    cy.visit("http://localhost:3000/submittedTransactions");
  });
});
