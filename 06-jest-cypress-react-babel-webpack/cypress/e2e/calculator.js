describe('anonymous calculator', () => {
  it('can make calculations', () => {
    // use `findByText` because of it's asynchronous
    cy.visit('/')

    cy.findByText(/^1$/).click()

    cy.findByText(/^\+$/).click()

    cy.findByText(/^2$/)
      /* debug 01
       .then(subject => {
         debugger
         return subject
       })
      */
      /* debug 02
        .pause()
      */
      /* debug 03
        .debug()
      */
      /* debug 04
       you can debug from your app directly as well.
      */
      .click()

    cy.findByText(/^=$/).click()

    cy.findByTestId('total').should('have.text', '3')
  })
})
