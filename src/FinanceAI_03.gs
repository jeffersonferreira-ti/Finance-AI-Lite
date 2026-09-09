function configurarAssinaturas_(sheet) {
  const headers = [
    'ID','Servico','Plano','Categoria','Valor','Frequencia','Dia cobranca','Meio pagamento','Cartao','Status','Inicio','Proxima cobranca','Recorrencia ID','Observacao','Criado em'
  ];
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  formatHeader_(sheet.getRange(1, 1, 1, headers.length));
  sheet.setFrozenRows(1);
  sheet.getRange('E:E').setNumberFormat('R$ #,##0.00');
  sheet.getRange('K:L').setNumberFormat('dd/MM/yyyy');
  sheet.getRange('O:O').setNumberFormat('dd/MM/yyyy HH:mm');
  const widths = [150,190,150,170,110,110,100,145,145,100,110,125,180,230,145];
  widths.forEach((width,index)=>sheet.setColumnWidth(index+1,width));
}

function configurarResumoAssinaturas_(sheet) {
  sheet.clear();
  sheet.getRange('A1:G1').merge();
  sheet.getRange('A1').setValue('Finance AI Lite - Resumo de Assinaturas');
  sheet.getRange('A1:G1').setBackground('#D9EAF7').setFontColor('#17365D').setFontWeight('bold').setFontSize(14);
  sheet.getRange('A3:B7').setValues([
    ['Indicador','Valor'],['Assinaturas ativas',0],['Custo mensal equivalente',0],['Custo anual projetado',0],['Cobrancas nos proximos 7 dias',0]
  ]);
  formatHeader_(sheet.getRange('A3:B3'));
  sheet.getRange('B5:B7').setNumberFormat('R$ #,##0.00');
  sheet.getRange('D3:E5').setValues([['Proxima cobranca','Valor'],['Servico',''],['Data','']]);
  formatHeader_(sheet.getRange('D3:E3'));
  sheet.getRange('E5').setNumberFormat('dd/MM/yyyy');
  const headers=['Servico','Categoria','Valor','Frequencia','Equiv. mensal','Projecao anual','Proxima cobranca'];
  sheet.getRange(10,1,1,headers.length).setValues([headers]);
  formatHeader_(sheet.getRange(10,1,1,headers.length));
  sheet.setFrozenRows(10);
  sheet.getRange('C:C').setNumberFormat('R$ #,##0.00');
  sheet.getRange('E:F').setNumberFormat('R$ #,##0.00');
  sheet.getRange('G:G').setNumberFormat('dd/MM/yyyy');
  [190,170,110,110,125,125,130].forEach((width,index)=>sheet.setColumnWidth(index+1,width));
}

function cadastrarAssinaturasIniciais_(sheet) {
  const hoje=new Date();
  const inicio=new Date(hoje.getFullYear(),hoje.getMonth(),hoje.getDate(),12,0,0);
  const padroes=[
    {servico:'Claro Internet Banda Larga',plano:'',categoria:'Contas da casa',valor:117.90,frequencia:'Mensal',dia:9,meio:'Credito',cartao:'Carrefour',observacao:''},
    {servico:'Amazon Prime',plano:'',categoria:'Assinaturas',valor:19.90,frequencia:'Mensal',dia:10,meio:'Credito',cartao:'Carrefour',observacao:''},
    {servico:'Smart Fit',plano:'',categoria:'Saude',valor:149.90,frequencia:'Mensal',dia:20,meio:'Credito',cartao:'Carrefour',observacao:''},
    {servico:'Claro Flex',plano:'',categoria:'Contas da casa',valor:69.90,frequencia:'Mensal',dia:4,meio:'Credito',cartao:'Carrefour',observacao:''},
    {servico:'SoundCloud',plano:'',categoria:'Assinaturas',valor:28.99,frequencia:'Mensal',dia:21,meio:'Credito',cartao:'Carrefour',observacao:'IOF da transacao internacional deve ser lancado separadamente.'},
    {servico:'iCloud',plano:'',categoria:'Assinaturas',valor:5.90,frequencia:'Mensal',dia:27,meio:'Credito',cartao:'Carrefour',observacao:''},
    {servico:'Google One',plano:'',categoria:'Assinaturas',valor:9.99,frequencia:'Mensal',dia:19,meio:'Credito',cartao:'Carrefour',observacao:''},
    {servico:'Apple Music',plano:'',categoria:'Assinaturas',valor:12.90,frequencia:'Mensal',dia:7,meio:'Credito',cartao:'Carrefour',observacao:''},
    {servico:'YouTube Premium',plano:'',categoria:'Assinaturas',valor:16.90,frequencia:'Mensal',dia:13,meio:'Credito',cartao:'Carrefour',observacao:''}
  ];
  const existentes=new Set();
  if(sheet.getLastRow()>=2){
    const values=sheet.getRange(2,2,sheet.getLastRow()-1,1).getValues();
    values.forEach(row=>{const nome=normalizarTexto_(row[0]);if(nome)existentes.add(nome);});
  }
  const rows=padroes.filter(item=>!existentes.has(normalizarTexto_(item.servico))).map(item=>[
    Utilities.getUuid(),item.servico,item.plano,item.categoria,item.valor,item.frequencia,item.dia,item.meio,item.cartao,'Ativa',inicio,'','',item.observacao,new Date()
  ]);
  if(!rows.length)return;
  const startRow=sheet.getLastRow()+1;
  sheet.getRange(startRow,1,rows.length,15).setValues(rows);
  sheet.getRange(startRow,5,rows.length,1).setNumberFormat('R$ #,##0.00');
  sheet.getRange(startRow,11,rows.length,2).setNumberFormat('dd/MM/yyyy');
  sheet.getRange(startRow,15,rows.length,1).setNumberFormat('dd/MM/yyyy HH:mm');
}

function configurarMetas_(sheet) {
  const headers=['ID','Meta','Valor alvo','Valor inicial','Data alvo','Prioridade','Status','Conta referencia','Observacao','Criado em'];
  sheet.getRange(1,1,1,headers.length).setValues([headers]);
  formatHeader_(sheet.getRange(1,1,1,headers.length));
  sheet.setFrozenRows(1);
  sheet.getRange('C:D').setNumberFormat('R$ #,##0.00');
  sheet.getRange('E:E').setNumberFormat('dd/MM/yyyy');
  sheet.getRange('J:J').setNumberFormat('dd/MM/yyyy HH:mm');
  [150,220,125,125,115,100,105,150,260,145].forEach((width,index)=>sheet.setColumnWidth(index+1,width));
}

function configurarAportesMetas_(sheet) {
  const headers=['ID','Data','Meta ID','Meta','Valor','Conta origem','Observacao','Texto original','Registrado em'];
  sheet.getRange(1,1,1,headers.length).setValues([headers]);
  formatHeader_(sheet.getRange(1,1,1,headers.length));
  sheet.setFrozenRows(1);
  sheet.getRange('B:B').setNumberFormat('dd/MM/yyyy');
  sheet.getRange('E:E').setNumberFormat('R$ #,##0.00');
  sheet.getRange('I:I').setNumberFormat('dd/MM/yyyy HH:mm');
  [150,110,160,220,120,150,250,320,145].forEach((width,index)=>sheet.setColumnWidth(index+1,width));
}

function configurarResumoMetas_(sheet) {
  sheet.clear();
  sheet.getRange('A1:I1').merge();
  sheet.getRange('A1').setValue('Finance AI Lite - Metas Financeiras');
  sheet.getRange('A1:I1').setBackground('#D9EAF7').setFontColor('#17365D').setFontWeight('bold').setFontSize(14);
  sheet.getRange('A3:B8').setValues([['Indicador','Valor'],['Metas ativas',0],['Valor alvo total',0],['Valor acumulado',0],['Valor restante',0],['Aporte mensal necessario',0]]);
  formatHeader_(sheet.getRange('A3:B3'));
  sheet.getRange('B5:B8').setNumberFormat('R$ #,##0.00');
  const headers=['Meta','Valor alvo','Acumulado','Restante','Progresso','Data alvo','Dias restantes','Aporte mensal necessario','Situacao'];
  sheet.getRange(10,1,1,headers.length).setValues([headers]);
  formatHeader_(sheet.getRange(10,1,1,headers.length));
  sheet.setFrozenRows(10);
  sheet.getRange('B:D').setNumberFormat('R$ #,##0.00');
  sheet.getRange('E:E').setNumberFormat('0.0%');
  sheet.getRange('F:F').setNumberFormat('dd/MM/yyyy');
  sheet.getRange('H:H').setNumberFormat('R$ #,##0.00');
  [220,125,125,125,100,115,110,170,130].forEach((width,index)=>sheet.setColumnWidth(index+1,width));
}

function configurarAnalises_(sheet) {
  sheet.clear();
  sheet.getRange(1,1,sheet.getMaxRows(),sheet.getMaxColumns()).breakApart();
  sheet.getRange('A1:F1').merge();
  sheet.getRange('A1').setValue('Finance AI Lite - Analise Inteligente');
  sheet.getRange('A1:F1').setBackground('#D9EAF7').setFontColor('#17365D').setFontWeight('bold').setFontSize(14);
  sheet.getRange('A3:B3').setValues([['Mes de referencia',new Date()]]);
  sheet.getRange('B3').setFormula(formulaInicioMesAtual_()).setNumberFormat('mmmm/yyyy');
  sheet.getRange('A5:B14').setValues([['Indicador','Valor'],['Receitas do mes',0],['Despesas do mes',0],['Resultado do mes',0],['Taxa de poupanca',0],['Saldo total em contas',0],['Faturas em aberto',0],['Assinaturas mensais',0],['Aporte mensal para metas',0],['Orcamentos acima do limite',0]]);
  formatHeader_(sheet.getRange('A5:B5'));
  sheet.getRange('B6:B8').setNumberFormat('R$ #,##0.00');
  sheet.getRange('B9').setNumberFormat('0.0%');
  sheet.getRange('B10:B13').setNumberFormat('R$ #,##0.00');
  sheet.getRange('D5:E11').setValues([['Insight','Valor'],['Maior categoria de despesa',''],['Valor da maior categoria',0],['Despesas futuras no mes',0],['Despesas registradas - proximos 30 dias',0],['Faturas abertas - proximos 30 dias',0],['Situacao geral','']]);
  formatHeader_(sheet.getRange('D5:E5'));
  sheet.getRange('E7:E10').setNumberFormat('R$ #,##0.00');
  sheet.getRange('A17:E17').merge();
  sheet.getRange('A17').setValue('Insights automaticos');
  formatHeader_(sheet.getRange('A17:E17'));
  sheet.setColumnWidth(1,220);sheet.setColumnWidth(2,140);sheet.setColumnWidth(4,280);sheet.setColumnWidth(5,260);
}

function configurarPadroes_(sheet) {
  sheet.clear();
  sheet.getRange(1,1,sheet.getMaxRows(),sheet.getMaxColumns()).breakApart();
  sheet.getRange('A1:M1').merge();
  sheet.getRange('A1').setValue('Finance AI Lite - Padroes e Anomalias');
  sheet.getRange('A1:M1').setBackground('#D9EAF7').setFontColor('#17365D').setFontWeight('bold').setFontSize(14);
  sheet.getRange('A3:B9').setValues([['Indicador','Valor'],['Despesa atual ate hoje',0],['Mes anterior - mesmo periodo',0],['Variacao mensal comparavel',0],['Anomalias detectadas',0],['Orcamentos em ritmo acelerado',0],['Tendencia da fatura','']]);
  formatHeader_(sheet.getRange('A3:B3'));
  sheet.getRange('B4:B5').setNumberFormat('R$ #,##0.00');
  sheet.getRange('B6').setNumberFormat('0.0%');
  sheet.getRange('A12:F12').setValues([['Categoria','Atual ate hoje','Anterior ate mesmo dia','Diferenca','Variacao','Sinal']]);
  formatHeader_(sheet.getRange('A12:F12'));
  sheet.getRange('B:D').setNumberFormat('R$ #,##0.00');sheet.getRange('E:E').setNumberFormat('0.0%');
  sheet.getRange('H3:M3').setValues([['Criterio','Data','Descricao','Categoria','Valor','Referencia']]);
  formatHeader_(sheet.getRange('H3:M3'));sheet.getRange('I:I').setNumberFormat('dd/MM/yyyy');sheet.getRange('L:M').setNumberFormat('R$ #,##0.00');
  sheet.getRange('H12:M12').setValues([['Orcamento','Limite','Gasto ate hoje','Uso','Ritmo esperado','Status']]);
  formatHeader_(sheet.getRange('H12:M12'));sheet.getRange('I:J').setNumberFormat('R$ #,##0.00');sheet.getRange('K:L').setNumberFormat('0.0%');
  sheet.getRange('A30:D30').setValues([['Competencia','Fatura conhecida','Variacao','Observacao']]);
  formatHeader_(sheet.getRange('A30:D30'));sheet.getRange('B:B').setNumberFormat('R$ #,##0.00');sheet.getRange('C:C').setNumberFormat('0.0%');
  const widths={1:190,2:135,3:150,4:130,5:100,6:145,8:145,9:105,10:190,11:150,12:120,13:145};
  Object.keys(widths).forEach(col=>sheet.setColumnWidth(Number(col),widths[col]));
}

function configurarPrevisoes_(sheet) {
  sheet.clear();
  sheet.getRange(1,1,sheet.getMaxRows(),sheet.getMaxColumns()).breakApart();
  sheet.getRange('A1:J1').merge();
  sheet.getRange('A1').setValue('Finance AI Lite - Forecast Financeiro');
  sheet.getRange('A1:J1').setBackground('#D9EAF7').setFontColor('#17365D').setFontWeight('bold').setFontSize(14);
  sheet.getRange('A3:B9').setValues([['Premissa','Valor'],['Horizonte','3 meses'],['Media variavel historica',0],['Ritmo variavel projetado do mes',0],['Meses historicos uteis',0],['Confianca',''],['Saldo atual em contas',0]]);
  formatHeader_(sheet.getRange('A3:B3'));sheet.getRange('B5:B6').setNumberFormat('R$ #,##0.00');sheet.getRange('B9').setNumberFormat('R$ #,##0.00');
  const headers=['Competencia','Receitas conhecidas','Despesas conhecidas','Recorrencias futuras','Variavel adicional estimada','Despesa total estimada','Resultado estimado','Faturas previstas','Saldo apos compromissos conhecidos','Confianca'];
  sheet.getRange(12,1,1,headers.length).setValues([headers]);formatHeader_(sheet.getRange(12,1,1,headers.length));sheet.setFrozenRows(12);sheet.getRange('B:I').setNumberFormat('R$ #,##0.00');
  [115,145,145,145,175,165,145,145,190,105].forEach((width,index)=>sheet.setColumnWidth(index+1,width));
  sheet.getRange('A18:J18').merge();
  sheet.getRange('A18').setValue('Observacao: o saldo projetado usa apenas entradas, saidas imediatas e faturas conhecidas/projetadas. O gasto variavel estimado fica separado porque seu meio de pagamento futuro ainda e desconhecido.');
  sheet.getRange('A18:J18').setWrap(true).setFontStyle('italic');
}

function configurarRelatorios_(sheet) {
  const headers=['ID','Gerado em','Tipo','Periodo','Titulo','Conteudo','Modelo','Origem'];
  sheet.getRange(1,1,1,headers.length).setValues([headers]);formatHeader_(sheet.getRange(1,1,1,headers.length));sheet.setFrozenRows(1);sheet.getRange('B:B').setNumberFormat('dd/MM/yyyy HH:mm');
  [150,145,150,120,240,650,170,150].forEach((width,index)=>sheet.setColumnWidth(index+1,width));sheet.getRange('F:F').setWrap(true);
}

function configurarConversasIA_(sheet) {
  const headers=['ID','Data','Pergunta','Resposta','Tipo','Modelo'];
  sheet.getRange(1,1,1,headers.length).setValues([headers]);formatHeader_(sheet.getRange(1,1,1,headers.length));sheet.setFrozenRows(1);sheet.getRange('B:B').setNumberFormat('dd/MM/yyyy HH:mm');
  [150,145,380,650,145,170].forEach((width,index)=>sheet.setColumnWidth(index+1,width));sheet.getRange('C:D').setWrap(true);
}
