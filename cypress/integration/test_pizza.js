describe("Testing User Interaction with form", function() {
    beforeEach(function() {
        cy.visit('http://localhost:3000/pizza'); 
    })

    it("Completes the 3 fields of name email and reason", function() {
        cy.get("input[name='name']")
            .type("Andrew The Greatest")
            .should("have.value","Andrew The Greatest"); 
        cy.get("select")
            .select("medium")
        cy.get("input[name='jalapenos']")
            .check()
            .should("be.checked"); 
        cy.get("[data-cy='submit']").click(); 
    })
})