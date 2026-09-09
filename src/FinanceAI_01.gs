const FINANCE_AI = {
  VERSION: '1.1.1',
  MODEL: 'gemini-3.5-flash-lite',
  TIMEZONE: 'America/Sao_Paulo',
  PROPERTIES: {
    SPREADSHEET_ID: 'FINANCE_AI_SPREADSHEET_ID',
    WEBAPP_CONFIGURED_AT: 'FINANCE_AI_WEBAPP_CONFIGURED_AT'
  },
  SHEETS: {
    TRANSACTIONS: 'Transacoes',
    ACCOUNTS: 'Contas',
    CARDS: 'Cartoes',
    CATEGORIES: 'Categorias',
    BALANCES: 'Saldos',
    INVOICES: 'Faturas',
    CARD_PAYMENTS: 'PagamentosFatura',
    TRANSFERS: 'Transferencias',
    BUDGETS: 'Orcamentos',
    BUDGET_SUMMARY: 'ResumoOrcamentos',
    RECURRENCES: 'Recorrencias',
    CATEGORY_RULES: 'RegrasCategorias',
    SUBSCRIPTIONS: 'Assinaturas',
    SUBSCRIPTION_SUMMARY: 'ResumoAssinaturas',
    GOALS: 'Metas',
    GOAL_CONTRIBUTIONS: 'AportesMetas',
    GOAL_SUMMARY: 'ResumoMetas',
    ANALYTICS: 'Analises',
    PATTERNS: 'Padroes',
    FORECASTS: 'Previsoes',
    REPORTS: 'Relatorios',
    AI_CONVERSATIONS: 'ConversasIA',
    DASHBOARD: 'Dashboard'
  }
};

let FINANCE_AI_SPREADSHEET_CACHE_ = null;

function onOpen() {
  const ui =
    SpreadsheetApp.getUi();

  const webAppMenu =
    ui.createMenu('Web App v1.1.1')
      .addItem(
        'Configurar backend',
        'configurarBackendWebApp'
      )
      .addItem(
        'Testar backend',
        'testarBackendWebAppMenu'
      )
      .addItem(
        'Mostrar status',
        'mostrarStatusBackendWebApp'
      );

  ui
    .createMenu('Finance AI')
    .addItem('Abrir assistente', 'abrirAssistente')
    .addSeparator()
    .addItem('Configurar planilha', 'configurarPlanilha')
    .addItem('Atualizar resumos financeiros', 'atualizarResumoFinanceiro')
    .addItem('Corrigir formulas da planilha', 'corrigirFormulasLocalidade')
    .addItem('Atualizar analise inteligente', 'atualizarAnaliseInteligente')
    .addItem('Atualizar previsoes', 'atualizarPrevisoes')
    .addSeparator()
    .addItem('Gerar relatorio mensal', 'gerarRelatorioMensal')
    .addItem('Gerar diagnostico completo', 'gerarRelatorioDiagnostico')
    .addItem('Gerar relatorio de forecast', 'gerarRelatorioForecast')
    .addSeparator()
    .addItem('Atualizar fonte NotebookLM', 'atualizarFonteNotebookLM')
    .addItem('Mostrar fonte NotebookLM', 'mostrarFonteNotebookLM')
    .addSeparator()
    .addItem('Sincronizar assinaturas', 'sincronizarAssinaturas')
    .addSeparator()
    .addItem('Processar recorrencias agora', 'processarRecorrencias')
    .addItem('Ativar processamento diario', 'instalarGatilhoRecorrencias')
    .addItem('Desativar processamento diario', 'removerGatilhoRecorrencias')
    .addSeparator()
    .addItem('Testar Gemini API', 'testarGeminiAPI')
    .addSubMenu(webAppMenu)
    .addToUi();
}

function getFinanceSpreadsheet_() {
  // Cache por execucao. O motor chama este resolvedor muitas vezes;
  // sem cache, cada chamada fazia SpreadsheetApp.openById(), o que
  // pode atingir timeout/quota do servico Drive em blocos mais pesados.
  if (FINANCE_AI_SPREADSHEET_CACHE_) {
    return FINANCE_AI_SPREADSHEET_CACHE_;
  }

  const props =
    PropertiesService
      .getScriptProperties();

  const configuredId =
    String(
      props.getProperty(
        FINANCE_AI
          .PROPERTIES
          .SPREADSHEET_ID
      ) || ''
    ).trim();

  if (configuredId) {
    let lastError = null;

    for (
      let attempt = 1;
      attempt <= 3;
      attempt++
    ) {
      try {
        FINANCE_AI_SPREADSHEET_CACHE_ =
          SpreadsheetApp.openById(
            configuredId
          );

        return FINANCE_AI_SPREADSHEET_CACHE_;
      } catch (e) {
        lastError = e;

        if (attempt < 3) {
          Utilities.sleep(
            attempt * 500
          );
        }
      }
    }

    throw new Error(
      'FINANCE_AI_SPREADSHEET_ID esta configurado, mas a planilha nao pode ser aberta. ' +
      'Verifique o ID/permissoes ou tente novamente em alguns segundos. Detalhe: ' +
      String(
        lastError &&
        lastError.message
          ? lastError.message
          : lastError
      )
    );
  }

  // Fallback para uso dentro da planilha vinculada.
  const active =
    SpreadsheetApp
      .getActiveSpreadsheet();

  if (active) {
    FINANCE_AI_SPREADSHEET_CACHE_ =
      active;

    return FINANCE_AI_SPREADSHEET_CACHE_;
  }

  throw new Error(
    'Backend do Finance AI ainda nao foi vinculado a uma planilha. ' +
    'Abra a planilha, use Finance AI > Web App v1.1 > Configurar backend e tente novamente.'
  );
}

function configurarBackendWebApp() {
  // Captura intencionalmente a planilha do container atual.
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  if (!ss) {
    throw new Error(
      'Abra a planilha Finance AI no Google Sheets antes de configurar o backend.'
    );
  }

  FINANCE_AI_SPREADSHEET_CACHE_ =
    ss;

  const props = PropertiesService.getScriptProperties();

  props.setProperty(
    FINANCE_AI.PROPERTIES.SPREADSHEET_ID,
    ss.getId()
  );

  props.setProperty(
    FINANCE_AI.PROPERTIES.WEBAPP_CONFIGURED_AT,
    new Date().toISOString()
  );

  const status = obterStatusBackendWebApp();

  SpreadsheetApp.getUi().alert(
    'Finance AI Lite v1.1',
    'Backend vinculado com sucesso.\n\n' +
    'Planilha: ' + status.spreadsheetName +
    '\nID: ' + status.spreadsheetIdMascarado +
    '\nGemini API: ' +
    (status.apiKeyConfigurada ? 'configurada' : 'NAO configurada'),
    SpreadsheetApp.getUi().ButtonSet.OK
  );

  return status;
}

function mascararId_(value) {
  const text = String(value || '');
  if (text.length <= 12) return text;
  return text.slice(0, 6) + '...' + text.slice(-6);
}

function obterStatusBackendWebApp() {
  const props = PropertiesService.getScriptProperties();
  const configuredId = String(
    props.getProperty(FINANCE_AI.PROPERTIES.SPREADSHEET_ID) || ''
  ).trim();
  const apiKey = String(
    props.getProperty('GEMINI_API_KEY') || ''
  ).trim();

  let ss = null;
  let erroPlanilha = '';

  try {
    ss = getFinanceSpreadsheet_();
  } catch (e) {
    erroPlanilha = String(e && e.message ? e.message : e);
  }

  const requiredSheets = [
    FINANCE_AI.SHEETS.TRANSACTIONS,
    FINANCE_AI.SHEETS.ACCOUNTS,
    FINANCE_AI.SHEETS.CARDS,
    FINANCE_AI.SHEETS.CATEGORIES,
    FINANCE_AI.SHEETS.RECURRENCES,
    FINANCE_AI.SHEETS.SUBSCRIPTIONS,
    FINANCE_AI.SHEETS.GOALS
  ];

  const missingSheets = ss
    ? requiredSheets.filter(name => !ss.getSheetByName(name))
    : requiredSheets.slice();

  return {
    ok: !!ss && !!configuredId && !!apiKey && missingSheets.length === 0,
    version: FINANCE_AI.VERSION,
    model: FINANCE_AI.MODEL,
    timezone: FINANCE_AI.TIMEZONE,
    spreadsheetConfigurada: !!configuredId,
    spreadsheetIdMascarado: mascararId_(configuredId),
    spreadsheetName: ss ? ss.getName() : '',
    spreadsheetUrl: ss ? ss.getUrl() : '',
    apiKeyConfigurada: !!apiKey,
    abasObrigatoriasAusentes: missingSheets,
    configuradoEm: String(
      props.getProperty(FINANCE_AI.PROPERTIES.WEBAPP_CONFIGURED_AT) || ''
    ),
    erroPlanilha: erroPlanilha
  };
}

function mostrarStatusBackendWebApp() {
  const status = obterStatusBackendWebApp();

  SpreadsheetApp.getUi().alert(
    'Finance AI Lite v1.1 - Backend',
    'Status: ' + (status.ok ? 'PRONTO' : 'PENDENTE') +
    '\nPlanilha: ' + (status.spreadsheetName || 'nao resolvida') +
    '\nID configurado: ' + (status.spreadsheetConfigurada ? 'sim' : 'nao') +
    '\nGemini API: ' + (status.apiKeyConfigurada ? 'configurada' : 'nao configurada') +
    '\nAbas ausentes: ' +
    (status.abasObrigatoriasAusentes.length
      ? status.abasObrigatoriasAusentes.join(', ')
      : 'nenhuma') +
    (status.erroPlanilha ? '\nErro: ' + status.erroPlanilha : ''),
    SpreadsheetApp.getUi().ButtonSet.OK
  );

  return status;
}

function testarBackendWebAppMenu() {
  const result = executarDiagnosticoBackendWebApp_();

  SpreadsheetApp.getUi().alert(
    'Finance AI Lite v1.1 - Teste',
    (result.ok ? 'BACKEND OK' : 'BACKEND COM PENDENCIAS') +
    '\n\n' + result.mensagem,
    SpreadsheetApp.getUi().ButtonSet.OK
  );

  return result;
}

function executarDiagnosticoBackendWebApp_() {
  const status = obterStatusBackendWebApp();

  if (!status.ok) {
    return {
      ok: false,
      mensagem:
        'Planilha configurada: ' + (status.spreadsheetConfigurada ? 'sim' : 'nao') +
        '\nGemini API: ' + (status.apiKeyConfigurada ? 'sim' : 'nao') +
        '\nAbas ausentes: ' +
        (status.abasObrigatoriasAusentes.length
          ? status.abasObrigatoriasAusentes.join(', ')
          : 'nenhuma') +
        (status.erroPlanilha ? '\nErro: ' + status.erroPlanilha : ''),
      status: status
    };
  }

  try {
    const context = getFinanceContext_();

    return {
      ok: true,
      mensagem:
        'Planilha resolvida por ID, Gemini API configurada e contexto financeiro carregado. ' +
        'Contas ativas: ' + context.accounts.length +
        '. Cartoes ativos: ' + context.cards.length +
        '. Categorias: ' + context.categories.length + '.',
      status: status,
      contexto: {
        contasAtivas: context.accounts.length,
        cartoesAtivos: context.cards.length,
        categorias: context.categories.length
      }
    };
  } catch (e) {
    return {
      ok: false,
      mensagem:
        'A planilha foi localizada, mas o contexto financeiro nao pode ser carregado: ' +
        String(e && e.message ? e.message : e),
      status: status
    };
  }
}

function webRequestCacheKey_(requestId) {
  const clean = String(requestId || '')
    .trim()
    .replace(/[^a-zA-Z0-9_-]/g, '')
    .slice(0, 80);

  return clean ? 'FINWEB_' + clean : '';
}

function serializarParaWeb_(value) {
  if (value === null || value === undefined) {
    return value === undefined ? null : value;
  }

  if (value instanceof Date) {
    return value.toISOString();
  }

  if (Array.isArray(value)) {
    return value.map(serializarParaWeb_);
  }

  if (typeof value === 'object') {
    const result = {};
    Object.keys(value).forEach(key => {
      result[key] = serializarParaWeb_(value[key]);
    });
    return result;
  }

  return value;
}


function webSessionCacheKey_(sessionId) {
  const clean =
    String(
      sessionId || ''
    )
      .trim()
      .replace(
        /[^a-zA-Z0-9_-]/g,
        ''
      )
      .slice(
        0,
        80
      );

  return clean
    ? 'FINWEB_SESSION_' + clean
    : '';
}

function obterPendenciaWeb_(sessionId) {
  const key =
    webSessionCacheKey_(
      sessionId
    );

  if (!key) {
    return null;
  }

  const raw =
    CacheService
      .getScriptCache()
      .get(
        key
      );

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(
      raw
    );
  } catch (e) {
    return null;
  }
}

function salvarPendenciaWeb_(
  sessionId,
  pendencia
) {
  const key =
    webSessionCacheKey_(
      sessionId
    );

  if (
    !key ||
    !pendencia
  ) {
    return;
  }

  CacheService
    .getScriptCache()
    .put(
      key,
      JSON.stringify(
        pendencia
      ),
      900
    );
}

function limparPendenciaWeb_(
  sessionId
) {
  const key =
    webSessionCacheKey_(
      sessionId
    );

  if (!key) {
    return;
  }

  CacheService
    .getScriptCache()
    .remove(
      key
    );
}

function deveGuardarPendenciaWeb_(
  result
) {
  if (!result) {
    return false;
  }

  if (
    result.precisaRevisao ===
    true
  ) {
    return true;
  }

  const mensagem =
    normalizarTexto_(
      result.mensagem || ''
    );

  return (
    !result.ok &&
    (
      mensagem.includes(
        'qual conta'
      ) ||
      mensagem.includes(
        'qual cartao'
      ) ||
      mensagem.includes(
        'qual cartao foi'
      ) ||
      mensagem.includes(
        'qual conta foi'
      ) ||
      mensagem.includes(
        'informe a conta'
      ) ||
      mensagem.includes(
        'informe o cartao'
      )
    )
  );
}

function montarTextoComPendenciaWeb_(
  pendencia,
  resposta
) {
  return (
    String(
      pendencia.textoOriginal || ''
    ).trim() +
    '\n\nInformacao complementar do usuario para concluir o pedido anterior: ' +
    String(
      resposta || ''
    ).trim()
  );
}


function classificarNaturezaMensagemWeb_(texto, result) {
  if (
    result &&
    result.precisaConfirmacao ===
      true
  ) {
    return 'confirmacao';
  }

  if (
    result &&
    (
      result.precisaRevisao ===
        true ||
      result.ok === false
    )
  ) {
    return 'atencao';
  }

  const normalized =
    normalizarTexto_(
      texto || ''
    );

  const consultaPrefixes = [
    'como ',
    'quanto ',
    'qual ',
    'quais ',
    'liste ',
    'listar ',
    'mostre ',
    'mostrar ',
    'me de ',
    'me dê ',
    'resumo',
    'forecast',
    'previs',
    'diagnost',
    'onde estou',
    'onde gasto',
    'faturas',
    'assinaturas',
    'metas'
  ];

  if (
    consultaPrefixes.some(
      prefix =>
        normalized.startsWith(
          normalizarTexto_(
            prefix
          )
        )
    ) ||
    normalized.endsWith('?')
  ) {
    return 'consulta';
  }

  const actionTerms = [
    'gastei',
    'paguei',
    'recebi',
    'transferi',
    'comprei',
    'guardei',
    'apliquei',
    'aportei',
    'quero juntar',
    'cadastre',
    'cadastrar',
    'assino',
    'assinatura de',
    'todo dia',
    'todo mes',
    'todo mês',
    'mensalmente',
    'cancele',
    'cancelar',
    'pause',
    'pausar',
    'reative',
    'reativar',
    'altere',
    'alterar'
  ];

  if (
    actionTerms.some(
      term =>
        normalized.includes(
          normalizarTexto_(
            term
          )
        )
    )
  ) {
    return 'acao';
  }

  return 'resposta';
}

function labelNaturezaWeb_(natureza) {
  const labels = {
    consulta: 'Consulta',
    acao: 'Acao',
    confirmacao: 'Confirmacao',
    atencao: 'Atencao',
    resposta: 'Finance AI'
  };

  return (
    labels[
      natureza
    ] ||
    'Finance AI'
  );
}

function processarMensagemWeb(
  texto,
  requestId,
  sessionId
) {
  const inicio =
    Date.now();

  const mensagem =
    String(
      texto || ''
    ).trim();

  const sessao =
    String(
      sessionId || ''
    ).trim();

  if (!mensagem) {
    return {
      ok: false,
      codigo: 'EMPTY_MESSAGE',
      mensagem:
        'Digite uma mensagem antes de enviar.',
      requestId:
        String(
          requestId || ''
        ),
      sessionId:
        sessao,
      tempoMs:
        Date.now() -
        inicio
    };
  }

  if (
    mensagem.length >
    4000
  ) {
    return {
      ok: false,
      codigo: 'MESSAGE_TOO_LONG',
      mensagem:
        'A mensagem excede o limite de 4.000 caracteres.',
      requestId:
        String(
          requestId || ''
        ),
      sessionId:
        sessao,
      tempoMs:
        Date.now() -
        inicio
    };
  }

  getFinanceSpreadsheet_();

  const cache =
    CacheService
      .getScriptCache();

  const cacheKey =
    webRequestCacheKey_(
      requestId
    );

  if (cacheKey) {
    const previous =
      cache.get(
        cacheKey
      );

    if (previous) {
      try {
        const cached =
          JSON.parse(
            previous
          );

        cached.repetida =
          true;

        cached.tempoMs =
          Date.now() -
          inicio;

        return cached;
      } catch (e) {
        // Prossegue normalmente.
      }
    }
  }

  const lock =
    LockService
      .getScriptLock();

  if (
    !lock.tryLock(
      30000
    )
  ) {
    return {
      ok: false,
      codigo: 'BACKEND_BUSY',
      mensagem:
        'O Finance AI esta processando outra solicitacao. Tente novamente em alguns segundos.',
      requestId:
        String(
          requestId || ''
        ),
      sessionId:
        sessao,
      tempoMs:
        Date.now() -
        inicio
    };
  }

  try {
    if (cacheKey) {
      const previousAfterLock =
        cache.get(
          cacheKey
        );

      if (previousAfterLock) {
        try {
          const cached =
            JSON.parse(
              previousAfterLock
            );

          cached.repetida =
            true;

          cached.tempoMs =
            Date.now() -
            inicio;

          return cached;
        } catch (e) {
          // Prossegue normalmente.
        }
      }
    }

    const pendencia =
      obterPendenciaWeb_(
        sessao
      );

    let textoEfetivo =
      mensagem;

    if (
      pendencia &&
      normalizarTexto_(
        mensagem
      ) !==
        'cancelar'
    ) {
      textoEfetivo =
        montarTextoComPendenciaWeb_(
          pendencia,
          mensagem
        );
    }

    if (
      normalizarTexto_(
        mensagem
      ) ===
        'cancelar' &&
      pendencia
    ) {
      limparPendenciaWeb_(
        sessao
      );

      return {
        ok: true,
        codigo:
          'PENDING_CANCELLED',
        mensagem:
          'Pedido pendente cancelado.',
        canal:
          'web',
        requestId:
          String(
            requestId || ''
          ),
        sessionId:
          sessao,
        repetida:
          false,
        tempoMs:
          Date.now() -
          inicio
      };
    }

    let engineResult;

    try {
      engineResult =
        processarLancamento(
          textoEfetivo
        );
    } catch (e) {
      engineResult = {
        ok: false,
        codigo: 'ENGINE_ERROR',
        mensagem:
          'O Finance AI nao conseguiu processar a solicitacao.',
        detalhe:
          String(
            e &&
            e.message
              ? e.message
              : e
          )
      };
    }

    if (
      deveGuardarPendenciaWeb_(
        engineResult
      )
    ) {
      salvarPendenciaWeb_(
        sessao,
        {
          textoOriginal:
            pendencia
              ? pendencia
                  .textoOriginal
              : mensagem,
          ultimaPergunta:
            String(
              engineResult
                .mensagem || ''
            ),
          criadaEm:
            new Date()
              .toISOString()
        }
      );
    } else if (
      engineResult &&
      engineResult.ok
    ) {
      limparPendenciaWeb_(
        sessao
      );
    }

    const response =
      serializarParaWeb_(
        Object.assign(
          {},
          engineResult || {},
          {
            canal:
              'web',
            natureza:
              classificarNaturezaMensagemWeb_(
                textoEfetivo,
                engineResult
              ),
            rotulo:
              labelNaturezaWeb_(
                classificarNaturezaMensagemWeb_(
                  textoEfetivo,
                  engineResult
                )
              ),
            requestId:
              String(
                requestId || ''
              ),
            sessionId:
              sessao,
            contextoPendente:
              deveGuardarPendenciaWeb_(
                engineResult
              ),
            repetida:
              false,
            tempoMs:
              Date.now() -
              inicio
          }
        )
      );

    if (cacheKey) {
      try {
        const serialized =
          JSON.stringify(
            response
          );

        if (
          serialized.length <
          90000
        ) {
          cache.put(
            cacheKey,
            serialized,
            600
          );
        }
      } catch (e) {
        // Falha de cache nao invalida a operacao financeira.
      }
    }

    return response;
  } finally {
    lock.releaseLock();
  }
}

function abrirAssistente() {
  const html = HtmlService.createHtmlOutputFromFile('Sidebar')
    .setTitle('Finance AI Lite');
  SpreadsheetApp.getUi().showSidebar(html);
}

