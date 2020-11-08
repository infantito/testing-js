import {userBuilder} from '../support/generate'

describe('login', () => {
  it('should register a new user', () => {
    const user = userBuilder()

    cy.visit('/')

    cy.findByText(/register/i).click()

    cy.findByLabelText(/username/i).type(user.username)

    cy.findByLabelText(/password/i).type(user.password)

    cy.findByText(/submit/i).click()

    cy.findByText(/logout/i).click()

    // now our test can start...

    cy.findByText(/login/i).click()

    cy.findByLabelText(/username/i).type(user.username)

    cy.findByLabelText(/password/i).type(user.password)

    cy.findByText(/submit/i).click()

    // now let's verify things are set after login
    cy.url().should('eq', `${Cypress.config().baseUrl}/`)

    cy.window()
      .its('localStorage.token')
      .should('be.a', 'string')

    cy.findByTestId('username-display').should('have.text', user.username)
  })
})
