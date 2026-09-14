# Arquitetura — Finance AI Lite v1.2.4

## Princípio

O Finance AI Lite separa interpretação de linguagem natural de cálculo financeiro.

```text
Gemini → interpreta intenção quando necessário
Apps Script → valida e executa
Google Sheets → persiste e apresenta
```

> **IA interpreta; código decide.**

A IA não é a fonte de verdade para saldos, faturas, alertas, rankings, transferências, pagamentos ou comparações.

## Fluxo de roteamento

A linha v1.2.x passou a usar uma arquitetura mais focada por operação:

```text
Mensagem
  ↓
Roteamento determinístico quando a intenção é óbvia
  ↓
Roteador Gemini pequeno quando necessário
  ↓
Operação identificada
  ↓
Schema focado + prompt focado + contexto focado
  ↓
Validação determinística
  ↓
Motor financeiro
  ↓
Persistência / consulta
```

Essa abordagem reduz ambiguidades e evita enviar um schema monolítico para toda mensagem.

## Operações conversacionais

O backend diferencia operações como:

- movimentação;
- pagamento de fatura;
- transferência entre contas;
- recorrência;
- edição;
- exclusão;
- desfazer;
- assinaturas;
- metas;
- consultas financeiras;
- consultas de insights;
- busca avançada;
- consulta livre;
- relatórios.

Consultas óbvias podem usar fast paths determinísticos. A v1.2.3 adicionou esse comportamento para consultas de contas ativas.

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
- tratamento de erros;
- preservação de quebras de linha em respostas textuais.

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

As chamadas devem usar, sempre que possível:

- operação específica;
- contexto mínimo necessário;
- schema específico;
- saída estruturada.

Histórico de desenvolvimento mostrou que schemas excessivamente amplos aumentam o risco de truncamento de resposta.

## Regras determinísticas

### Cartões

Compras no crédito são registradas por competência de fatura.

O pagamento de fatura é armazenado separadamente da despesa original para evitar dupla contabilização.

### Transferências

Transferência entre contas próprias não é receita nem despesa.

### Auditoria

Edição e exclusão de transações são confirmadas antes da mutação e registradas em trilha própria.

Operações reversíveis podem ser desfeitas após revalidação do estado.

### Consulta de contas

Desde a v1.2.3, perguntas explícitas sobre contas ativas usam roteamento determinístico, reduzindo conflito semântico com assinaturas e outras entidades.

### Assinaturas

Assinaturas são entidades próprias.

Uma despesa categorizada como `Assinaturas` não cria automaticamente uma assinatura recorrente.

O cadastro explícito sincroniza uma recorrência mensal quando aplicável.

Na v1.2.4, a apresentação das assinaturas ativas foi refinada para uma entrada por linha, sem alterar o cálculo do custo mensal.

## Dashboard

O Dashboard v2 é calculado pelo Apps Script e suporta:

- KPIs;
- tendências;
- comparações;
- filtros;
- histórico;
- drill-down;
- insights proativos.

Dar F5 na planilha não substitui a atualização dos dados derivados. Alterações manuais relevantes devem ser seguidas por `Atualizar resumos financeiros`.

## Insights e alertas

O motor determinístico identifica evidências, prioridades e eventos.

O Gemini pode transformar resultados em linguagem natural, sem recalcular os números.

Alertas são produzidos deterministicamente para orçamento, fatura, assinatura e meta.

## Busca financeira avançada

A busca usa requisições estruturadas, filtros AND e períodos determinísticos.

Suporta:

- agrupamentos;
- rankings;
- deltas;
- comparações entre períodos;
- crescimento de categorias.

A camada conversacional interpreta a pergunta e delega o cálculo aos motores determinísticos.

## Compatibilidade pt-BR

A camada de fórmulas detecta a localidade da planilha e usa o separador compatível com `pt-BR`.

## QA e release

O fluxo recomendado é:

```text
Desenvolvimento → QA → testes → smoke → Stable → Stable CLEAN → principal → /dev → /exec
```

A v1.2.4 Stable CLEAN foi validada com **58/58 verificações** e smoke tests no deployment publicado.
