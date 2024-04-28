export default class CreateUser {
  inputName = "#name";
  inputEmail = "#email";
  buttonSalvar = ".sc-kpDqfm";

  //
  typeName(name) {
    cy.get(this.inputName).type(name);
  }

  typeEmail(email) {
    cy.get(this.inputEmail).type(email);
  }

  clickButtonSalvar() {
    cy.get(this.buttonSalvar).click();
  }
}
