# InvestLab — Atividade PJBL

Frontend estático (HTML/CSS/JS puro) que se comunica com Azure Functions
(mock backend), como parte do projeto InvestLab: plataforma de
inteligência, comparação e simulação de investimentos.

## 🔗 Links do projeto

- **Site publicado (Azure Static Web Apps):** `<COLAR_AQUI_A_URL_DO_SITE>`
- **Azure Function (se publicada separadamente):** `<COLAR_AQUI_A_URL_DA_FUNCTION_APP>`
- **Repositório GitHub:** https://github.com/LuanEstevinho/arquitetura
- **Mock/Apidog (se utilizado):** `<COLAR_AQUI_O_ENDEREÇO_DO_MOCK_NO_APIDOG>`

> ⚠️ Preencher os links acima após a publicação.

## 🧩 Funcionalidades

1. **Consulta de FII** (`frontend/fii.html`)
   Busca um ticker de fundo imobiliário (ex.: `MXRF11`, `HGLG11`, `KNRI11`)
   e exibe cotação, dividend yield, P/VP, último rendimento, patrimônio e
   volatilidade. Consome `GET /api/GetFii?ticker=...`.

2. **Simulador de Investimentos** (`frontend/simulador.html`)
   Recebe patrimônio inicial, aporte mensal e horizonte (em anos) e
   retorna uma projeção em três cenários (conservador, base, otimista).
   Consome `GET /api/GetSimulacao?inicial=...&aporte=...&horizonte=...`.

Ambos os endpoints retornam **dados mock** (não há integração real com
B3, CVM ou Banco Central nesta atividade).

## 📁 Estrutura do repositório

```
investlab-pjbl/
├── frontend/              # App estático (HTML/CSS/JS)
│   ├── index.html
│   ├── fii.html
│   ├── simulador.html
│   ├── css/style.css
│   └── js/
│       ├── config.js      # URL base da API
│       └── app.js         # Lógica de chamadas à API
├── api/                    # Azure Functions (mock)
│   ├── GetFii/
│   ├── GetSimulacao/
│   ├── host.json
│   └── package.json
├── .github/workflows/       # Deploy automático (GitHub Actions)
├── GRUPO.md
├── Prompt.md
└── README.md
```

## ▶️ Rodando localmente

### Frontend
Basta abrir `frontend/index.html` no navegador, ou servir a pasta com
qualquer servidor estático (ex.: extensão "Live Server" do VS Code).

### Azure Functions (API)
Requer [Azure Functions Core Tools](https://learn.microsoft.com/azure/azure-functions/functions-run-local) e Node.js instalados.

```bash
cd api
npm install
func start
```
A API sobe por padrão em `http://localhost:7071/api/...`.

> Para testar o frontend consumindo a API local, altere temporariamente
> `API_BASE_URL` em `frontend/js/config.js` para
> `http://localhost:7071/api`.

## ☁️ Publicando no Azure Static Web Apps

1. Suba este repositório para o GitHub.
2. No [Portal Azure](https://portal.azure.com), crie um recurso
   **Static Web App**.
3. Conecte ao repositório GitHub e configure:
   - **App location:** `/frontend`
   - **Api location:** `/api`
   - **Output location:** (deixar em branco)
4. O Azure cria automaticamente um workflow do GitHub Actions
   (já incluso em `.github/workflows/azure-static-web-apps.yml`) que
   builda e publica o site a cada push na branch `main`.
5. Após o deploy, copie a URL gerada (formato
   `https://<nome>.azurestaticapps.net`) e cole na seção
   [🔗 Links do projeto](#-links-do-projeto) acima.

Com a API publicada junto ao Static Web App (pasta `/api`), o frontend
já consome os endpoints automaticamente via `/api/...` (proxy interno do
Azure Static Web Apps), sem necessidade de configurar CORS.

## 🧪 Mock com Apidog (opcional)

Caso o grupo opte por usar o [Apidog](https://apidog.com/pt-BR/) para
mockar os endpoints em vez das Azure Functions locais deste repositório,
basta:
1. Criar os endpoints `GET /GetFii` e `GET /GetSimulacao` no Apidog Mock.
2. Copiar a URL de mock gerada.
3. Colar em `API_BASE_URL` (`frontend/js/config.js`).
4. Informar o endereço do mock na seção de links deste README.

## 👥 Grupo

Ver [GRUPO.md](./GRUPO.md).

## 🤖 Uso de IA Generativa

Ver [Prompt.md](./Prompt.md) para o prompt utilizado na geração do
frontend e das Azure Functions.
