// ==========================================================================
// InvestLab - Frontend JS
// Comunicação com Azure Functions (dados mock)
// ==========================================================================

function formatBRL(value) {
  return Number(value).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

// --------------------------------------------------------------------------
// TELA: Consulta de FII (GET /api/GetFii?ticker=XXXX)
// --------------------------------------------------------------------------
const fiiForm = document.getElementById("fii-form");

if (fiiForm) {
  fiiForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const tickerInput = document.getElementById("ticker-input");
    const statusEl = document.getElementById("fii-status");
    const resultEl = document.getElementById("fii-result");
    const ticker = tickerInput.value.trim().toUpperCase();

    resultEl.classList.add("hidden");
    statusEl.textContent = "Buscando dados...";
    statusEl.classList.remove("error");

    try {
      const response = await fetch(
        `${API_BASE_URL}/GetFii?ticker=${encodeURIComponent(ticker)}`
      );

      if (!response.ok) {
        throw new Error(`Erro na API: ${response.status}`);
      }

      const data = await response.json();

      document.getElementById("fii-nome").textContent = data.nome;
      document.getElementById("fii-ticker").textContent = data.ticker;
      document.getElementById("fii-cotacao").textContent = formatBRL(data.cotacao);
      document.getElementById("fii-dy").textContent = `${data.dividendYield12m}%`;
      document.getElementById("fii-pvp").textContent = data.pvp;
      document.getElementById("fii-rendimento").textContent = formatBRL(
        data.ultimoRendimento
      );
      document.getElementById("fii-patrimonio").textContent = formatBRL(
        data.patrimonio
      );
      document.getElementById("fii-volatilidade").textContent = `${data.volatilidade}%`;

      resultEl.classList.remove("hidden");
      statusEl.textContent = "";
    } catch (err) {
      console.error(err);
      statusEl.textContent =
        "Não foi possível buscar os dados. Verifique se a Azure Function está publicada e o ticker informado.";
      statusEl.classList.add("error");
    }
  });
}

// --------------------------------------------------------------------------
// TELA: Simulador de Investimentos (GET /api/GetSimulacao?...)
// --------------------------------------------------------------------------
const simForm = document.getElementById("sim-form");

if (simForm) {
  simForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const inicial = document.getElementById("sim-inicial").value;
    const aporte = document.getElementById("sim-aporte").value;
    const horizonte = document.getElementById("sim-horizonte").value;

    const statusEl = document.getElementById("sim-status");
    const resultEl = document.getElementById("sim-result");

    resultEl.classList.add("hidden");
    statusEl.textContent = "Calculando simulação...";
    statusEl.classList.remove("error");

    try {
      const params = new URLSearchParams({
        inicial,
        aporte,
        horizonte,
      });

      const response = await fetch(`${API_BASE_URL}/GetSimulacao?${params}`);

      if (!response.ok) {
        throw new Error(`Erro na API: ${response.status}`);
      }

      const data = await response.json();

      document.getElementById("sim-conservador").textContent = formatBRL(
        data.cenarios.conservador
      );
      document.getElementById("sim-base").textContent = formatBRL(
        data.cenarios.base
      );
      document.getElementById("sim-otimista").textContent = formatBRL(
        data.cenarios.otimista
      );
      document.getElementById("sim-aportado").textContent = formatBRL(
        data.totalAportado
      );

      resultEl.classList.remove("hidden");
      statusEl.textContent = "";
    } catch (err) {
      console.error(err);
      statusEl.textContent =
        "Não foi possível calcular a simulação. Verifique se a Azure Function está publicada.";
      statusEl.classList.add("error");
    }
  });
}
