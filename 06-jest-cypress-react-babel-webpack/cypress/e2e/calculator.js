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

describe('authenticated calculator', () => {
  it('displays the username', () => {
    cy.createUser().then(user => {
      cy.request({
        url: 'http://localhost:3000/login',
        method: 'POST',
        body: user,
      }).then(response => {
        window.localStorage.setItem('token', response.body.user.token)
      })

      cy.visit('/')

      cy.findByTestId('username-display').should('have.text', user.username)

      cy.findByText(/logout/i).click()

      cy.findByTestId('username-display').should('not.exist')
    })
  })
})
