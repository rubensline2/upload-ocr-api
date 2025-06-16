const BASE_URL = 'http://localhost:3333/OCRAPI';
const OCR_API_KEY = 'K88190528988957';

class UploadApiPage {
  enviarArquivo(fileName, expectedStatus = 200, simularErroOCR = false) {
    if (simularErroOCR) {
      cy.intercept('POST', BASE_URL, {
        statusCode: 500,
        body: { error: 'Simulação de falha no OCR' }
      }).as('ocrErro');
    }

    cy.fixture(fileName, 'binary')
      .then(Cypress.Blob.binaryStringToBlob)
      .then((fileContent) => {
        const formData = new FormData();
        formData.append('file', fileContent, fileName);

        cy.request({
          method: 'POST',
          url: BASE_URL,
          headers: {
            'Content-Type': 'multipart/form-data',
            apikey: OCR_API_KEY
          },
          body: formData,
          failOnStatusCode: true
        }).then((response) => {
          cy.log(`📄 Status: ${response.status}`);
          cy.log(`📄 Body: ${JSON.stringify(response.body)}`);
          expect(response.status).to.eq(200);
        });
      });
  }
  mockErro500() {
    cy.intercept('POST', '/OCRAPI', {
      statusCode: 500,
      body: { message: 'Erro interno no servidor OCR' }
    }).as('mockOCR');
  }

  uploadArquivoValidoComErroEsperado(expectedStatus) {
    const filePath = 'docs/arquivoValido.pdf';

    cy.fixture(filePath, 'base64').then(fileContent => {
      const blob = Cypress.Blob.base64StringToBlob(fileContent, 'application/pdf');
      const formData = new FormData();
      formData.append('file', blob, 'arquivoValido.pdf');

      cy.request({
        method: 'POST',
        url: BASE_URL,
        headers: {
          'Content-Type': 'multipart/form-data',
          apikey: OCR_API_KEY
        },
        body: formData,
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(expectedStatus);
        if (expectedStatus === 500) {
          expect(response.body).to.have.property('message', 'Erro interno no servidor OCR');
        }
      });
    });
  }
}
export default new UploadApiPage();