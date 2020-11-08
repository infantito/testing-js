import {userBuilder} from '../support/generate'

Cypress.Commands.add('createUser', overrides => {
  // create user
  const user = userBuilder(overrides)

  cy.request({
    url: 'http://localhost:3000/register',
    method: 'POST',
    body: user,
  }).then(({body}) => body.user)
})

Cypress.Commands.add('login', user => {
  return cy
    .request({
      url: 'http://localhost:3000/login',
      method: 'POST',
      body: user,
    })
    .then(({body}) => {
      window.localStorage.setItem('token', body.user.token)

      return body.user
    })
})

Cypress.Commands.add('assertHome', () => {
  cy.url().should('eq', `${Cypress.config().baseUrl}/`)
})

Cypress.Commands.add('assertLoggedInAs', user => {
  cy.window()
    .its('localStorage.token')
    .should('be.a', 'string')

  cy.findByTestId('username-display').should('have.text', user.username)
})
