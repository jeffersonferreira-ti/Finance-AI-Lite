# Arquitetura — Finance AI Lite v1.2

## Princípio

O Finance AI Lite separa interpretação de linguagem natural de cálculo financeiro.

```text
Gemini → interpreta intenção
Apps Script → valida e executa
Google Sheets → persiste e apresenta
```

A IA não é a fonte de verdade para saldos, faturas, alertas, rankings ou comparações.

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
- loading;
- atalhos financeiros;
- busca avançada;
- histórico local;
- confirmação/cancelamento;
- cards estruturados de busca, ranking e comparação;
- tratamento de erros.

### Backend

`Code.gs` concentra o domínio financeiro e não é publicado integralmente neste repositório público.

`WebApp.gs` expõe o entry point e funções necessárias ao Web App.

O backend utiliza:

- `ScriptProperties` para configuração;
- `ScriptCache` para contexto temporário;
- `ScriptLock` para operações críticas;
- planilha resolvida por ID;
- validações determinísticas;
- gatilhos do Apps Script para automações.

## Persistência

A planilha é organizada em módulos de domínio, incluindo:

- `Transacoes`;
- `Contas`;
- `Saldos`;
- `Cartoes`;
- `Faturas`;
- `PagamentosFatura`;
- `Transferencias`;
- `Assinaturas`;
- `Recorrencias`;
- `Orcamentos`;
- `ResumoOrcamentos`;
- `Metas`;
- `AportesMetas`;
- `Analises`;
- `Padroes`;
- `Previsoes`;
- `Insights`;
- `Alertas`;
- `HistoricoAlertas`;
- `Relatorios`;
- `ConversasIA`;
- `Auditoria`.

## Gemini

O Gemini é utilizado para classificação de intenção, extração estruturada e narrativa baseada em resultados já calculados.

Exemplos:

- movimentações;
- transferências;
- recorrências;
- assinaturas;
- metas;
- consultas financeiras;
- insights;
- busca avançada;
- relatórios.

As validações e cálculos posteriores são feitos pelo motor financeiro.

## Auditoria

Edição e exclusão de transações são confirmadas antes da mutação e registradas em trilha própria.

Operações reversíveis podem ser desfeitas após revalidação do estado.

## Dashboard

O Dashboard v2 é calculado pelo Apps Script e suporta:

- KPIs;
- tendências;
- comparações;
- filtros;
- histórico;
- drill-down;
- insights proativos.

## Insights

O motor determinístico identifica evidências e prioridades.

O Gemini pode transformar os resultados em linguagem natural, sem recalcular os números.

## Alertas

Alertas são produzidos deterministicamente para orçamento, fatura, assinatura e meta.

A central mantém estado, ocorrências e histórico; automações atualizam alertas e resumo semanal.

## Busca financeira avançada

A busca usa uma requisição estruturada com filtros AND e períodos determinísticos.

A camada 5.2 adiciona:

- agrupamentos;
- rankings;
- deltas;
- comparações entre períodos;
- crescimento de categorias.

A camada conversacional interpreta a pergunta e delega o cálculo aos motores determinísticos.

## Cartões

Compras no crédito são registradas por competência de fatura.

O pagamento de fatura é armazenado separadamente da despesa original para evitar dupla contabilização.

## Recorrências e assinaturas

Assinaturas são entidades próprias.

Uma despesa categorizada como `Assinaturas` não cria automaticamente uma assinatura recorrente.

O cadastro explícito sincroniza uma recorrência mensal.

## Compatibilidade pt-BR

A camada de fórmulas detecta a localidade da planilha e usa o separador compatível com `pt-BR`.
