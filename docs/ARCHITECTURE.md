# Arquitetura

## Princípio

O Finance AI Lite separa interpretação de linguagem natural de cálculo financeiro.

```text
Gemini → interpreta intenção
Apps Script → valida e executa
Google Sheets → persiste e apresenta
```

A IA não é a fonte de verdade para saldos, faturas ou projeções.

## Componentes

### Web App

A interface é servida pelo Apps Script e utiliza:

- `Index.html`
- `Styles.html`
- `Scripts.html`

O frontend envia mensagens ao backend por `google.script.run`.

A interface implementa:

- `sessionId` por aba;
- `requestId` para deduplicação;
- estado de loading;
- atalhos de consulta;
- histórico local;
- confirmação e cancelamento;
- tratamento de erros.

### Backend

`Code.gs` concentra a maior parte do domínio financeiro.

`WebApp.gs` concentra a camada de exposição Web.

O backend utiliza:

- `ScriptProperties` para configuração;
- `ScriptCache` para contexto temporário;
- `ScriptLock` para serialização de operações críticas;
- resolução centralizada da planilha por ID.

## Persistência

A planilha é organizada em módulos, incluindo:

- `Transacoes`
- `Contas`
- `Saldos`
- `Cartoes`
- `Faturas`
- `PagamentosFatura`
- `Transferencias`
- `Assinaturas`
- `Recorrencias`
- `Orcamentos`
- `ResumoOrcamentos`
- `Metas`
- `AportesMetas`
- `Analises`
- `Padroes`
- `Previsoes`
- `Relatorios`
- `ConversasIA`

## Gemini

O Gemini é utilizado para classificação de intenção e extração estruturada.

Exemplos de operações interpretadas:

- movimentação;
- transferência;
- recorrência;
- criação/consulta/alteração de assinatura;
- criação/aporte/consulta de meta;
- consultas financeiras;
- relatórios.

As validações posteriores são feitas pelo motor financeiro.

## Cartões

Compras no crédito são registradas por competência de fatura.

O pagamento de fatura é armazenado separadamente da despesa original para evitar dupla contabilização.

## Recorrências e assinaturas

Assinaturas são entidades próprias.

Uma despesa categorizada como `Assinaturas` não cria automaticamente uma assinatura recorrente.

O cadastro explícito de uma assinatura sincroniza uma recorrência mensal.

## Previsões

O forecast utiliza dados conhecidos e comportamento histórico para estimar três meses.

A projeção diferencia compromissos conhecidos de componente variável estimado.

## Compatibilidade pt-BR

A v1.1.1 detecta a localidade da planilha e gera fórmulas compatíveis com o separador utilizado pelo Google Sheets em `pt-BR`.
