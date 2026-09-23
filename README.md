<div align="center">

<img src="https://img.shields.io/badge/Google%20Apps%20Script-Backend-4285F4?style=for-the-badge&logo=google&logoColor=white"/>
<img src="https://img.shields.io/badge/Google%20Sheets-Data%20Layer-34A853?style=for-the-badge&logo=googlesheets&logoColor=white"/>
<img src="https://img.shields.io/badge/Gemini-IA%20%2F%20NLP-8E75B2?style=for-the-badge&logo=googlegemini&logoColor=white"/>
<img src="https://img.shields.io/badge/Status-Est%C3%A1vel-00C853?style=for-the-badge"/>
<img src="https://img.shields.io/badge/Version-1.2.5-6A1B9A?style=for-the-badge"/>

<br/><br/>

# Finance AI Lite

**Assistente financeiro pessoal conversacional com inteligência artificial**

*Talk. Track. Understand.*

</div>

---

## 🧠 O problema

No controle financeiro pessoal, tarefas simples ainda costumam exigir muita interação manual: registrar gastos, categorizar lançamentos, acompanhar cartões, entender faturas, revisar assinaturas e transformar uma planilha em decisões úteis.

O Finance AI Lite reduz essa fricção usando linguagem natural sem delegar as regras financeiras críticas ao modelo de IA.

---

## 🚀 A solução

Em vez de preencher formulários, o usuário descreve o que aconteceu:

```text
Gastei R$ 35 no transporte pelo Pix da Conta Principal.
```

Ou consulta os próprios dados:

```text
Compare minhas despesas deste mês com o mês passado.
```

O **Gemini** interpreta intenção e estrutura dados; o **Google Apps Script** valida e executa regras determinísticas; o **Google Sheets** funciona como ledger, camada de persistência e base analítica.

> **Princípio do projeto: IA interpreta; código decide.**

---

## ⚙️ Como funciona

```text
Usuário
   |
   v
Web App responsivo
   |
   v
Roteamento de intenção
   |-- heurísticas determinísticas quando possível
   `-- Gemini quando necessário
   |
   v
Schema + contexto focados na operação
   |
   v
Google Apps Script
validação + regras financeiras determinísticas
   |
   v
Google Sheets
persistência + dashboard + análises
   |
   v
Resposta conversacional + resultados estruturados
```

A linha **v1.2.x** reforçou essa separação com roteamento por operação, contratos focados e menor dependência de prompts/schemas monolíticos.

---

## ✨ Destaques da v1.2.5

A **v1.2.5 Stable CLEAN** amplia a linha v1.2 com foco em experiência, consultas de cartão e previsibilidade operacional:

- dashboard Web redesenhado, responsivo e com temas claro/escuro;
- KPIs, gráficos, contas, cartões, assinaturas, vencimentos, metas e insights reorganizados;
- nova operação dedicada `ConsultaFaturas`, separada de consultas financeiras genéricas;
- consulta de faturas por cartão, competência, status, abertas, total em aberto e próxima fatura;
- listagem determinística dos itens da fatura, preservando a data original da compra;
- parcelamentos exibidos na competência correta sem perder a data original;
- estados conversacionais de fatura simplificados para **Em aberto**, **Paga** e **Vencida**;
- categorização determinística de serviços de assinatura conhecidos, compartilhada pelo fluxo geral e pelo fast path;
- renderer estruturado para faturas no chat, com melhor leitura em desktop/mobile e copy/paste consistente;
- suíte consolidada com **133 verificações automatizadas**;
- homologação concluída em QA, planilha principal, `/dev` e `/exec`.

> O motor financeiro completo continua privado. O repositório público documenta a arquitetura e mantém uma camada Web segura para portfólio.

---

## 🔍 Funcionalidades

### 💰 Movimentações e auditoria

- receitas e despesas;
- registro por linguagem natural;
- Pix e outros meios de pagamento;
- categorização automática;
- regras personalizadas de categoria;
- edição e exclusão com confirmação;
- desfazer última edição/exclusão elegível;
- trilha de auditoria.

### 🏦 Contas, cartões e faturas

- saldo por conta;
- consulta de contas ativas;
- transferências entre contas próprias;
- compras no crédito;
- compras parceladas;
- fechamento e vencimento;
- pagamentos parciais ou integrais de fatura;
- prevenção de dupla contabilização;
- consulta dedicada de faturas abertas, próxima fatura, status e competência;
- listagem dos itens da fatura com data original da compra e informação de parcela.

### 🔁 Assinaturas e recorrências

- criação por linguagem natural;
- próxima cobrança;
- custo mensal/anual;
- pausa, cancelamento e reativação;
- sincronização com recorrências;
- processamento automático;
- consulta de assinaturas ativas em formato de lista.

### 🎯 Metas e orçamentos

- metas com valor alvo, data e prioridade;
- aportes e progresso;
- limite mensal por categoria;
- uso do orçamento;
- status de atenção e excesso.

### 📊 Dashboard v2

- layout financeiro redesenhado para desktop e mobile;
- temas claro e escuro;
- receitas, despesas, resultado e taxa de poupança;
- saldo total e próxima fatura;
- gráfico de Receitas x Despesas;
- distribuição de despesas por categoria;
- contas, cartões, assinaturas e vencimentos;
- histórico de resultados, metas e insights prioritários;
- filtros por conta, cartão e categoria;
- drill-down de transações.

### 🧠 Insights, alertas e previsões

- padrões e anomalias;
- ritmo de gastos;
- concentração por categoria;
- alertas de orçamento;
- faturas próximas/atrasadas;
- cobranças de assinaturas;
- metas em risco;
- central com ciclo de vida e histórico;
- resumo semanal automatizado;
- forecast financeiro.

### 🔎 Busca financeira avançada

Consultas determinísticas com períodos, conta, cartão, categoria, descrição, tipo, meio de pagamento, valor, parcelamento, ordenação, rankings e comparações entre períodos.

Exemplos:

```text
Mostre minhas despesas acima de R$ 200 neste mês.
```

```text
Quais foram meus 5 maiores gastos deste mês?
```

```text
Qual categoria mais cresceu entre o mês passado e este mês?
```

### 💬 Experiência conversacional

- contexto entre mensagens;
- perguntas de complemento;
- confirmação de ações sensíveis;
- histórico local;
- atalhos rápidos;
- busca avançada descobrível;
- cards estruturados de resultados;
- interface responsiva para desktop e mobile.

---

## 🧾 Regras financeiras importantes

### Compra no cartão de crédito

Uma compra no crédito **não reduz imediatamente o saldo bancário**.

```text
Compra no crédito -> Fatura -> Pagamento da fatura -> Impacto no caixa
```

### Transferência entre contas próprias

Uma transferência não representa receita nem despesa.

```text
Conta A - R$ 200
Conta B + R$ 200
Resultado financeiro = R$ 0
```

### Pagamento de fatura

O pagamento reduz o caixa, mas não cria uma nova despesa, evitando dupla contabilização.

### Parcelamento

Parcelas são distribuídas pelas competências correspondentes e o valor total é preservado mesmo quando há divisão de centavos.

---

## 🖥️ Web App

A pasta [`src/`](src/) contém a camada Web publicada neste repositório:

```text
src/
|-- WebApp.gs
|-- Index.html
|-- Styles.html
`-- Scripts.html
```

> O motor financeiro completo de produção não é publicado neste repositório público. O repositório mantém uma versão segura para portfólio, documentação e demonstração da camada Web.

---

## 🏗️ Arquitetura

```text
Finance-AI-Lite/
|-- src/
|   |-- WebApp.gs
|   |-- Index.html
|   |-- Styles.html
|   `-- Scripts.html
|
|-- docs/
|   |-- ARCHITECTURE.md
|   |-- FEATURES.md
|   |-- USAGE.md
|   |-- RELEASE_v1.2.md
|   |-- RELEASE_v1.2.4.md
|   `-- RELEASE_v1.2.5.md
|
|-- SECURITY.md
|-- .gitignore
`-- README.md
```

Mais detalhes em [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).

---

## 🛠️ Stack

| Camada | Tecnologia |
|---|---|
| Backend | Google Apps Script |
| Persistência / Ledger | Google Sheets |
| Inteligência Artificial | Gemini API |
| Frontend | HTML, CSS e JavaScript |
| Deploy | Apps Script Web App |
| Análise complementar | NotebookLM |

---

## 🔐 Segurança

Credenciais e dados pessoais não são versionados.

Não devem ser publicados:

- chaves da Gemini API;
- IDs privados de planilhas;
- tokens;
- exports financeiros;
- dados bancários reais;
- faturas reais;
- histórico financeiro pessoal.

Consulte [`SECURITY.md`](SECURITY.md).

---

## 🧪 Homologação

A **v1.2.5 Stable CLEAN** foi promovida após:

```text
Suíte estável -> 133/133
QA funcional -> aprovada
Planilha principal -> validada
Smoke /dev -> aprovado
Deploy /exec -> publicado
Smoke /exec -> aprovado
```

A suíte consolidada cobre regressão do motor, dashboard, roteamento e leitura de faturas, itens de fatura, categorização de serviços e acabamento das respostas.

Um erro HTTP 503 isolado da Gemini foi observado durante smoke e a mesma consulta funcionou na tentativa seguinte; a dependência externa permanece tratada como indisponibilidade transitória, não como inconsistência financeira.

---

## 📘 Uso

O usuário não precisa memorizar uma sintaxe rígida. A recomendação é informar, quando aplicável:

```text
ação + valor + descrição + data + conta/cartão + detalhes
```

Exemplo:

```text
Gastei R$ 89,90 no mercado hoje no débito da Conta Principal.
```

Consulte [`docs/USAGE.md`](docs/USAGE.md) para exemplos de lançamentos, faturas, transferências, recorrências, assinaturas, metas, consultas, edição e exclusão.

---

## ⚠️ Limitações

- projeto orientado a uso pessoal;
- sem autenticação multiusuário;
- sem integração direta com Open Finance;
- sem importação automática bancária;
- sem integração com WhatsApp na versão atual;
- Google Sheets permanece como camada principal de persistência;
- o motor financeiro completo de produção não é distribuído no repositório público.

---

## 🗺️ Roadmap

| Versão | Foco | Status |
|---|---|---|
| v1.0 | Motor financeiro, Sheets, Gemini e módulos de inteligência | ✅ Concluído |
| v1.1 | Web App responsivo + experiência conversacional | ✅ Concluído |
| v1.1.1 | Compatibilidade de fórmulas com localidade `pt-BR` | ✅ Concluído |
| v1.2 | Auditoria, Dashboard v2, Insights, Alertas, Busca avançada e UX | ✅ Concluído |
| v1.2.2 | Roteamento estruturado e contratos focados | ✅ Concluído |
| v1.2.3 | Consulta determinística de contas ativas | ✅ Concluído |
| v1.2.4 | Melhorias de apresentação e regressão consolidada | ✅ Concluído |
| v1.2.5 | Dashboard redesign, ConsultaFaturas e refinamentos de categorização/UX | ✅ Stable |
| v1.3 | Captura multimodal / novas integrações | 🧭 Planejado |
| v2.0 | Multiusuário / Open Finance / nova camada de dados | 💡 Futuro |

---

## 🎯 Objetivo do projeto

Projeto desenvolvido para demonstrar e evoluir conhecimentos em inteligência artificial aplicada, integração com APIs, automação com Google Apps Script, modelagem de regras de negócio, processamento de linguagem natural, desenvolvimento Web, arquitetura de software, persistência, análise de dados e experiência conversacional.

> **Registrar e consultar uma movimentação financeira deve ser tão simples quanto descrevê-la.**

---

## 👨‍💻 Desenvolvido por **Jefferson Ferreira**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=flat&logo=linkedin)](https://www.linkedin.com/in/jefferson-ferreira-tech/)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-181717?style=flat&logo=github)](https://github.com/jeffersonferreira-ti)

---

<div align="center">
<sub>Finance AI Lite - 2026</sub>
</div>
