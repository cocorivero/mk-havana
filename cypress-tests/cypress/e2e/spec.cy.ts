describe("Test", () => {
  it("test", () => {
    cy.visit("/");
    cy.get(".text-3xl").should("exist");
    cy.get(".my-4 > .text-pink-600").should("have.text", "35 productos encontrados");
    cy.get('select').first().select('Men')
    cy.get('.my-4 > .text-pink-600').should("have.text", "13 productos encontrados");
    
  });
});
