describe('Central de Atendimento ao Cliente TAT', () => {
  //Aula02
  beforeEach(() => {
    cy.visit('../../src/index.html');
  });
  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT');
  });

  it('Preenche formulário - sucesso', () => {
    cy.get('input[id="firstName"]').type('Andre');
    cy.get('input[id="lastName"]').type('Molinari');
    cy.get('input[id="email"]').type('molinari.andref@gmail.com');
    cy.get('input[id="phone"]').type('41992282505');
    cy.get('textarea[id="open-text-area"]').type('Equipe excelente', {
      delay: 0,
    });
    cy.contains('button', 'Enviar').click();
    cy.get('.success').should('be.visible');
  });

  it('Preenche formulário - email inválido', () => {
    cy.get('input[id="firstName"]').type('Andre');
    cy.get('input[id="lastName"]').type('Molinari');
    cy.get('input[id="email"]').type('molinari.andref@gmail,com');
    cy.get('input[id="phone"]').type('41992282505');
    cy.contains('button', 'Enviar').click();
    cy.get('.error').should('be.visible');
  });

  it('O campo telefone continua vazio quando preenchido com valor não numérico', () => {
    cy.get('input[id="phone"]').type('abc').should('have.value', '');
  });

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('input[id="firstName"]').type('Andre');
    cy.get('input[id="lastName"]').type('Molinari');
    cy.get('input[id="email"]').type('molinari.andref@gmail.com');
    cy.get('input[id="phone-checkbox"]').check();
    cy.contains('button', 'Enviar').click();
    cy.get('.error').should('be.visible');
  });

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('input[id="firstName"]')
      .type('Andre')
      .should('have.value', 'Andre')
      .clear()
      .should('have.value', '');
    cy.get('input[id="lastName"]')
      .type('Molinari')
      .should('have.value', 'Molinari')
      .clear()
      .should('have.value', '');
    cy.get('input[id="email"]')
      .type('molinari.andref@gmail.com')
      .should('have.value', 'molinari.andref@gmail.com')
      .clear()
      .should('have.value', '');
    cy.get('textarea[id="open-text-area"]')
      .type('Equipe excelente')
      .should('have.value', 'Equipe excelente')
      .clear()
      .should('have.value', '');
  });

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.contains('button', 'Enviar').click();
    cy.get('.error').should('be.visible');
  });

  it('envia o formuário com sucesso usando um comando customizado', () => {
    cy.fillMandatoryFieldsAndSubmit();
    cy.get('.success').should('be.visible');
  });

  //Aula 03 - Get SELECT
  it('envia o formuário com sucesso usando um comando customizado', () => {
    cy.get('select[id="product"]')
      .select('YouTube')
      .should('have.value', 'youtube');
  });

  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('select[id="product"]')
      .select('mentoria')
      .should('have.value', 'mentoria');
  });

  it('seleciona um produto (Blog) por seu índice', () => {
    cy.get('select[id="product"]').select(1).should('have.value', 'blog');
  });

  //Aula 04 - Get RADIO BUTTON
  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('have.value', 'feedback');
  });

  it('marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]')
      .should('have.length', 3)
      .each(($radio) => {
        cy.wrap($radio).check();
        cy.wrap($radio).should('be.checked');
      });
  });

  //Aula 05 - Get CHECKBOX
  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked');
  });

  //Aula 06 - Upload files
  it.only('seleciona um arquivo da pasta fixtures', () => {
    cy.get('input[type="file"]#file-upload')
      .should('not.have.value')
      .selectFile('./cypress/fixtures/example.json')
      .should(($input) => {
        expect($input[0].files[0].name).to.equal('example.json');
      });
  });

  it.only('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('input[type="file"]#file-upload')
      .should('not.have.value')
      .selectFile('./cypress/fixtures/example.json', {
        action: 'drag-drop',
      })
      .should(($input) => {
        expect($input[0].files[0].name).to.equal('example.json');
      });
  });

  it.only('seleciona um arquivo utilizando uma fixture para qual foi dada um alias', () => {
    cy.fixture('example.json').as('sampleFile');
    cy.get('input[type="file"]#file-upload')
      .selectFile('@sampleFile')
      .should(($input) => {
        expect($input[0].files[0].name).to.equal('example.json');
      });
  });
});
