describe('Calculator 功能測試', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4173')
  })

  it('輸入數字與加法', () => {
    cy.get('[data-testid="btn-1"]').click()
    cy.get('[data-testid="btn-+"]').click()
    cy.get('[data-testid="btn-2"]').click()
    cy.get('[data-testid="btn-="]').click()
    cy.get('[data-testid="result"]').should('have.text', '3')
  })

  it('輸入數字與減法', () => {
    cy.get('[data-testid="btn-1"]').click()
    cy.get('[data-testid="btn--"]').click()
    cy.get('[data-testid="btn-2"]').click()
    cy.get('[data-testid="btn-="]').click()
    cy.get('[data-testid="result"]').should('have.text', '-1')
  })

  it('輸入數字與乘法', () => {
    cy.get('[data-testid="btn-2"]').click()
    cy.get('[data-testid="btn-×"]').click()
    cy.get('[data-testid="btn-2"]').click()
    cy.get('[data-testid="btn-="]').click()
    cy.get('[data-testid="result"]').should('have.text', '4')
  })

  it('輸入數字與除法', () => {
    cy.get('[data-testid="btn-4"]').click()
    cy.get('[data-testid="btn-÷"]').click()
    cy.get('[data-testid="btn-2"]').click()
    cy.get('[data-testid="btn-="]').click()
    cy.get('[data-testid="result"]').should('have.text', '2')
  })

  it('切換正負號', () => {
    cy.get('[data-testid="btn-5"]').click()
    cy.get('[data-testid="btn-+/-"]').click()
    cy.get('[data-testid="result"]').should('have.text', '(-5)')
  })

  it('計算百分比', () => {
    cy.get('[data-testid="btn-5"]').click()
    cy.get('[data-testid="btn-%"]').click()
    cy.get('[data-testid="result"]').should('have.text', '5%')
    cy.get('[data-testid="btn-="]').click()
    cy.get('[data-testid="result"]').should('have.text', '0.05')

  })

  it('清除資料', () => {
    cy.get('[data-testid="btn-9"]').click()
    cy.get('[data-testid="btn-AC"]').click()
    cy.get('[data-testid="result"]').should('have.text', '0')
  })
})
