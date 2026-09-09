function configurarPlanilha() {
  const ss = getFinanceSpreadsheet_();
  ss.setSpreadsheetTimeZone(FINANCE_AI.TIMEZONE);

  const tx = getOrCreateSheet_(ss, FINANCE_AI.SHEETS.TRANSACTIONS);
  const accounts = getOrCreateSheet_(ss, FINANCE_AI.SHEETS.ACCOUNTS);
  const cards = getOrCreateSheet_(ss, FINANCE_AI.SHEETS.CARDS);
  const categories = getOrCreateSheet_(ss, FINANCE_AI.SHEETS.CATEGORIES);
  const balances = getOrCreateSheet_(ss, FINANCE_AI.SHEETS.BALANCES);
  const invoices = getOrCreateSheet_(ss, FINANCE_AI.SHEETS.INVOICES);
  const cardPayments = getOrCreateSheet_(ss, FINANCE_AI.SHEETS.CARD_PAYMENTS);
  const transfers = getOrCreateSheet_(ss, FINANCE_AI.SHEETS.TRANSFERS);
  const budgets = getOrCreateSheet_(ss, FINANCE_AI.SHEETS.BUDGETS);
  const budgetSummary = getOrCreateSheet_(ss, FINANCE_AI.SHEETS.BUDGET_SUMMARY);
  const recurrences = getOrCreateSheet_(ss, FINANCE_AI.SHEETS.RECURRENCES);
  const categoryRules = getOrCreateSheet_(ss, FINANCE_AI.SHEETS.CATEGORY_RULES);
  const subscriptions = getOrCreateSheet_(ss, FINANCE_AI.SHEETS.SUBSCRIPTIONS);
  const subscriptionSummary = getOrCreateSheet_(ss, FINANCE_AI.SHEETS.SUBSCRIPTION_SUMMARY);
  const goals = getOrCreateSheet_(ss, FINANCE_AI.SHEETS.GOALS);
  const goalContributions = getOrCreateSheet_(ss, FINANCE_AI.SHEETS.GOAL_CONTRIBUTIONS);
  const goalSummary = getOrCreateSheet_(ss, FINANCE_AI.SHEETS.GOAL_SUMMARY);
  const analytics = getOrCreateSheet_(ss, FINANCE_AI.SHEETS.ANALYTICS);
  const patterns = getOrCreateSheet_(ss, FINANCE_AI.SHEETS.PATTERNS);
  const forecasts = getOrCreateSheet_(ss, FINANCE_AI.SHEETS.FORECASTS);
  const reports = getOrCreateSheet_(ss, FINANCE_AI.SHEETS.REPORTS);
  const conversations = getOrCreateSheet_(ss, FINANCE_AI.SHEETS.AI_CONVERSATIONS);
  const dashboard = getOrCreateSheet_(ss, FINANCE_AI.SHEETS.DASHBOARD);

  configurarTransacoes_(tx);
  configurarContas_(accounts);
  configurarCartoes_(cards);
  configurarCategorias_(categories);
  configurarSaldos_(balances);
  configurarFaturas_(invoices);
  configurarPagamentosFatura_(cardPayments);
  configurarTransferencias_(transfers);
  configurarOrcamentos_(budgets);
  configurarResumoOrcamentos_(budgetSummary);
  configurarRecorrencias_(recurrences);
  configurarRegrasCategorias_(categoryRules);
  configurarAssinaturas_(subscriptions);
  configurarResumoAssinaturas_(subscriptionSummary);
  configurarMetas_(goals);
  configurarAportesMetas_(goalContributions);
  configurarResumoMetas_(goalSummary);
  configurarAnalises_(analytics);
  configurarPadroes_(patterns);
  configurarPrevisoes_(forecasts);
  configurarRelatorios_(reports);
  configurarConversasIA_(conversations);

  configurarDashboard_(dashboard);

  cadastrarAssinaturasIniciais_(subscriptions);
  sincronizarAssinaturasRecorrencias_();
  atualizarResumoFinanceiro_();

  SpreadsheetApp.getUi().alert(
    'Finance AI Lite',
    'Etapa 4 pronta: camada conversacional, relatorios inteligentes e ponte com NotebookLM ativadas.',
    SpreadsheetApp.getUi().ButtonSet.OK
  );
}

function configurarTransacoes_(sheet) {
  const headers = [
    'ID',
    'Data',
    'Tipo',
    'Descricao',
    'Categoria',
    'Valor',
    'Conta',
    'Meio de pagamento',
    'Cartao',
    'Parcelas',
    'Observacao',
    'Texto original',
    'Registrado em',
    'Parcela atual',
    'Grupo parcelamento',
    'Data da compra'
  ];

  // Reaplica os cabeçalhos para também migrar planilhas já existentes.
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

  formatHeader_(sheet.getRange(1, 1, 1, headers.length));
  sheet.setFrozenRows(1);

  sheet.getRange('B:B').setNumberFormat('dd/MM/yyyy');
  sheet.getRange('F:F').setNumberFormat('R$ #,##0.00');
  sheet.getRange('M:M').setNumberFormat('dd/MM/yyyy HH:mm');
  sheet.getRange('P:P').setNumberFormat('dd/MM/yyyy');

  const widths = [
    150, 95, 110, 180, 150, 100, 130, 150,
    130, 75, 220, 320, 145, 90, 180, 105
  ];

  widths.forEach((width, index) => {
    sheet.setColumnWidth(index + 1, width);
  });
}

function configurarContas_(sheet) {
  const headers = [
    'Conta',
    'Tipo',
    'Instituicao',
    'Ativa',
    'Saldo inicial',
    'Data saldo inicial'
  ];

  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

  if (sheet.getLastRow() === 1) {
    sheet.getRange(2, 1, 1, headers.length).setValues([
      [
        'Santander',
        'Conta corrente',
        'Santander',
        'Sim',
        0,
        ''
      ]
    ]);
  }

  formatHeader_(sheet.getRange(1, 1, 1, headers.length));
  sheet.setFrozenRows(1);

  sheet.getRange('E:E').setNumberFormat('R$ #,##0.00');
  sheet.getRange('F:F').setNumberFormat('dd/MM/yyyy');

  sheet.setColumnWidth(1, 150);
  sheet.setColumnWidth(2, 150);
  sheet.setColumnWidth(3, 150);
  sheet.setColumnWidth(4, 80);
  sheet.setColumnWidth(5, 120);
  sheet.setColumnWidth(6, 130);
}

function configurarCartoes_(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, 7).setValues([
      [
        'Cartao',
        'Instituicao',
        'Conta vinculada',
        'Limite',
        'Dia fechamento',
        'Dia vencimento',
        'Ativo'
      ]
    ]);
  }

  formatHeader_(sheet.getRange(1, 1, 1, 7));
  sheet.setFrozenRows(1);
  sheet.getRange('D:D').setNumberFormat('R$ #,##0.00');

  sheet.setColumnWidth(1, 150);
  sheet.setColumnWidth(2, 150);
  sheet.setColumnWidth(3, 160);
  sheet.setColumnWidth(4, 120);
  sheet.setColumnWidth(5, 110);
  sheet.setColumnWidth(6, 110);
  sheet.setColumnWidth(7, 80);
}

function configurarCategorias_(sheet) {
  if (sheet.getLastRow() === 0) {
    const rows = [
      ['Tipo', 'Categoria', 'Ativa', 'Palavras-chave'],
      ['Receita', 'Salario', 'Sim', 'salario, pagamento, holerite'],
      ['Receita', 'Freelance', 'Sim', 'freela, freelance, cache'],
      ['Receita', 'Reembolso', 'Sim', 'reembolso, devolucao'],
      ['Receita', 'Outras receitas', 'Sim', ''],
      ['Despesa', 'Alimentacao', 'Sim', 'restaurante, lanche, ifood, mercado, supermercado'],
      ['Despesa', 'Transporte', 'Sim', 'uber, 99, onibus, trem, metro, gasolina'],
      ['Despesa', 'Moradia', 'Sim', 'aluguel, condominio'],
      ['Despesa', 'Contas da casa', 'Sim', 'internet, luz, agua, telefone'],
      ['Despesa', 'Saude', 'Sim', 'farmacia, medico, dentista'],
      ['Despesa', 'Lazer', 'Sim', 'cinema, bar, festa, streaming'],
      ['Despesa', 'Compras', 'Sim', 'roupa, tenis, eletronico'],
      ['Despesa', 'Educacao', 'Sim', 'faculdade, curso, livro'],
      ['Despesa', 'Assinaturas', 'Sim', 'assinatura, plano'],
      ['Despesa', 'Impostos e tarifas', 'Sim', 'tarifa, imposto, taxa'],
      ['Despesa', 'Outros', 'Sim', ''],
      ['Transferencia', 'Transferencia entre contas', 'Sim', 'transferi, transferencia']
    ];

    sheet.getRange(1, 1, rows.length, 4).setValues(rows);
  }

  formatHeader_(sheet.getRange(1, 1, 1, 4));
  sheet.setFrozenRows(1);
  sheet.setColumnWidth(1, 120);
  sheet.setColumnWidth(2, 180);
  sheet.setColumnWidth(3, 90);
  sheet.setColumnWidth(4, 330);
}

function configurarSaldos_(sheet) {
  sheet.clear();

  const headers = [
    'Conta',
    'Saldo inicial',
    'Receitas',
    'Despesas imediatas',
    'Pagamentos de fatura',
    'Transferencias recebidas',
    'Transferencias enviadas',
    'Saldo calculado',
    'Data de referencia'
  ];

  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  formatHeader_(sheet.getRange(1, 1, 1, headers.length));
  sheet.setFrozenRows(1);

  sheet.getRange('B:H').setNumberFormat('R$ #,##0.00');
  sheet.getRange('I:I').setNumberFormat('dd/MM/yyyy');

  sheet.setColumnWidth(1, 160);
  sheet.setColumnWidth(2, 120);
  sheet.setColumnWidth(3, 120);
  sheet.setColumnWidth(4, 140);
  sheet.setColumnWidth(5, 150);
  sheet.setColumnWidth(6, 165);
  sheet.setColumnWidth(7, 155);
  sheet.setColumnWidth(8, 130);
  sheet.setColumnWidth(9, 130);
}

function configurarFaturas_(sheet) {
  sheet.clear();

  const headers = [
    'Cartao',
    'Competencia',
    'Vencimento',
    'Valor previsto',
    'Valor pago',
    'Saldo fatura',
    'Status',
    'Lancamentos',
    'Ultimo pagamento'
  ];

  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  formatHeader_(sheet.getRange(1, 1, 1, headers.length));
  sheet.setFrozenRows(1);

  sheet.getRange('C:C').setNumberFormat('dd/MM/yyyy');
  sheet.getRange('D:F').setNumberFormat('R$ #,##0.00');
  sheet.getRange('I:I').setNumberFormat('dd/MM/yyyy');

  sheet.setColumnWidth(1, 160);
  sheet.setColumnWidth(2, 110);
  sheet.setColumnWidth(3, 120);
  sheet.setColumnWidth(4, 130);
  sheet.setColumnWidth(5, 120);
  sheet.setColumnWidth(6, 120);
  sheet.setColumnWidth(7, 100);
  sheet.setColumnWidth(8, 100);
  sheet.setColumnWidth(9, 130);
}

function configurarPagamentosFatura_(sheet) {
  const headers = [
    'ID',
    'Data pagamento',
    'Cartao',
    'Conta',
    'Competencia',
    'Valor pago',
    'Texto original',
    'Registrado em'
  ];

  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  } else {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  }

  formatHeader_(sheet.getRange(1, 1, 1, headers.length));
  sheet.setFrozenRows(1);

  sheet.getRange('B:B').setNumberFormat('dd/MM/yyyy');
  sheet.getRange('F:F').setNumberFormat('R$ #,##0.00');
  sheet.getRange('H:H').setNumberFormat('dd/MM/yyyy HH:mm');

  sheet.setColumnWidth(1, 150);
  sheet.setColumnWidth(2, 120);
  sheet.setColumnWidth(3, 160);
  sheet.setColumnWidth(4, 150);
  sheet.setColumnWidth(5, 110);
  sheet.setColumnWidth(6, 120);
  sheet.setColumnWidth(7, 320);
  sheet.setColumnWidth(8, 145);
}

function configurarTransferencias_(sheet) {
  const headers = [
    'ID',
    'Data',
    'Conta origem',
    'Conta destino',
    'Valor',
    'Observacao',
    'Texto original',
    'Registrado em'
  ];

  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

  formatHeader_(sheet.getRange(1, 1, 1, headers.length));
  sheet.setFrozenRows(1);

  sheet.getRange('B:B').setNumberFormat('dd/MM/yyyy');
  sheet.getRange('E:E').setNumberFormat('R$ #,##0.00');
  sheet.getRange('H:H').setNumberFormat('dd/MM/yyyy HH:mm');

  sheet.setColumnWidth(1, 150);
  sheet.setColumnWidth(2, 110);
  sheet.setColumnWidth(3, 150);
  sheet.setColumnWidth(4, 150);
  sheet.setColumnWidth(5, 120);
  sheet.setColumnWidth(6, 220);
  sheet.setColumnWidth(7, 320);
  sheet.setColumnWidth(8, 145);
}

function configurarOrcamentos_(sheet) {
  const headers = [
    'Categoria',
    'Limite mensal',
    'Ativo'
  ];

  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  formatHeader_(sheet.getRange(1, 1, 1, headers.length));
  sheet.setFrozenRows(1);

  sheet.getRange('B:B').setNumberFormat('R$ #,##0.00');

  sheet.setColumnWidth(1, 190);
  sheet.setColumnWidth(2, 130);
  sheet.setColumnWidth(3, 80);

  sincronizarCategoriasOrcamento_(sheet);
}

function sincronizarCategoriasOrcamento_(sheet) {
  const ss = getFinanceSpreadsheet_();

  const categoriesSheet =
    ss.getSheetByName(
      FINANCE_AI.SHEETS.CATEGORIES
    );

  if (
    !categoriesSheet ||
    categoriesSheet.getLastRow() < 2
  ) {
    return;
  }

  const categoryRows =
    categoriesSheet
      .getRange(
        2,
        1,
        categoriesSheet.getLastRow() - 1,
        4
      )
      .getValues();

  const expenseCategories =
    categoryRows
      .filter(row => {
        return (
          String(row[0] || '') === 'Despesa' &&
          normalizarTexto_(row[2]) !== 'nao'
        );
      })
      .map(row => String(row[1] || '').trim())
      .filter(Boolean);

  const existing = {};

  if (sheet.getLastRow() >= 2) {
    const values =
      sheet
        .getRange(
          2,
          1,
          sheet.getLastRow() - 1,
          3
        )
        .getValues();

    values.forEach(row => {
      const key =
        normalizarTexto_(row[0]);

      if (key) {
        existing[key] = {
          categoria: String(row[0] || ''),
          limite: Number(row[1] || 0),
          ativo:
            String(row[2] || '').trim() || 'Sim'
        };
      }
    });
  }

  const rows =
    expenseCategories.map(categoria => {
      const key =
        normalizarTexto_(categoria);

      if (existing[key]) {
        return [
          categoria,
          existing[key].limite,
          existing[key].ativo
        ];
      }

      return [
        categoria,
        0,
        'Sim'
      ];
    });

  if (sheet.getLastRow() >= 2) {
    sheet
      .getRange(
        2,
        1,
        sheet.getLastRow() - 1,
        3
      )
      .clearContent();
  }

  if (rows.length) {
    sheet
      .getRange(
        2,
        1,
        rows.length,
        3
      )
      .setValues(rows);
  }
}


function obterSeparadorFormula_() {
  const locale =
    String(
      getFinanceSpreadsheet_()
        .getSpreadsheetLocale() || ''
    )
      .trim()
      .toLowerCase();

  // No Finance AI a localidade de producao e pt-BR.
  // Google Sheets usa ";" como separador de argumentos nesse locale.
  if (
    locale === 'pt_br' ||
    locale === 'pt-br' ||
    locale === 'pt' ||
    locale.startsWith('pt_') ||
    locale.startsWith('pt-')
  ) {
    return ';';
  }

  return ',';
}

function formulaInicioMesAtual_() {
  const s =
    obterSeparadorFormula_();

  return (
    '=DATE(YEAR(TODAY())' +
    s +
    'MONTH(TODAY())' +
    s +
    '1)'
  );
}

function formulaDashboardMovimentoMes_(
  tipo,
  categoriaCell
) {
  const s =
    obterSeparadorFormula_();

  let formula =
    '=SUMIFS(' +
    'Transacoes!F:F' + s +
    'Transacoes!C:C' + s +
    '"' + tipo + '"' + s;

  if (categoriaCell) {
    formula +=
      'Transacoes!E:E' + s +
      categoriaCell + s;
  }

  formula +=
    'Transacoes!B:B' + s +
    '">="&B3' + s +
    'Transacoes!B:B' + s +
    '"<"&DATE(YEAR(B3)' +
    s +
    'MONTH(B3)+1' +
    s +
    '1))';

  return formula;
}

function formulaCountIf_(rangeA1, criterio) {
  const s =
    obterSeparadorFormula_();

  return (
    '=COUNTIF(' +
    rangeA1 +
    s +
    '"' +
    criterio +
    '")'
  );
}

function aplicarFormulasDashboardLocalidade_(sheet) {
  if (!sheet) {
    return false;
  }

  sheet
    .getRange('B3')
    .setFormula(
      formulaInicioMesAtual_()
    )
    .setNumberFormat(
      'mmmm/yyyy'
    );

  sheet
    .getRange('B6')
    .setFormula(
      formulaDashboardMovimentoMes_(
        'Receita',
        ''
      )
    );

  sheet
    .getRange('B7')
    .setFormula(
      formulaDashboardMovimentoMes_(
        'Despesa',
        ''
      )
    );

  sheet
    .getRange('B8')
    .setFormula(
      '=B6-B7'
    );

  sheet
    .getRange('E9')
    .setFormula(
      formulaCountIf_(
        'ResumoOrcamentos!F6:F',
        'Acima do limite'
      )
    );

  for (
    let row = 12;
    row <= 21;
    row++
  ) {
    sheet
      .getRange(
        row,
        2
      )
      .setFormula(
        formulaDashboardMovimentoMes_(
          'Despesa',
          'A' + row
        )
      );
  }

  return true;
}

function corrigirFormulasLocalidade_() {
  const ss =
    getFinanceSpreadsheet_();

  const locale =
    String(
      ss.getSpreadsheetLocale() ||
      ''
    );

  const dashboard =
    ss.getSheetByName(
      FINANCE_AI.SHEETS.DASHBOARD
    );

  const budgetSummary =
    ss.getSheetByName(
      FINANCE_AI.SHEETS.BUDGET_SUMMARY
    );

  const analytics =
    ss.getSheetByName(
      FINANCE_AI.SHEETS.ANALYTICS
    );

  let corrigidas = 0;

  if (dashboard) {
    aplicarFormulasDashboardLocalidade_(
      dashboard
    );
    corrigidas++;
  }

  if (budgetSummary) {
    budgetSummary
      .getRange('B3')
      .setFormula(
        formulaInicioMesAtual_()
      )
      .setNumberFormat(
        'mmmm/yyyy'
      );
    corrigidas++;
  }

  if (analytics) {
    analytics
      .getRange('B3')
      .setFormula(
        formulaInicioMesAtual_()
      )
      .setNumberFormat(
        'mmmm/yyyy'
      );
    corrigidas++;
  }

  SpreadsheetApp.flush();

  return {
    ok: true,
    locale: locale,
    separador:
      obterSeparadorFormula_(),
    abasCorrigidas:
      corrigidas
  };
}

function corrigirFormulasLocalidade() {
  const resultado =
    corrigirFormulasLocalidade_();

  SpreadsheetApp
    .getUi()
    .alert(
      'Finance AI Lite v1.1.1',
      'Formulas corrigidas para a localidade ' +
        resultado.locale +
        '. Separador usado: ' +
        resultado.separador +
        '. Abas ajustadas: ' +
        resultado.abasCorrigidas +
        '.',
      SpreadsheetApp
        .getUi()
        .ButtonSet
        .OK
    );

  return resultado;
}

function configurarResumoOrcamentos_(sheet) {
  sheet.clear();

  sheet.getRange('A1:G1').merge();
  sheet.getRange('A1').setValue('Finance AI Lite - Acompanhamento de Orcamentos');
  sheet.getRange('A1:G1')
    .setBackground('#D9EAF7')
    .setFontColor('#17365D')
    .setFontWeight('bold')
    .setFontSize(14);

  sheet.getRange('A3:B3').setValues([
    ['Mes de referencia', new Date()]
  ]);

  sheet
    .getRange('B3')
    .setFormula(
      formulaInicioMesAtual_()
    );

  sheet
    .getRange('B3')
    .setNumberFormat('mmmm/yyyy');

  const headers = [
    'Categoria',
    'Orcamento',
    'Gasto',
    'Restante',
    'Uso',
    'Status'
  ];

  sheet
    .getRange(5, 1, 1, headers.length)
    .setValues([headers]);

  formatHeader_(
    sheet.getRange(
      5,
      1,
      1,
      headers.length
    )
  );

  sheet.setFrozenRows(5);

  sheet.getRange('B:D').setNumberFormat('R$ #,##0.00');
  sheet.getRange('E:E').setNumberFormat('0.0%');

  sheet.setColumnWidth(1, 190);
  sheet.setColumnWidth(2, 120);
  sheet.setColumnWidth(3, 120);
  sheet.setColumnWidth(4, 120);
  sheet.setColumnWidth(5, 90);
  sheet.setColumnWidth(6, 110);
}

function configurarRecorrencias_(sheet) {
  const headers = [
    'ID',
    'Descricao',
    'Tipo',
    'Categoria',
    'Valor',
    'Conta',
    'Meio de pagamento',
    'Cartao',
    'Dia do mes',
    'Inicio',
    'Fim',
    'Ativa',
    'Ultima geracao',
    'Texto original',
    'Criado em'
  ];

  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

  formatHeader_(sheet.getRange(1, 1, 1, headers.length));
  sheet.setFrozenRows(1);

  sheet.getRange('E:E').setNumberFormat('R$ #,##0.00');
  sheet.getRange('J:K').setNumberFormat('dd/MM/yyyy');
  sheet.getRange('M:M').setNumberFormat('dd/MM/yyyy');
  sheet.getRange('O:O').setNumberFormat('dd/MM/yyyy HH:mm');

  const widths = [
    150, 180, 110, 160, 110,
    140, 150, 140, 90, 110,
    110, 80, 120, 320, 145
  ];

  widths.forEach((width, index) => {
    sheet.setColumnWidth(index + 1, width);
  });
}

function configurarRegrasCategorias_(sheet) {
  const headers = [
    'Prioridade',
    'Texto contem',
    'Categoria',
    'Ativa'
  ];

  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

  // Se ainda nao houver regras, cria alguns exemplos iniciais.
  if (sheet.getLastRow() === 1) {
    const exemplos = [
      [100, 'uber', 'Transporte', 'Sim'],
      [100, '99', 'Transporte', 'Sim'],
      [100, 'ifood', 'Alimentacao', 'Sim'],
      [100, 'spotify', 'Assinaturas', 'Sim'],
      [100, 'carrefour', 'Alimentacao', 'Sim']
    ];

    sheet
      .getRange(
        2,
        1,
        exemplos.length,
        exemplos[0].length
      )
      .setValues(exemplos);
  }

  formatHeader_(sheet.getRange(1, 1, 1, headers.length));
  sheet.setFrozenRows(1);

  sheet.setColumnWidth(1, 100);
  sheet.setColumnWidth(2, 220);
  sheet.setColumnWidth(3, 180);
  sheet.setColumnWidth(4, 80);
}

