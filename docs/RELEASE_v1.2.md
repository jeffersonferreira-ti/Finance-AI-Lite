# Finance AI Lite v1.2 — Release Notes

## Status

**Stable**

A versão 1.2 foi homologada em ambiente de QA antes da promoção.

## Principais entregas

### Auditoria e correção de dados

- localização determinística de transações;
- edição com confirmação;
- exclusão com confirmação;
- desfazer operações reversíveis;
- trilha de auditoria.

### Dashboard v2

- KPIs e hierarquia visual;
- tendências mensais;
- filtros por conta, cartão e categoria;
- drill-down;
- histórico de seis meses;
- insights proativos.

### Insights

- motor determinístico;
- consultas conversacionais;
- prioridades e evidências;
- recomendações baseadas em dados;
- cards proativos.

### Alertas e automações

- orçamento;
- faturas;
- assinaturas;
- metas;
- central e histórico de alertas;
- resumo semanal;
- gatilhos automatizados.

### Busca financeira avançada

- filtros e períodos;
- rankings e agrupamentos;
- maiores lançamentos;
- comparação entre períodos;
- categorias que mais cresceram;
- consultas em linguagem natural.

### Web App

- painel de busca avançada;
- resultados estruturados;
- chips de filtros/períodos;
- KPIs;
- rankings visuais;
- comparações;
- estados vazios;
- histórico local dos resultados.

## QA

A release passou por testes incrementais, regressões das fases anteriores e smoke tests do Web App antes da promoção.

## Segurança do repositório público

O repositório não publica:

- credenciais;
- IDs privados;
- dados financeiros;
- exports da planilha;
- o motor financeiro completo da instância pessoal.

A pasta `src/` contém somente a camada Web apropriada para portfólio.
