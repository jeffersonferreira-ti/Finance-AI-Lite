function configurarDashboard_(sheet) {
  sheet.clear();

  sheet.getRange('A1:F1').merge();
  sheet.getRange('A1').setValue('Finance AI Lite - Dashboard');
  sheet.getRange('A1:F1')
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

  sheet.getRange('A5:B8').setValues([
    ['Indicador', 'Valor'],
    ['Receitas', ''],
    ['Despesas', ''],
    ['Saldo', '']
  ]);

  formatHeader_(sheet.getRange('A5:B5'));

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
    .getRange('B6:B8')
    .setNumberFormat(
      'R$ #,##0.00'
    );

  sheet.getRange('D5:E9').setValues([
    ['Orcamentos', 'Valor'],
    ['Orcado no mes', ''],
    ['Gasto orcado', ''],
    ['Restante', ''],
    ['Categorias acima do limite', '']
  ]);

  formatHeader_(sheet.getRange('D5:E5'));

  sheet.getRange('E6').setFormula('=SUM(ResumoOrcamentos!B6:B)');
  sheet.getRange('E7').setFormula('=SUM(ResumoOrcamentos!C6:C)');
  sheet.getRange('E8').setFormula('=SUM(ResumoOrcamentos!D6:D)');
  sheet.getRange('E9').setFormula(
    formulaCountIf_('ResumoOrcamentos!F6:F','Acima do limite')
  );
  sheet.getRange('E6:E8').setNumberFormat('R$ #,##0.00');

  const categories = [
    'Alimentacao','Transporte','Moradia','Contas da casa','Saude','Lazer','Compras','Educacao','Assinaturas','Outros'
  ];

  sheet.getRange('A11:B11').setValues([['Despesas por categoria','Valor']]);
  formatHeader_(sheet.getRange('A11:B11'));
  sheet.getRange(12,1,categories.length,1).setValues(categories.map(categoria=>[categoria]));

  categories.forEach((_,i)=>{
    const row=i+12;
    sheet.getRange(row,2).setFormula(
      formulaDashboardMovimentoMes_('Despesa','A'+row)
    );
  });

  sheet.getRange('B12:B21').setNumberFormat('R$ #,##0.00');

  sheet.getRange('D12:E17').setValues([
    ['Metas financeiras','Valor'],['Metas ativas',''],['Valor alvo total',''],['Valor acumulado',''],['Valor restante',''],['Aporte mensal necessario','']
  ]);
  formatHeader_(sheet.getRange('D12:E12'));
  sheet.getRange('E13').setFormula('=ResumoMetas!B4');
  sheet.getRange('E14').setFormula('=ResumoMetas!B5');
  sheet.getRange('E15').setFormula('=ResumoMetas!B6');
  sheet.getRange('E16').setFormula('=ResumoMetas!B7');
  sheet.getRange('E17').setFormula('=ResumoMetas!B8');
  sheet.getRange('E14:E17').setNumberFormat('R$ #,##0.00');

  sheet.getRange('D20:E24').setValues([
    ['Forecast','Valor'],['Despesa estimada mes',''],['Resultado estimado mes',''],['Fatura prevista mes',''],['Saldo apos compromissos','']
  ]);
  formatHeader_(sheet.getRange('D20:E20'));
  sheet.getRange('E21').setFormula('=Previsoes!F13');
  sheet.getRange('E22').setFormula('=Previsoes!G13');
  sheet.getRange('E23').setFormula('=Previsoes!H13');
  sheet.getRange('E24').setFormula('=Previsoes!I13');
  sheet.getRange('E21:E24').setNumberFormat('R$ #,##0.00');

  sheet.setColumnWidth(1,190);
  sheet.setColumnWidth(2,130);
  sheet.setColumnWidth(3,70);
  sheet.setColumnWidth(4,205);
  sheet.setColumnWidth(5,130);
  sheet.setColumnWidth(6,75);
}

function testarGeminiAPI() {
  const apiKey=getApiKey_();
  const url='https://generativelanguage.googleapis.com/v1beta/models/'+encodeURIComponent(FINANCE_AI.MODEL)+':generateContent';
  const payload={contents:[{parts:[{text:'Responda apenas com OK.'}]}],generationConfig:{temperature:0,maxOutputTokens:10}};
  const response=UrlFetchApp.fetch(url,{method:'post',contentType:'application/json',headers:{'x-goog-api-key':apiKey},payload:JSON.stringify(payload),muteHttpExceptions:true});
  const status=response.getResponseCode();
  if(status<200||status>=300){throw new Error('Gemini API retornou HTTP '+status+': '+response.getContentText());}
  SpreadsheetApp.getUi().alert('Gemini API funcionando.');
}
