import {userBuilder} from '../support/generate'

describe('registration', () => {
  it('should register a new user', () => {
    const user = userBuilder()

    cy.visit('/')

    cy.findByText(/register/i).click()

    cy.findByLabelText(/username/i).type(user.username)

    cy.findByLabelText(/password/i).type(user.password)

    cy.findByText(/submit/i).click()

    // Assert redirect to HOME page
    cy.url().should('eq', `${Cypress.config().baseUrl}/`)

    cy.window()
      .its('localStorage.token')
      .should('be.a', 'string')
  })
})
