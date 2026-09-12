// ===================================================================
// FINANCE AI LITE v1.2
// WEB APP ENTRY POINT
// ===================================================================

function doGet() {
  const template =
    HtmlService.createTemplateFromFile(
      'Index'
    );

  template.appVersion =
    FINANCE_AI.VERSION;

  return template
    .evaluate()
    .setTitle(
      'Finance AI Lite'
    )
    .addMetaTag(
      'viewport',
      'width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover'
    );
}

function include_(filename) {
  return HtmlService
    .createHtmlOutputFromFile(
      filename
    )
    .getContent();
}

function obterBootstrapWebApp() {
  const status =
    obterStatusBackendWebApp();

  return {
    ok:
      status.ok,
    app: {
      nome:
        'Finance AI Lite',
      versao:
        FINANCE_AI.VERSION,
      modelo:
        FINANCE_AI.MODEL
    },
    backend: {
      pronto:
        status.ok,
      planilha:
        status.spreadsheetName || '',
      apiKeyConfigurada:
        status.apiKeyConfigurada,
      abasAusentes:
        status.abasObrigatoriasAusentes || [],
      erro:
        status.erroPlanilha || ''
    }
  };
}
