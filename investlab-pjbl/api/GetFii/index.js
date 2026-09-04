// ==========================================================================
// Azure Function: GetFii
// Método: GET
// Rota: /api/GetFii?ticker=MXRF11
// Retorna dados MOCK de um Fundo Imobiliário.
// ==========================================================================

const FIIS_MOCK = {
  MXRF11: {
    ticker: "MXRF11",
    nome: "Maxi Renda FII",
    cotacao: 10.42,
    dividendYield12m: 12.8,
    pvp: 0.98,
    ultimoRendimento: 0.11,
    patrimonio: 2850000000,
    volatilidade: 6.4,
  },
  HGLG11: {
    ticker: "HGLG11",
    nome: "CSHG Logística FII",
    cotacao: 162.35,
    dividendYield12m: 8.9,
    pvp: 1.02,
    ultimoRendimento: 1.1,
    patrimonio: 4650000000,
    volatilidade: 9.1,
  },
  KNRI11: {
    ticker: "KNRI11",
    nome: "Kinea Renda Imobiliária FII",
    cotacao: 148.9,
    dividendYield12m: 7.6,
    pvp: 0.95,
    ultimoRendimento: 0.85,
    patrimonio: 5100000000,
    volatilidade: 7.8,
  },
};

module.exports = async function (context, req) {
  const ticker = (req.query.ticker || "").toUpperCase();

  if (!ticker) {
    context.res = {
      status: 400,
      body: { erro: "Informe o parâmetro 'ticker'. Ex: ?ticker=MXRF11" },
    };
    return;
  }

  const fundo = FIIS_MOCK[ticker];

  if (!fundo) {
    context.res = {
      status: 404,
      body: {
        erro: `Fundo '${ticker}' não encontrado no mock.`,
        tickersDisponiveis: Object.keys(FIIS_MOCK),
      },
    };
    return;
  }

  context.res = {
    status: 200,
    headers: { "Content-Type": "application/json" },
    body: fundo,
  };
};
