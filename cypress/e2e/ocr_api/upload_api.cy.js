import uploadApiPage from '../../support/page_objects/UploadApiPage';

describe('📦 Testes de Upload via OCR API', () => {
  it('✅ Upload de arquivo válido', () => {
    uploadApiPage.enviarArquivo('documento_valido.pdf', 200);
  });

  it('❌ Upload com falha por tamanho excedido (>10MB)', () => {
    uploadApiPage.enviarArquivo('documento_invalido_maior_10mb.pdf', 413);
  });

  it('❌ Simulação de falha no OCR (resposta 500)', () => {
    it('Deve simular erro 500 na API OCR e validar fallback', () => {
      uploadApiPage.mockErro500(); // intercepta antes da chamada
      uploadApiPage.uploadArquivoValidoComErroEsperado(500);
    });
  });
});