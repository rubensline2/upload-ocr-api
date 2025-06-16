# Plano Estratégico de Testes (Alto Nível)

Este documento descreve o plano estratégico de testes para garantir a qualidade e estabilidade da aplicação antes do seu go-live. Ele cobre a abordagem geral de testes, tipos de testes adotados, framework utilizado, riscos, premissas, cenários críticos e as principais métricas de qualidade que devem ser acompanhadas ao longo do processo.

---

## 🧱 Arquitetura da Aplicação e Pontos de Falha

A aplicação segue uma arquitetura baseada em **frontend web**, **backend (API REST)** e um serviço de **OCR para leitura de arquivos PDF**. O upload de documentos é feito via UI, processado pelo backend e enviado ao serviço OCR para extração de dados.

### Pontos críticos potenciais:
- ❌ Falhas no upload ou validação de arquivos PDF (ex: tamanho, formato).
- ❌ Comunicação instável entre frontend ↔ backend ou backend ↔ OCR.
- ❌ Respostas incorretas ou inconsistentes da API OCR.
- ❌ Processamento de arquivos demorando além do aceitável.
- ❌ Regressões em funcionalidades críticas já implementadas.

---

## ✅ Tipos de Testes e Justificativa

| Tipo de Teste          | Descrição                                                                 | Justificativa |
|------------------------|---------------------------------------------------------------------------|----------------|
| **Testes Unitários**   | Validam funções isoladas, como validações de extensão ou tamanho de arquivos. | Garante que a lógica de negócios funcione corretamente. |
| **Testes de Integração** | Verificam a interação entre componentes (ex: envio de PDF → resposta do OCR). | Assegura que os módulos se comuniquem corretamente. |
| **Testes de Contrato** | Validam os contratos da API (ex: schema de resposta do OCR).                | Prevêm que mudanças na API não quebrem o sistema. |
| **Testes de Regressão** | Validam funcionalidades críticas sempre que houver deploy ou merge.         | Evitam que novas mudanças quebrem o que já está funcionando. |
| **Testes End-to-End (E2E)** | Automatizam fluxos reais do usuário com Cypress.                        | Garante que o sistema funciona como um todo em ambientes reais. |

---

## 🧰 Framework de Testes Escolhido

**Framework:** [Cypress](https://www.cypress.io/)

### ✔ Justificativa Técnica:
- ✅ **Simples de configurar e usar**, com uma curva de aprendizado suave para a equipe de QA.
- ✅ Permite testes **E2E, integração e API** no mesmo ambiente.
- ✅ **Alta performance** por rodar diretamente no navegador, com capacidade de debug visual.
- ✅ Suporte robusto a **mocks**, **interceptações de rede** e **simulação de falhas em APIs**.
- ✅ Integração nativa com **GitHub Actions** e geração de relatórios com **Allure**.
- ✅ Ampla comunidade e excelente documentação.

A estrutura do projeto utiliza o padrão **Page Object Model (POM)** para promover reutilização, manutenibilidade e clareza dos testes automatizados.

---

## ⚠️ Riscos e Premissas

### Riscos Técnicos
- ❗ API OCR pode ter instabilidade ou latência imprevisível.
- ❗ Falta de mocks confiáveis para testes locais da API OCR.
- ❗ Problemas de versionamento em bibliotecas de terceiros (ex: plugin Allure).

### Riscos Organizacionais
- ❗ Time de QA reduzido ou com múltiplas frentes de trabalho.
- ❗ Ambiente de homologação instável ou indisponível para testes automatizados.
- ❗ Ausência de definição clara de critérios de aceite com stakeholders.

### Premissas
- ✅ O ambiente de testes será o mais próximo possível do ambiente de produção.
- ✅ Os arquivos de exemplo utilizados nos testes representam os documentos reais do usuário.
- ✅ O serviço de OCR está ativo e com respostas dentro do SLA.

---

## 🔍 Cenários Críticos para Testes (Pré Go-Live)

1. ✅ **Upload bem-sucedido de um PDF válido (menos de 10MB)**  
   → Confirma que o fluxo básico está funcionando.

2. ❌ **Rejeição de arquivo PDF maior que 10MB**  
   → Garante que regras de validação estão ativas e funcionando.

3. ❌ **Rejeição de arquivos com formato inválido (.jpg, .docx)**  
   → Previne entradas incorretas no sistema.

4. 🔁 **Resiliência em caso de falha na API OCR (ex: 500 ou timeout)**  
   → Verifica tratamento de erros e mensagens amigáveis ao usuário.

5. 🔍 **Validação da resposta completa da API OCR (estrutura esperada, campos obrigatórios)**  
   → Garante a integridade dos dados extraídos do PDF.

---

## 📊 Métricas e Análise de Qualidade

### Indicadores Propostos

| Métrica                         | Descrição                                                                 |
|---------------------------------|---------------------------------------------------------------------------|
| **Cobertura de Testes (%)**     | Percentual de linhas de código cobertas por testes unitários/integrados. |
| **Tempo Médio de Execução**     | Tempo médio para execução completa da suíte de testes.                   |
| **Taxa de Sucesso dos Testes**  | Proporção de testes que passaram em relação ao total executado.         |
| **Falhas por Tipo de Teste**    | Quantidade de falhas categorizadas por tipo (unitário, integração, E2E). |
| **Defeitos Críticos por Sprint**| Quantidade de bugs críticos identificados em produção/homologação.       |

---

### 📈 Simulação de Relatório (Execução Fictícia)

| Tipo de Teste     | Total | Passaram | Falharam | Cobertura (%) | Tempo Médio |
|------------------|-------|----------|----------|----------------|--------------|
| Unitários        | 120   | 120      | 0        | 92%            | 15s          |
| Integração       | 40    | 39       | 1        | —              | 25s          |
| Contrato         | 10    | 10       | 0        | —              | 5s           |
| E2E              | 18    | 17       | 1        | —              | 1m 40s       |
| **Total**        | 188   | 186      | 2        | —              | 2m 25s       |

---

### 📌 Métricas Acionáveis

As métricas abaixo são consideradas **acionáveis**, ou seja, relevantes para tomada de decisão:

- **Falhas por Tipo de Teste:** permite priorizar correções onde há maior concentração de falhas (ex: E2E com falhas → pode indicar problemas de integração ou dados).
- **Defeitos Críticos por Sprint:** se bugs estão escapando para produção, é necessário revisar a estratégia de testes.
- **Cobertura de Testes:** cobertura abaixo de 70% em módulos críticos exige reforço em testes unitários/integrados.
- **Tempo de Execução da Suíte:** se ultrapassar o tempo limite de pipeline (ex: 10 min), pode impactar a entrega contínua.

Essas métricas devem ser monitoradas a cada ciclo de entrega e discutidas com o time de produto para embasar decisões sobre:  
✅ Prioridades de correção  
✅ Go/No-Go para deploy  
✅ Débitos técnicos a serem tratados  

---

## 🌍 Cenário Adicional – Validação Multi-Regional e Conformidade com Privacidade

### 🧭 Estratégia para Validação Geolocalizada

A aplicação passou a operar em diferentes regiões (LATAM, EMEA, NA), sendo necessário validar o comportamento regional e o tratamento de dados sensíveis.

#### 🎯 Simulação de Usuários por Região

- Simulação de headers de geolocalização (`X-Forwarded-For`, `GeoIP`)
- Uso de proxies ou serviços como BrowserStack/Geonode
- Dados formatados regionalmente:
  - **LATAM**: CPF, idioma PT-BR
  - **EMEA**: NIN (UK), idioma EN/DE/FR
  - **NA**: SSN, idioma EN-US

#### 🔍 Validações por Região

- Tradução/localização da interface e mensagens de erro
- Validação de caracteres e formatos específicos
- Diferenças de latência e comportamento sob rede limitada
- Diferenciação de políticas legais e consentimento

---

### ⚙️ Testes Paralelos e Orquestração Distribuída

#### 🧪 Execução Paralela por Região

- **GitHub Actions Matrix Strategy**:
  ```yaml
  strategy:
    matrix:
      region: [LATAM, EMEA, NA]
      browser: [chrome, firefox]


---

## 🧪 Execução dos Testes

Os testes automatizados estão escritos com **Cypress**, usando o padrão **Page Object Model (POM)**. Os relatórios são gerados com **Allure Reports** e a execução em CI está configurada com **GitHub Actions**.

## Como rodar o projeto localmente

1. Suba o servidor local da aplicação mock OCR em http://localhost:3333/OCRAPI
2. Instale as dependências:
```bash
npm install
```
3. Execute os testes:
```bash
npm run test
```
4. Gere e abra o relatório Allure:
```bash
npm run allure:generate
npm run allure:open
```

