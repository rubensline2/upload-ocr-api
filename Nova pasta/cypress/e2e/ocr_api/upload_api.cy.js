import uploadApiPage from '../../support/page_objects/UploadApiPage';

describe('📦 Testes de Upload via OCR API', () => {
  it('✅ Upload de arquivo válido', () => {
    uploadApiPage.enviarArquivo('documento_valido.pdf', 200);
  });

  it('❌ Upload com falha por tamanho excedido (>10MB)', () => {
    uploadApiPage.enviarArquivo('documento_invalido_maior_10mb.pdf', 413);
  });

  it('❌ Simulação de falha no OCR (resposta 500)', () => {
    uploadApiPage.enviarArquivo('documento_valido.pdf', 500, true);
  });
});