describe('anonymous calculator', () => {
  it('can make calculations', () => {
    // use `findByText` because of it's asynchronous
    cy.visit('/')

    cy.findByText(/^1$/).click()

    cy.findByText(/^\+$/).click()

    cy.findByText(/^2$/).click()

    cy.findByText(/^=$/).click()

    cy.findByTestId('total').should('have.text', '3')
  })
})
