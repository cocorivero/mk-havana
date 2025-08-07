describe("Test", () => {
  it("test", () => {
    cy.visit('/')
    cy.get(".text-3xl").should("exist");
  });
});
