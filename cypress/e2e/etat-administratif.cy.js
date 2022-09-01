describe('Etat administratif', () => {
  it('Non diffusible"', () => {
    cy.visit('/entreprise/414847962');
    cy.contains('état inconnu (non-diffusible)').should('have.length', 1);
  });

  it('Diffusible', () => {
    cy.visit('/entreprise/880878145');
    cy.contains('en activité').should('have.length', 1);
  });

  it('En sommeil', () => {
    cy.visit('/entreprise/333257343');
    cy.contains('en sommeil').should('have.length', 1);
  });

  it('Cessée', () => {
    cy.visit('/entreprise/839517323');
    cy.contains('cessée').should('have.length', 1);
  });
});