# Finance AI Lite

Assistente financeiro pessoal conversacional desenvolvido com **Google Apps Script**, **Google Sheets** e **Gemini API**.

O Finance AI Lite permite registrar, consultar e analisar finanças pessoais usando linguagem natural, por meio de uma interface Web responsiva para desktop e mobile.

> **Princípio do projeto:** a IA interpreta; o código financeiro decide.

## Visão geral

Em vez de preencher formulários para cada movimentação, o usuário conversa com o sistema:

```text
Gastei R$ 35 no transporte pelo Pix da minha conta principal.

Transferi R$ 200 da conta principal para a conta de reserva.

Cadastre um serviço como assinatura de R$ 21,90 por mês,
cobrada todo dia 10 no cartão principal.

Como estão minhas finanças este mês?

Qual é a previsão para os próximos três meses?
```

O Gemini interpreta a intenção e transforma a mensagem em uma operação estruturada. Os cálculos financeiros, validações, saldos, faturas, recorrências e projeções são executados por regras determinísticas no Google Apps Script.

## Funcionalidades

- Receitas e despesas
- Categorização automática
- Contas e saldos
- Transferências entre contas
- Cartões de crédito
- Compras parceladas
- Faturas e pagamentos
- Assinaturas
- Recorrências mensais
- Orçamentos por categoria
- Metas financeiras e aportes
- Dashboard financeiro
- Análise de padrões e anomalias
- Forecast de 3 meses
- Relatórios financeiros
- Consultas em linguagem natural
- Contexto conversacional
- Confirmação de operações sensíveis
- Histórico local da conversa
- Interface responsiva para PC e mobile
- Integração complementar com NotebookLM

## Arquitetura

```text
Usuário
   │
   ▼
Web App
HTML / CSS / JavaScript
   │
   ▼
Google Apps Script
   ├── motor financeiro determinístico
   ├── validações
   ├── regras de negócio
   ├── contexto conversacional
   └── integração com Gemini API
   │
   ▼
Google Sheets
   ├── transações
   ├── contas e saldos
   ├── cartões e faturas
   ├── assinaturas e recorrências
   ├── orçamentos
   ├── metas
   ├── análises
   └── previsões
```

Mais detalhes em [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).

## Stack

| Camada | Tecnologia |
|---|---|
| Backend | Google Apps Script |
| Banco / ledger | Google Sheets |
| IA / NLP | Gemini API |
| Frontend | HTML, CSS e JavaScript |
| Deploy | Apps Script Web App |
| Análise complementar | NotebookLM |

## Interface Web publicada neste repositório

A pasta [`src/`](src/) contém a camada Web do projeto:

- `WebApp.gs`
- `Index.html`
- `Styles.html`
- `Scripts.html`

O **motor financeiro de produção** não é publicado integralmente neste repositório público porque contém regras e configurações específicas do ambiente pessoal de uso. A arquitetura, os módulos e as decisões de domínio estão documentados em `docs/`.

Isso mantém o repositório adequado para portfólio sem expor dados, configurações ou regras particulares do ambiente de produção.

## Regras financeiras importantes

O Finance AI Lite diferencia eventos financeiros que muitas aplicações simplificam incorretamente.

Uma compra no cartão de crédito não reduz imediatamente o saldo bancário. Ela compõe a fatura, e o caixa é afetado no pagamento da fatura.

Uma transferência entre contas próprias também não representa receita nem despesa.

Compras parceladas são distribuídas por competência e vencimento, com tratamento de centavos para preservar o valor total.

## Segurança

As credenciais ficam em **Apps Script → Project Settings → Script Properties** e não no código-fonte:

```text
GEMINI_API_KEY
FINANCE_AI_SPREADSHEET_ID
```

Nunca publique valores reais dessas propriedades, IDs privados de planilha ou dados financeiros pessoais.

Consulte [`SECURITY.md`](SECURITY.md).

## Estrutura do repositório

```text
Finance-AI-Lite/
├── src/
│   ├── WebApp.gs
│   ├── Index.html
│   ├── Styles.html
│   └── Scripts.html
├── docs/
│   ├── ARCHITECTURE.md
│   └── FEATURES.md
├── .gitignore
├── SECURITY.md
└── README.md
```

## Versão atual

**v1.1.1**

A v1.1 introduziu o Web App e a experiência conversacional para desktop e mobile.  
A v1.1.1 corrige a geração de fórmulas para planilhas com localidade `pt-BR`.

## Status

Projeto funcional e homologado para uso pessoal.

Os principais fluxos foram validados em desktop e iPhone, incluindo registro financeiro, contexto conversacional, assinaturas, confirmação de ações, histórico da interface e consultas financeiras.

## Roadmap

Possíveis evoluções:

- autenticação multiusuário;
- integração com Open Finance;
- entrada por áudio e imagem;
- WhatsApp Business Cloud API;
- notificações e alertas;
- dashboards avançados;
- migração da camada de dados para banco dedicado, caso o projeto ultrapasse o escopo pessoal.

## Motivação

O projeto explora uma experiência de controle financeiro com baixa fricção: registrar uma movimentação deve ser tão simples quanto descrevê-la em linguagem natural, sem abrir mão de regras financeiras determinísticas e rastreáveis.

---

Desenvolvido como projeto de estudo e evolução prática em **IA aplicada, automação, engenharia de software e finanças pessoais**.
