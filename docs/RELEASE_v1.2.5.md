# Release — Finance AI Lite v1.2.5

## Status

**Stable — Production / Homologada**

A v1.2.5 foi promovida após homologação funcional e regressão consolidada.

## Principais entregas

### Dashboard Web

- redesign completo da interface;
- layout responsivo para desktop e mobile;
- temas claro e escuro;
- KPIs e tipografia refinados;
- gráficos de Receitas x Despesas e distribuição por categoria;
- blocos de contas, cartões, assinaturas e vencimentos;
- histórico de resultados, metas e insights.

### ConsultaFaturas

Foi introduzida uma operação dedicada para consultas de cartão e fatura.

Suporta:

- fatura por cartão;
- competência específica;
- faturas abertas;
- total em aberto;
- próxima fatura;
- status da fatura;
- itens da fatura.

A seleção e os cálculos permanecem determinísticos.

### Itens e parcelamentos

- itens filtrados por cartão e competência;
- data original da compra preservada;
- parcela atual/total exibida;
- compras pós-fechamento direcionadas à competência seguinte;
- total dos itens confrontado com o total da fatura.

### Estados de fatura

A camada conversacional utiliza:

- **Em aberto**;
- **Paga**;
- **Vencida**.

O motor interno continua responsável pelos cálculos de previsto, pago e saldo.

### Categorização

A política de categoria foi unificada entre o fluxo principal e o fast path de movimentações.

Serviços conhecidos cadastrados como assinatura ativa podem fornecer a categoria determinística antes das regras genéricas, evitando conflitos semânticos.

### Experiência conversacional

- renderer estruturado para faturas;
- cada lançamento em bloco próprio;
- resumo separado com total, vencimento, status, saldo e quantidade de lançamentos;
- cards para faturas abertas e próxima fatura;
- copy/paste com separadores preservados.

## Homologação

A suíte estável consolidada terminou com:

```text
133/133 testes aprovados
```

Cobertura consolidada:

- core: 58;
- dashboard: 12;
- roteamento de faturas: 14;
- leitura de faturas: 12;
- itens de fatura: 16;
- categorização de serviços: 9;
- acabamento de faturas: 12.

Também foram executados smoke tests na QA, na planilha principal, no `/dev` e no `/exec`.

## Observação sobre dependência externa

Durante a validação foi observado um HTTP 503 isolado da Gemini API. A repetição imediata da mesma consulta funcionou normalmente. O evento foi tratado como indisponibilidade transitória da dependência externa, sem impacto na consistência do ledger ou dos cálculos financeiros.

## Segurança e publicação

O motor financeiro completo de produção, credenciais, IDs privados de planilha e dados financeiros reais não são publicados neste repositório.

> **Princípio mantido: IA interpreta; código decide.**
