# Guia de Uso — Finance AI Lite

## Visão geral

O Finance AI Lite permite registrar e consultar finanças pessoais em linguagem natural.

Você não precisa memorizar comandos rígidos. A estrutura recomendada é:

```text
ação + valor + descrição + data + conta/cartão + detalhes
```

Quanto mais completa a frase, menor a chance de o sistema precisar pedir informações adicionais.

## Despesas

```text
Gastei 35 no almoço hoje no débito da Conta Principal.
```

```text
Ontem gastei 70 no cabeleireiro no cartão X.
```

## Receitas

```text
Recebi 2500 de salário hoje na Conta Principal.
```

## Receita futura

```text
Dia 15/09 vou receber 1000 de adiantamento na Conta Principal.
```

## Compras no crédito

```text
Gastei 120 na farmácia hoje no cartão X.
```

Uma compra no crédito entra na fatura e não reduz imediatamente o saldo da conta bancária.

## Compras parceladas

```text
Comprei um notebook por 3600 em 12x no cartão X.
```

Informe, quando possível:

- valor total;
- quantidade de parcelas;
- cartão;
- data.

## Pix

```text
Fiz um Pix de 50 pela Conta Principal.
```

Se a conta não for informada e houver mais de uma opção, o sistema pode pedir complemento.

## Transferências entre contas

```text
Transferi 200 da Conta Principal para a Conta Reserva.
```

Transferência entre contas próprias não é receita nem despesa.

## Pagamento de fatura

```text
Paguei 480 da fatura do cartão X pela Conta Principal hoje.
```

Se houver mais de uma competência possível:

```text
Paguei 480 da fatura do cartão X de setembro de 2026 pela Conta Principal.
```

## Recorrências

```text
Aluguel é uma despesa recorrente mensal de 550, todo dia 16, pela Conta Principal.
```

Se o lançamento atual já existir e a intenção for somente torná-lo recorrente, deixe isso claro para evitar duplicidade.

## Assinaturas

```text
Assinei o Serviço X por 99,90 por mês no cartão X, cobrança todo dia 15.
```

Consultas:

```text
Quais assinaturas estão ativas?
Quanto gasto por mês com assinaturas?
```

Na v1.2.4, assinaturas ativas são apresentadas em lista, com uma entrada por linha e o total mensal equivalente separado.

## Metas

```text
Quero guardar 5000 para uma reserva até dezembro de 2027.
```

```text
Aporte 300 na meta Reserva.
```

## Consultas financeiras

```text
Quanto gastei com mercado nos últimos 3 meses?
```

```text
Qual categoria teve mais despesas este mês?
```

```text
Compare minhas despesas deste mês com o mês passado.
```

```text
Onde posso economizar?
```

## Consulta de contas

```text
Quantas contas tenho ativas?
```

```text
Quais contas tenho ativas?
```

```text
Liste minhas contas bancárias.
```

Desde a v1.2.3, consultas explícitas de contas ativas usam uma rota determinística dedicada.

## Editar transação

```text
Altere o gasto de 45 no mercado para 54,90.
```

Quanto mais informações forem fornecidas — valor, descrição, data, conta, cartão e categoria — menor a ambiguidade.

## Excluir transação

```text
Exclua a despesa de 70 do cabeleireiro do dia 12/09/2026.
```

A exclusão deve localizar o registro e pedir confirmação antes de executar.

## Desfazer operação

Quando aplicável:

```text
Desfaça a última exclusão.
```

ou

```text
Desfaça a última edição.
```

## Cadastro manual na planilha

Após alterar manualmente dados-base como contas, saldo inicial, cartões ou transações, execute:

```text
Finance AI → Atualizar resumos financeiros
```

F5 não substitui esse recálculo.

## Fatura com lançamentos de teste

Não registre um pagamento fictício apenas para zerar uma fatura de teste.

O correto é:

1. remover os lançamentos de teste de origem;
2. revisar `PagamentosFatura` caso exista pagamento fictício;
3. executar `Atualizar resumos financeiros`;
4. conferir `Faturas`, `Saldos` e `Dashboard`.

## Boas práticas

- use uma operação por mensagem;
- informe valores claramente;
- informe a data quando não for hoje;
- informe conta ou cartão quando houver mais de uma opção;
- não registre transferências como despesas;
- não registre pagamento de fatura como nova compra;
- revise confirmações antes de editar ou excluir;
- use QA para testes e produção para dados reais.

## Regra principal

Use o Finance AI Lite como se estivesse explicando uma movimentação financeira para outra pessoa.

Quanto mais claro você for sobre o que aconteceu, quanto, quando e de onde saiu ou entrou o dinheiro, mais precisa será a interpretação.
