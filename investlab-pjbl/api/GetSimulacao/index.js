// ==========================================================================
// Azure Function: GetSimulacao
// Método: GET
// Rota: /api/GetSimulacao?inicial=10000&aporte=800&horizonte=20
// Retorna uma projeção MOCK (conservador / base / otimista) mês a mês,
// simplificada com juros compostos.
// ==========================================================================

const TAXAS_ANUAIS = {
  conservador: 0.07,
  base: 0.1,
  otimista: 0.13,
};

function projetarPatrimonio(inicial, aporteMensal, meses, taxaAnual) {
  const taxaMensal = Math.pow(1 + taxaAnual, 1 / 12) - 1;
  let patrimonio = inicial;

  for (let i = 0; i < meses; i++) {
    patrimonio = patrimonio * (1 + taxaMensal) + aporteMensal;
  }

  return Math.round(patrimonio * 100) / 100;
}

module.exports = async function (context, req) {
  const inicial = parseFloat(req.query.inicial);
  const aporte = parseFloat(req.query.aporte);
  const horizonteAnos = parseInt(req.query.horizonte, 10);

  if (
    isNaN(inicial) ||
    isNaN(aporte) ||
    isNaN(horizonteAnos) ||
    inicial < 0 ||
    aporte < 0 ||
    horizonteAnos <= 0
  ) {
    context.res = {
      status: 400,
      body: {
        erro:
          "Parâmetros inválidos. Use ?inicial=NUMERO&aporte=NUMERO&horizonte=ANOS",
      },
    };
    return;
  }

  const meses = horizonteAnos * 12;
  const totalAportado = inicial + aporte * meses;

  const cenarios = {
    conservador: projetarPatrimonio(
      inicial,
      aporte,
      meses,
      TAXAS_ANUAIS.conservador
    ),
    base: projetarPatrimonio(inicial, aporte, meses, TAXAS_ANUAIS.base),
    otimista: projetarPatrimonio(
      inicial,
      aporte,
      meses,
      TAXAS_ANUAIS.otimista
    ),
  };

  context.res = {
    status: 200,
    headers: { "Content-Type": "application/json" },
    body: {
      parametros: { inicial, aporte, horizonteAnos },
      totalAportado,
      cenarios,
      aviso: "Simulação != previsão. Baseado em premissas de cenário (mock).",
    },
  };
};
