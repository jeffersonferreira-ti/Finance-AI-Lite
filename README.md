<div align="center">

<img src="https://img.shields.io/badge/Google%20Apps%20Script-Backend-4285F4?style=for-the-badge&logo=google&logoColor=white"/>
<img src="https://img.shields.io/badge/Google%20Sheets-Data%20Layer-34A853?style=for-the-badge&logo=googlesheets&logoColor=white"/>
<img src="https://img.shields.io/badge/Gemini-IA%20%2F%20NLP-8E75B2?style=for-the-badge&logo=googlegemini&logoColor=white"/>
<img src="https://img.shields.io/badge/Status-Funcional-00C853?style=for-the-badge"/>
<img src="https://img.shields.io/badge/Version-1.1.1-6A1B9A?style=for-the-badge"/>

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
| Projetar os próximos meses | Decisões são tomadas sem visão futura |

Planilhas resolvem o armazenamento, mas nem sempre resolvem a experiência de uso.

---

## 🚀 A Solução

O **Finance AI Lite** transforma o controle financeiro em uma experiência conversacional.

Em vez de preencher formulários, o usuário descreve o que aconteceu em linguagem natural:

```text
Gastei R$ 35 no transporte pelo Pix da minha conta principal.
```

Ou simplesmente pergunta:

```text
Como estão minhas finanças este mês?
```

O sistema interpreta a intenção com o **Gemini**, valida a operação no **Google Apps Script**, aplica regras financeiras determinísticas e registra ou consulta os dados no **Google Sheets**.

> **Princípio do projeto:** a IA interpreta; o código financeiro decide.

---

## ⚙️ Como Funciona

```text
Usuario
   |
   v
Web App responsivo
   |
   v
Gemini API -> Interpretacao de linguagem natural
   |
   v
Google Apps Script -> Validacao + Regras financeiras
   |
   v
Google Sheets -> Persistencia + Dashboard + Analises
   |
   v
Resposta conversacional
```

O Gemini identifica a intenção e extrai os dados necessários.

Os cálculos financeiros importantes não ficam sob responsabilidade da IA: saldos, faturas, parcelas, vencimentos, recorrências, metas e projeções são tratados pelo motor determinístico.

---

## 🔍 Funcionalidades

### 💰 Movimentações

- Receitas e despesas
- Registro por linguagem natural
- Pix e meios de pagamento
- Categorização automática
- Regras personalizadas de categoria
- Observação e texto original da operação

### 🏦 Contas e Saldos

- Cadastro de contas
- Saldo inicial
- Receitas e despesas imediatas
- Transferências entre contas
- Pagamentos de fatura
- Saldo calculado por conta

### 💳 Cartões e Faturas

- Cadastro de cartões
- Limite
- Dia de fechamento
- Dia de vencimento
- Compras no crédito
- Compras parceladas
- Competência de fatura
- Pagamento parcial ou integral
- Saldo da fatura
- Próximos vencimentos

### 🔁 Assinaturas e Recorrências

- Criação de assinatura por linguagem natural
- Listagem de assinaturas ativas
- Próxima cobrança
- Custo mensal e anual
- Identificação da assinatura mais cara
- Pausa
- Cancelamento
- Reativação
- Recorrências mensais vinculadas

### 🎯 Metas Financeiras

- Valor alvo
- Valor inicial
- Data alvo
- Prioridade
- Aportes
- Progresso acumulado
- Valor restante
- Aporte mensal necessário

### 📊 Orçamentos

- Limite mensal por categoria
- Gasto realizado
- Valor restante
- Percentual de uso
- Status por faixa
- Identificação de categorias acima do limite

### 🧠 Inteligência Financeira

- Resumo mensal
- Gastos por categoria
- Diagnóstico financeiro
- Saúde financeira
- Comparação entre meses
- Detecção de anomalias
- Tendências
- Ritmo de orçamento
- Forecast de 3 meses
- Relatórios financeiros

### 💬 Experiência Conversacional

- Contexto entre mensagens
- Perguntas de complemento
- Confirmação antes de ações sensíveis
- Botões **Confirmar** e **Cancelar**
- Histórico local da conversa
- Atalhos financeiros
- Tratamento de erros
- Interface responsiva para desktop e mobile

---

## 💬 Exemplos de Uso

### Registrar uma despesa

```text
Gastei R$ 42,90 no mercado pelo Pix da minha conta principal
```

### Registrar uma transferência

```text
Transferi R$ 150 da conta principal para a conta de reserva
```

### Criar uma assinatura

```text
Cadastre um servico de streaming como assinatura de R$ 21,90 por mes,
cobrada todo dia 10 no cartao principal
```

### Consultar o mês

```text
Como estão minhas finanças este mês?
```

### Consultar assinaturas

```text
Liste minhas assinaturas ativas
```

### Consultar forecast

```text
Me dê o forecast dos próximos 3 meses
```

### Cancelar uma assinatura

```text
Cancele minha assinatura de streaming
```

O sistema solicita confirmação antes de executar a alteração.

---

## 📈 Dashboard e Análises

O Finance AI Lite mantém uma visão consolidada das principais informações financeiras.

O dashboard inclui indicadores como:

- receitas do mês
- despesas do mês
- saldo
- despesas por categoria
- situação dos orçamentos
- metas financeiras
- forecast
- faturas previstas
- saldo após compromissos conhecidos

Além do dashboard, o usuário pode consultar os mesmos dados de forma conversacional.

Exemplo:

```text
Resumo do mes:
Receitas: R$ 3.500,00
Despesas: R$ 2.180,00
Resultado conhecido: R$ 1.320,00
```

---

## 🧾 Regras Financeiras

O projeto diferencia eventos que não devem ser contabilizados da mesma maneira.

### Compra no cartão de crédito

Uma compra no crédito **não reduz imediatamente o saldo bancário**.

```text
Compra no credito -> Fatura -> Pagamento da fatura -> Impacto no caixa
```

### Transferência entre contas próprias

Uma transferência não representa receita nem despesa.

```text
Conta A - R$ 200
Conta B + R$ 200
Resultado financeiro = R$ 0
```

### Pagamento de fatura

O pagamento da fatura reduz o caixa, mas não cria uma nova despesa, evitando dupla contabilização.

### Parcelamento

Compras parceladas são distribuídas pelas competências correspondentes e o sistema preserva o valor total mesmo quando há divisão de centavos.

---

## 🖥️ Web App

A versão `v1.1` introduziu uma interface Web própria para o Finance AI Lite.

A aplicação foi homologada em:

- Desktop
- iPhone / mobile

A interface oferece:

- chat responsivo
- atalhos para consultas frequentes
- loading durante processamento
- histórico da sessão
- persistência local do histórico
- contexto conversacional
- confirmações por botão
- nova tentativa em falhas de comunicação

A pasta [`src/`](src/) contém a camada Web publicada neste repositório:

```text
src/
|-- WebApp.gs
|-- Index.html
|-- Styles.html
`-- Scripts.html
```

O motor financeiro de produção não é publicado integralmente neste repositório público porque contém regras e configurações específicas do ambiente pessoal de uso.

A arquitetura e as decisões de domínio estão documentadas em [`docs/`](docs/).

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
|   `-- FEATURES.md
|
|-- SECURITY.md
|-- .gitignore
`-- README.md
```

Arquitetura lógica:

```text
                   +-------------------+
                   |      Usuario      |
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
              | Validacoes                  |
              | Contexto conversacional     |
              | Regras de negocio           |
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

## Como Executar

### Pré-requisitos

- Conta Google
- Google Sheets
- Projeto Google Apps Script
- Chave da Gemini API

As configurações sensíveis devem ser adicionadas em:

```text
Apps Script
-> Project Settings
-> Script Properties
```

Propriedades utilizadas:

```text
GEMINI_API_KEY
FINANCE_AI_SPREADSHEET_ID
```

O Web App é publicado através de uma implantação do tipo **App da Web** no Google Apps Script.

> Este repositório público possui foco em portfólio e documentação. O motor financeiro completo de produção e os dados pessoais utilizados na instância real não são distribuídos publicamente.

---

## 🔐 Segurança

O projeto foi estruturado para não armazenar credenciais diretamente no código-fonte.

Não devem ser versionados:

- chaves da Gemini API
- IDs privados de planilhas
- tokens
- exports financeiros reais
- dados de contas
- faturas reais
- histórico financeiro pessoal

Arquivos locais e exports sensíveis são cobertos pelo `.gitignore`.

Consulte [`SECURITY.md`](SECURITY.md).

---

## 🧪 Homologação

Antes da consolidação da versão `v1.1`, o projeto passou por testes funcionais e regressivos cobrindo:

- núcleo financeiro
- cartões e faturas
- assinaturas e recorrências
- metas
- inteligência e forecast
- Gemini / NLP
- backend do Web App
- interface Web
- contexto conversacional
- confirmação de ações

Os fluxos principais também foram testados manualmente em desktop e iPhone.

---

## ⚠️ Limitações

- Projeto atualmente orientado a uso pessoal
- Não possui autenticação multiusuário
- Não possui integração direta com Open Finance
- Não importa automaticamente movimentações bancárias
- Não possui integração com WhatsApp na versão atual
- Google Sheets permanece como camada principal de persistência
- O motor financeiro completo de produção não está publicado no repositório público

---

## 🗺️ Roadmap

| Versão | Foco | Status |
|---|---|---|
| v1.0 | Motor financeiro, Sheets, Gemini e módulos de inteligência | ✅ Concluído |
| v1.1 | Web App responsivo + experiência conversacional | ✅ Concluído |
| v1.1.1 | Compatibilidade de fórmulas com localidade `pt-BR` | ✅ Concluído |
| v1.2 | Melhorias de UX, alertas e automações | 💡 Futuro |
| v2.0 | Multiusuário / Open Finance / nova camada de dados | 💡 Futuro |

---

## Objetivo do Projeto

Projeto desenvolvido para demonstrar e evoluir conhecimentos em:

- inteligência artificial aplicada
- integração com APIs de IA
- automação com Google Apps Script
- modelagem de regras de negócio
- processamento de linguagem natural
- desenvolvimento Web
- arquitetura de software
- persistência e análise de dados
- experiência conversacional
- engenharia aplicada a finanças pessoais

O Finance AI Lite também explora um conceito central de produto:

> **Registrar uma movimentação financeira deve ser tão simples quanto descrevê-la.**

---

## 👨‍💻 Desenvolvido por **Jefferson Ferreira**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=flat&logo=linkedin)](https://www.linkedin.com/in/jefferson-ferreira-ti/)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-181717?style=flat&logo=github)](https://github.com/jeffersonferreira-ti)

---

<div align="center">
<sub>Finance AI Lite - 2026</sub>
</div>
