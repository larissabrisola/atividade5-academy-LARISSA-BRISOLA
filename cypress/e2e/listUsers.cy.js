describe("Listar usuários", () => {
  beforeEach(() => {
    cy.visit("https://rarocrud-frontend-88984f6e4454.herokuapp.com/users");
  });

  it("Listar todos usuários cadastrados", () => {
    cy.get("#listaUsuarios").should("be.visible");
  });

  it("Sem usuários cadastrados - Deve exibir opção para cadastrar um usuário", () => {
    cy.intercept("GET", "", {
      statusCode: 200,
      body: [],
    }).as("emptyList");

    cy.wait("@emptyList");
    // pegar o texto de naoe xiste usuario
    // pegar botao de criar novo usuario

    cy.get("h3")
      .contains("Ops! Não existe nenhum usuário para ser exibido.")
      .should("be.visible");
    cy.get("p").contains("Cadastre um novo usuário").should("be.visible");
  });
});
