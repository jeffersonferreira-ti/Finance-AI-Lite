<div align="center">

<img src="https://img.shields.io/badge/Google%20Apps%20Script-Backend-4285F4?style=for-the-badge&logo=google&logoColor=white"/>
<img src="https://img.shields.io/badge/Google%20Sheets-Data%20Layer-34A853?style=for-the-badge&logo=googlesheets&logoColor=white"/>
<img src="https://img.shields.io/badge/Gemini-IA%20%2F%20NLP-8E75B2?style=for-the-badge&logo=googlegemini&logoColor=white"/>
<img src="https://img.shields.io/badge/Status-Est%C3%A1vel-00C853?style=for-the-badge"/>
<img src="https://img.shields.io/badge/Version-1.2-6A1B9A?style=for-the-badge"/>

<br/><br/>

# Finance AI Lite

**Assistente financeiro pessoal conversacional com inteligência artificial**

*Talk. Track. Understand.*

</div>

---

## 🧠 O Problema

No controle financeiro pessoal, tarefas simples ainda costumam exigir muita interação manual:

| Problema | Impacto |
|---|---|
| Registrar cada gasto manualmente | Fricção e abandono do controle financeiro |
| Categorizar movimentações uma a uma | Processo repetitivo |
| Controlar cartões e faturas separadamente | Risco de inconsistência |
| Acompanhar assinaturas e recorrências | Gastos recorrentes passam despercebidos |
| Interpretar planilhas financeiras | Informação existe, mas nem sempre gera entendimento |
| Encontrar tendências e desvios | Decisões são tomadas sem contexto suficiente |

Planilhas resolvem o armazenamento, mas nem sempre resolvem a experiência de uso.

---

## 🚀 A Solução

O **Finance AI Lite** transforma o controle financeiro em uma experiência conversacional.

Em vez de preencher formulários, o usuário descreve o que aconteceu em linguagem natural:

```text
Gastei R$ 35 no transporte pelo Pix da minha conta principal.
```

Ou consulta os dados diretamente:

```text
Compare minhas despesas deste mês com o mês passado.
```

O **Gemini** interpreta a intenção; o **Google Apps Script** valida e executa regras financeiras determinísticas; o **Google Sheets** funciona como ledger, camada de persistência e base analítica.

> **Princípio do projeto:** a IA interpreta; o código financeiro decide.

---

## ⚙️ Como Funciona

```text
Usuário
   |
   v
Web App responsivo
   |
   v
Gemini API -> interpretação de linguagem natural
   |
   v
Google Apps Script -> validação + regras determinísticas
   |
   v
Google Sheets -> persistência + dashboard + análises
   |
   v
Resposta conversacional + resultados estruturados
```

Os cálculos críticos não são delegados à IA: saldos, faturas, parcelas, transferências, orçamentos, alertas, recorrências, metas, rankings e comparações são processados pelo motor determinístico.

---

## ✨ Destaques da v1.2

A versão **1.2** consolida cinco frentes principais:

- **auditoria e correção de dados:** edição, exclusão e desfazer operações com rastreabilidade;
- **Dashboard v2:** filtros, tendências, comparativos, drill-down e indicadores;
- **Insights:** motor determinístico, respostas conversacionais e insights proativos;
- **Alertas e automações:** orçamento, faturas, assinaturas, metas, central de alertas e resumo semanal;
- **Busca financeira avançada:** filtros por período/conta/cartão/categoria/valor, rankings, comparações e consultas em linguagem natural.

A camada Web também ganhou apresentação estruturada para buscas, rankings e comparações, mantendo a resposta narrativa.

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
- transferências entre contas próprias;
- compras no crédito;
- compras parceladas;
- fechamento e vencimento;
- pagamentos parciais ou integrais de fatura;
- prevenção de dupla contabilização.

### 🔁 Assinaturas e recorrências

- criação por linguagem natural;
- próxima cobrança;
- custo mensal/anual;
- pausa, cancelamento e reativação;
- sincronização com recorrências;
- processamento automático.

### 🎯 Metas e orçamentos

- metas com valor alvo, data e prioridade;
- aportes e progresso;
- limite mensal por categoria;
- uso do orçamento;
- status de atenção e excesso.

### 📊 Dashboard v2

- receitas, despesas e resultado;
- taxa de poupança;
- saldo total;
- próxima fatura;
- comparação com mês anterior;
- histórico de seis meses;
- filtros por conta, cartão e categoria;
- drill-down de transações;
- insights prioritários.

### 🧠 Insights e alertas

- padrões e anomalias;
- ritmo de gastos;
- concentração por categoria;
- alertas de orçamento;
- faturas próximas/atrasadas;
- cobranças de assinaturas;
- metas em risco;
- central com ciclo de vida e histórico;
- resumo semanal automatizado.

### 🔎 Busca financeira avançada

Consultas determinísticas com:

- períodos relativos e intervalos;
- descrição e texto livre;
- categoria;
- conta;
- cartão;
- tipo;
- meio de pagamento;
- valor exato, mínimo e máximo;
- parcelamentos;
- ordenação;
- rankings agrupados;
- maiores lançamentos;
- comparação entre períodos;
- categorias que mais cresceram.

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
- estados vazios;
- interface responsiva para desktop e mobile.

---

## 🧾 Regras Financeiras

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

Na v1.2, a interface inclui:

- chat responsivo;
- atalhos financeiros;
- busca avançada;
- cards de busca/ranking/comparação;
- filtros e períodos exibidos como metadados;
- persistência local da conversa;
- confirmação e cancelamento;
- tratamento de falhas;
- suporte a desktop e mobile.

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
|   `-- RELEASE_v1.2.md
|
|-- SECURITY.md
|-- .gitignore
`-- README.md
```

Arquitetura lógica:

```text
                   +-------------------+
                   |      Usuário      |
                   +---------+---------+
                             |
                             v
                   +-------------------+
                   |      Web App      |
                   | HTML / CSS / JS   |
                   +---------+---------+
                             |
                             v
              +-----------------------------+
              |     Google Apps Script      |
              |-----------------------------|
              | Motor financeiro            |
              | Busca / rankings            |
              | Insights / alertas          |
              | Automações                  |
              +------+---------------+------+
                     |               |
                     v               v
             +-------------+   +-------------+
             | Gemini API  |   |Google Sheets|
             | NLP / Intent|   |Data / Ledger|
             +-------------+   +-------------+
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

A v1.2 passou por desenvolvimento incremental em ambiente de QA, com testes automatizados, regressões entre fases e smoke tests no Web App.

A homologação cobriu:

- auditoria e correção de transações;
- Dashboard v2;
- insights;
- alertas e automações;
- busca financeira avançada;
- rankings e comparações;
- consultas conversacionais;
- regressão das funcionalidades anteriores;
- interface Web em fluxos desktop/mobile.

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
| v1.3 | Captura multimodal / novas integrações | 🧭 Planejado |
| v2.0 | Multiusuário / Open Finance / nova camada de dados | 💡 Futuro |

---

## Objetivo do Projeto

Projeto desenvolvido para demonstrar e evoluir conhecimentos em:

- inteligência artificial aplicada;
- integração com APIs de IA;
- automação com Google Apps Script;
- modelagem de regras de negócio;
- processamento de linguagem natural;
- desenvolvimento Web;
- arquitetura de software;
- persistência e análise de dados;
- observabilidade de estados e automações;
- experiência conversacional;
- engenharia aplicada a finanças pessoais.

> **Registrar e consultar uma movimentação financeira deve ser tão simples quanto descrevê-la.**

---

## 👨‍💻 Desenvolvido por **Jefferson Ferreira**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=flat&logo=linkedin)](https://www.linkedin.com/in/jefferson-ferreira-tech/)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-181717?style=flat&logo=github)](https://github.com/jeffersonferreira-ti)

---

<div align="center">
<sub>Finance AI Lite - 2026</sub>
</div>
