# Funcionalidades — Finance AI Lite v1.2.4

## Movimentações e auditoria

- receita e despesa;
- Pix e outros meios de pagamento;
- conta de origem;
- categoria;
- observação e texto original;
- edição com confirmação;
- exclusão com confirmação;
- desfazer última operação reversível;
- trilha de auditoria.

## Contas

O saldo calculado considera:

```text
Saldo inicial
+ Receitas
- Despesas imediatas
- Pagamentos de fatura
+ Transferências recebidas
- Transferências enviadas
```

Compras no crédito não reduzem o caixa imediatamente.

Desde a v1.2.3, consultas explícitas sobre contas ativas possuem roteamento determinístico para reduzir ambiguidade com assinaturas e outras entidades.

Exemplos:

```text
Quantas contas tenho ativas?
Quais contas tenho ativas?
Liste minhas contas bancárias.
```

## Cartões e faturas

- cadastro de cartão;
- fechamento e vencimento;
- compras à vista no crédito;
- parcelamento;
- competência de fatura;
- pagamento parcial/integral;
- saldo de fatura;
- próximos vencimentos;
- contratos específicos para pagamento de fatura.

## Transferências

- transferência entre contas próprias;
- conta de origem e destino;
- neutralidade no resultado financeiro agregado;
- contrato específico separado de movimentações comuns.

## Assinaturas e recorrências

- criação por linguagem natural;
- próxima cobrança;
- custo mensal/anual;
- pausa, cancelamento e reativação;
- recorrência mensal vinculada;
- processamento automático;
- confirmação antes de mutações;
- listagem de assinaturas ativas uma por linha;
- total mensal equivalente exibido separadamente.

## Orçamentos

- limite mensal por categoria;
- gasto realizado;
- restante;
- percentual de uso;
- alerta em 90%;
- limite excedido;
- detecção de ritmo acelerado.

## Metas

- valor alvo;
- valor inicial;
- data alvo;
- prioridade;
- aportes;
- progresso;
- valor restante;
- aporte mensal necessário;
- alertas de prazo/progresso.

## Dashboard v2

- receitas, despesas e resultado;
- taxa de poupança;
- saldo total;
- próxima fatura;
- comparação mensal;
- histórico de seis meses;
- filtros por conta/cartão/categoria;
- drill-down de transações;
- insights proativos.

## Inteligência

- resumo mensal;
- gasto por categoria;
- diagnóstico;
- saúde financeira;
- comparação mensal;
- anomalias;
- tendências;
- ritmo de orçamento;
- forecast;
- insights determinísticos;
- respostas conversacionais baseadas em evidência;
- roteamento por operação;
- schemas e contexto focados para reduzir truncamentos e ambiguidade.

## Alertas e automações

- orçamento;
- fatura;
- assinatura;
- meta;
- central de alertas;
- histórico de eventos;
- reabertura/resolução;
- resumo semanal;
- gatilhos recorrentes.

## Busca financeira avançada

- períodos relativos e intervalo customizado;
- data financeira, data da compra e data de registro;
- descrição/texto livre;
- categoria, conta e cartão;
- tipo e meio de pagamento;
- valor exato/mínimo/máximo;
- parcelamentos;
- ordenação e limite;
- rankings por grupo;
- maiores lançamentos;
- comparação entre períodos;
- crescimento de categorias;
- consulta em linguagem natural.

## Interface Web

- desktop e mobile;
- atalhos financeiros;
- painel de busca avançada;
- contexto de conversa;
- histórico local;
- confirmação/cancelamento;
- retry em falhas;
- respostas narrativas;
- resultados estruturados;
- filtros/períodos visíveis;
- estados vazios;
- preservação de listas e quebras de linha em respostas textuais.

## Homologação atual

A v1.2.4 Stable CLEAN foi validada com:

- **58/58 verificações estáveis**;
- smoke tests na principal;
- smoke tests no `/dev`;
- smoke tests no `/exec` publicado.
