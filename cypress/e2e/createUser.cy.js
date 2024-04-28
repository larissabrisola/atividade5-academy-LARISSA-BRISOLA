import { faker } from "@faker-js/faker";
import CreateUser from "../support/pages/createUser.page.cy";

describe("Criação de usuário", () => {
  let pageCreateUser = new CreateUser();

  beforeEach(() => {
    cy.visit("https://rarocrud-frontend-88984f6e4454.herokuapp.com/users");
    cy.get(".sc-gEvEer").click();
  });

  it("Criar usuário com sucesso", () => {
    let name = faker.person.jobTitle();
    let email = faker.internet.email();

    pageCreateUser.typeName(name);
    pageCreateUser.typeEmail(email);
    pageCreateUser.clickButtonSalvar();

    cy.get(".go2344853693");
    cy.contains("Usuário salvo com sucesso").should("be.visible");
  });
  it("Criar usuário - ERRO - Nome não pode ultrapassar 100 caracteres", () => {
    let name = Cypress._.repeat("jubileuieu", 11);
    let email = faker.internet.email();

    pageCreateUser.typeName(name);
    pageCreateUser.typeEmail(email);
    pageCreateUser.clickButtonSalvar();

    cy.get(".sc-jEACwC");
    cy.contains("Informe no máximo 100 caracteres para o nome").should(
      "be.visible"
    );
  });
  it("Criar usuário - ERRO - Email não pode ultrapassar 60 caracteres", () => {
    let name = faker.person.firstName();
    let email = Cypress._.repeat("jubileuleu", 11);

    pageCreateUser.typeName(name);
    pageCreateUser.typeEmail(email);
    pageCreateUser.clickButtonSalvar();

    cy.get(".sc-jEACwC"); // aviso
    cy.contains("Informe no máximo 60 caracteres para o e-mail").should(
      "be.visible"
    );
  });
  it("Criar usuário - ERRO - Email formato inválido", () => {
    let name = faker.person.firstName();
    let email = "example@ox@.com";

    pageCreateUser.typeName(name);
    pageCreateUser.typeEmail(email);
    pageCreateUser.clickButtonSalvar();

    cy.get(".sc-jEACwC"); // aviso
    cy.contains("Formato de e-mail inválido").should("be.visible");
  });
  it("Criar usuário - ERRO - Email já é utilizado.", () => {
    cy.intercept(
      "POST",
      "https://rarocrud-80bf38b38f1f.herokuapp.com/api/v1/users",
      {
        statusCode: 422,
      }
    ).as("postError");

    let name = faker.person.jobTitle();
    let email = faker.internet.email();

    pageCreateUser.typeName(name);
    pageCreateUser.typeEmail(email);
    pageCreateUser.clickButtonSalvar();

    cy.wait("@postError");
    cy.get("#root > div.sc-eBMEME.kIxLSF > div > div")
      .contains("Este e-mail já é utilizado por outro usuário.")
      .should("be.visible");
  });
  it("Criar usuário - ERRO - Email vazio", () => {
    let name = faker.person.jobTitle();

    pageCreateUser.typeName(name);
    pageCreateUser.clickButtonSalvar();

    cy.get(".sc-jEACwC"); // aviso
    cy.contains("O campo e-mail é obrigatório").should("be.visible");
  });
  it("Criar usuário - ERRO - Nome vazio", () => {
    let email = faker.internet.email();

    pageCreateUser.typeEmail(email);
    pageCreateUser.clickButtonSalvar();

    cy.get(".sc-jEACwC"); // aviso
    cy.contains("O campo nome é obrigatório").should("be.visible");
  });
  it("Criar usuário - ERRO - Todos os campos estão vazios", () => {
    pageCreateUser.clickButtonSalvar();

    cy.get(".sc-kOPcWz > :nth-child(3)");
    cy.contains("O campo nome é obrigatório").should("be.visible");

    cy.get(".sc-kOPcWz > :nth-child(3)");
    cy.contains("O campo e-mail é obrigatório").should("be.visible");
  });
});
