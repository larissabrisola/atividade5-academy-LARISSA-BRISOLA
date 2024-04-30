describe("Listar usuários", () => {
  beforeEach(() => {
    cy.visit("https://rarocrud-frontend-88984f6e4454.herokuapp.com/users");
  });

  it("Listar todos usuários cadastrados", () => {
    cy.intercept("GET", "", {
      statusCode: 200,
      body: [
        {
          id: "8fa85f64-5717-4562-b3fc-2c963f66afa6",
          name: "Joana",
          email: "user@example.com",
          createdAt: "2024-04-28T20:43:51.446Z",
          updatedAt: "2024-04-28T20:43:51.446Z",
        },
        {
          id: "9fa85f64-5717-4562-b3fc-2c963f66af86",
          name: "Pedro",
          email: "user@example.com",
          createdAt: "2024-04-28T20:43:51.446Z",
          updatedAt: "2024-04-28T20:43:51.446Z",
        },
      ],
    });

    cy.get("#listaUsuarios").should("be.visible");
  });

  it("Sem usuários cadastrados - Deve exibir opção para cadastrar um usuário", () => {
    cy.intercept("GET", "", {
      statusCode: 200,
      body: [],
    }).as("emptyList");

    cy.wait("@emptyList");

    cy.get("h3")
      .contains("Ops! Não existe nenhum usuário para ser exibido.")
      .should("be.visible");
    cy.get("p").contains("Cadastre um novo usuário").should("be.visible");
  });
});
