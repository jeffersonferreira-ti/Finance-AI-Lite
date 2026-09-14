# Finance AI Lite v1.2.4 — Stable CLEAN

## Status

**Stable e homologada em produção.**

A release foi validada após:

- QA específica da formatação de assinaturas: **7/7**;
- regressão estável na principal: **58/58**;
- smoke tests no `/dev`: aprovados;
- nova implantação `/exec`: publicada;
- smoke tests no `/exec`: aprovados.

## Mudanças principais

### Consulta de contas — consolidada da v1.2.3

Perguntas explícitas sobre contas ativas passaram a usar roteamento determinístico dedicado.

Exemplos:

```text
Quantas contas tenho ativas?
Quais contas tenho ativas?
Liste minhas contas bancárias.
```

Isso reduz conflito semântico com assinaturas e outras consultas livres.

### Assinaturas em formato de lista

A resposta de assinaturas ativas deixou de ser um bloco contínuo separado por ponto e vírgula.

Antes:

```text
Assinaturas ativas: Serviço A (...); Serviço B (...); Serviço C (...).
```

Agora:

```text
Assinaturas ativas (3):
• Serviço A — R$ 19,90/mensal
• Serviço B — R$ 49,90/mensal
• Serviço C — R$ 99,90/mensal

Total mensal equivalente: R$ 169,70.
```

A alteração é apenas de apresentação; cálculos e regras financeiras permanecem os mesmos.

## Regressão

A suíte Stable contém **58 verificações**:

- 39 verificações da arquitetura v1.2.2;
- 12 verificações da consulta de contas v1.2.3;
- 7 verificações da formatação de assinaturas v1.2.4.

## Arquitetura preservada

A release mantém o princípio:

> **IA interpreta; código decide.**

Regras financeiras, validações, saldos, faturas, transferências e persistência permanecem determinísticos.

## Observação sobre o repositório público

O motor financeiro completo de produção não é publicado neste repositório.

A documentação e a camada Web são mantidas em formato seguro para portfólio, sem credenciais ou dados pessoais.
