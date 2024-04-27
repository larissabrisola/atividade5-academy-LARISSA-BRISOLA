import { faker } from '@faker-js/faker';
import CreateUser from '../support/pages/createUser.page.cy';


describe('Criação de usuário', () => {
    let pageCreateUser = new CreateUser()

    beforeEach(() => {
        cy.visit('')
        cy.get('.sc-gEvEer').click()
    })

    it('Criar usuário com sucesso', () => {
        let name = faker.person.jobTitle()
        let email = faker.internet.email()

        // criando usuario
        pageCreateUser.typeName(name)
        pageCreateUser.typeEmail(email)
        pageCreateUser.clickButtonSalvar()

        // validando a criação 
        cy.get('.go2344853693') // aviso
        cy.contains('Usuário salvo com sucesso')
    })
    it('Criar usuário - ERRO - Nome não pode ultrapassar 100 caracteres', () => {
        let name = Cypress._.repeat('jubileuieu', 11);
        let email = faker.internet.email()

        // criando usuario
        pageCreateUser.typeName(name)
        pageCreateUser.typeEmail(email)
        pageCreateUser.clickButtonSalvar()
        // validando erro 
        cy.get('.sc-jEACwC') // aviso 
        cy.contains('Informe no máximo 100 caracteres para o nome')

    })
    it('Criar usuário - ERRO - Email não pode ultrapassar 60 caracteres', () => {
        let name = faker.person.firstName()
        let email = Cypress._.repeat('jubileuleu', 11)

        // criando usuario
        pageCreateUser.typeName(name)
        pageCreateUser.typeEmail(email)
        pageCreateUser.clickButtonSalvar()
        // validando erro 
        cy.get('.sc-jEACwC') // aviso 
        cy.contains('Informe no máximo 60 caracteres para o e-mail')
    })
    it('Criar usuário - ERRO - Email formato inválido', () => {
        let name = faker.person.firstName()
        let email = 'example@ox@.com'

        // criando usuario
        pageCreateUser.typeName(name)
        pageCreateUser.typeEmail(email)
        pageCreateUser.clickButtonSalvar()
        // validando erro 
        cy.get('.sc-jEACwC') // aviso 
        cy.contains('Formato de e-mail inválido')
    })
    it('Criar usuário - ERRO - Email já é utilizado.', () => {
        let name = faker.person.jobTitle()
        let email = faker.internet.email()

        // criando usuario
        pageCreateUser.typeName(name)
        pageCreateUser.typeEmail(email)
        pageCreateUser.clickButtonSalvar()
        // validando a criação 
        cy.get('.go2344853693') // aviso
        cy.contains('Usuário salvo com sucesso')
        // usando os dados do usuario criado acima 
        pageCreateUser.typeName(name)
        pageCreateUser.typeEmail(email)
        pageCreateUser.clickButtonSalvar()
        // validando erro 
        cy.get('#root > div.sc-eBMEME.kIxLSF > div > div')
        cy.contains('Este e-mail já é utilizado por outro usuário.')

    })
    it('Criar usuário - ERRO - Email vazio', () => {
        let name = faker.person.jobTitle()

        // criando usuario
        pageCreateUser.typeName(name)
        pageCreateUser.clickButtonSalvar()

        // validando a criação 
        cy.get('.sc-jEACwC') // aviso
        cy.contains('O campo e-mail é obrigatório')
    })
    it('Criar usuário - ERRO - Nome vazio', () => {
        let email = faker.internet.email()

        // criando usuario
        pageCreateUser.typeEmail(email)
        pageCreateUser.clickButtonSalvar()

        // validando a criação 
        cy.get('.sc-jEACwC') // aviso
        cy.contains('O campo nome é obrigatório')
    })
    it('Criar usuário - ERRO - Todos os campos estão vazios', () => {
        pageCreateUser.clickButtonSalvar()

        cy.get('.sc-kOPcWz > :nth-child(3)')
        cy.contains('O campo nome é obrigatório')

        cy.get('.sc-kOPcWz > :nth-child(3)')
        cy.contains('O campo e-mail é obrigatório')

    })
})

