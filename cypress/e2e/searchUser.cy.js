describe("Pesquisar usuário", () => {
  beforeEach(() => {
    cy.visit("https://rarocrud-frontend-88984f6e4454.herokuapp.com/users");
  });
  it("Pesquisar usuário com sucesso", () => {
    cy.intercept(
      "GET",
      "https://rarocrud-80bf38b38f1f.herokuapp.com/api/v1/search?value=name",
      {
        statusCode: 200,
        body: [
          {
            id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            name: "Name Surname",
            email: "user@example.com",
            createdAt: "2024-04-28T20:43:51.446Z",
            updatedAt: "2024-04-28T20:43:51.446Z",
          },
          {
            id: "3fa85f64-5717-4562-b3fc-2c963f66af86",
            name: "Name Surname",
            email: "user@example.com",
            createdAt: "2024-04-28T20:43:51.446Z",
            updatedAt: "2024-04-28T20:43:51.446Z",
          },
        ],
      }
    ).as("userEx");
    cy.get(".sc-aXZVg.iYVcAu").type("name");

    cy.get("#listaUsuarios").should("be.visible");
  });

  it('Pesquisar usuario - usuário não encontrado', ()=>{
    cy.intercept(
      "GET",
      "https://rarocrud-80bf38b38f1f.herokuapp.com/api/v1/search?value=123",
      {
        statusCode: 200,
        body: [
        ],
      }
    ).as("userEx");
    cy.get(".sc-aXZVg.iYVcAu").type("123");

    //
    cy.get("h3")
    .contains("Ops! Não existe nenhum usuário para ser exibido.")
    .should("be.visible");
  cy.get("p").contains("Cadastre um novo usuário").should("be.visible");
  })
});
