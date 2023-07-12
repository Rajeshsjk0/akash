describe("Home Page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get("#username").type("admin");
    cy.get("#password").type("admin123");
    cy.get("form").submit();
    cy.get(".top-button button").contains("New Transaction").click();
  });

  it("should fill out the form and submit successfully", () => {
    cy.get('input[name="type"][value="existing"]').check();
    cy.get('input[name="reference"]').type("ABC123");
    cy.get('input[name="customerNumber"]').type("123456");
    cy.get('input[name="customerName"]').type("John Doe");
    cy.get('input[name="customerAddress"]').type("123 Main Street");
    cy.get('input[name="phoneNumber"]').type("1234567890");
    cy.get('input[name="transferAmount"]').type("1000");
    cy.get('select[name="transferCurrency"]').select("USD");
    cy.get('input[name="beneficiaryBank"]').type("Beneficiary Bank");
    cy.get('input[name="beneficiaryAccountNumber"]').type("1234567890");
    cy.get('input[name="paymentDetails"]').type("Payment details");
    cy.get('input[name="cardDetails"]').type("Card details");
    cy.get('select[name="region"]').select("Port Louis");

    cy.get('button[type="submit"]').click();

    cy.url().should("eq", "http://localhost:3000/");
  });

  it("should display an error message for invalid form input", () => {
    cy.get('input[name="type"][value="existing"]').check();
    cy.get('input[name="reference"]').type("ABC123");
    cy.get('input[name="customerNumber"]').type("123456");
    cy.get('input[name="customerName"]').type("John Doe");
    cy.get('input[name="customerAddress"]').type("123 Main Street");
    cy.get('input[name="phoneNumber"]').type("1234567890");
    cy.get('input[name="transferAmount"]').type("1000");
    cy.get('select[name="transferCurrency"]').select("USD");
    cy.get('input[name="beneficiaryBank"]').type("12345");
    cy.get('input[name="beneficiaryAccountNumber"]').type("1234567890");
    cy.get('input[name="paymentDetails"]').type("Payment details");
    cy.get('input[name="cardDetails"]').type("Card details");
    cy.get('select[name="region"]').select("Port Louis");

    cy.get('button[type="submit"]').click();

    cy.contains("Beneficiary bank must contain characters only");
  });
});
