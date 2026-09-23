# Funcionalidades — Finance AI Lite v1.2.5

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
- contratos específicos para pagamento de fatura;
- consulta dedicada por cartão e competência;
- faturas abertas e próxima fatura;
- estados Em aberto, Paga e Vencida;
- listagem dos itens da fatura;
- data original da compra preservada na exibição;
- identificação de parcela atual/total.

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

- redesign responsivo;
- temas claro e escuro;
- receitas, despesas, resultado e taxa de poupança;
- saldo total e próxima fatura;
- Receitas x Despesas;
- despesas por categoria;
- contas, cartões, assinaturas e vencimentos;
- comparação mensal;
- histórico de resultados;
- metas;
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
- renderer dedicado para faturas;
- status de fatura com destaque visual;
- filtros/períodos visíveis;
- estados vazios;
- temas claro/escuro;
- preservação de listas, quebras de linha e copy/paste em respostas textuais.

## Homologação atual

A v1.2.5 Stable CLEAN foi validada com:

- **133/133 verificações estáveis**;
- QA funcional;
- validação na planilha principal;
- smoke tests no `/dev`;
- smoke tests no `/exec` publicado.
