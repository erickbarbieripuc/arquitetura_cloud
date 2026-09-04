// ==========================================================================
// CONFIGURAÇÃO DA API
// ==========================================================================
// Quando publicado no Azure Static Web Apps com a API integrada (pasta /api),
// use o caminho relativo abaixo: o Static Web Apps faz o proxy automático
// para as Azure Functions em "/api/...".
//
// Se a Azure Function estiver publicada separadamente (Function App próprio),
// troque API_BASE_URL pela URL completa, por exemplo:
// const API_BASE_URL = "https://investlab-func.azurewebsites.net/api";
// ==========================================================================

const API_BASE_URL = "/api";
