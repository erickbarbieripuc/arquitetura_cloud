# Prompt.md — Uso de IA Generativa (IAG)

Este projeto foi desenvolvido com apoio de IA generativa (Claude, da Anthropic) para acelerar a criação do frontend, das Azure Functions mock e da documentação.

## Prompt utilizado para gerar o frontend

```
Preciso realizar essa atividade:

- Em grupo PJBL, alunos criam frontend que se comunica com azure functions e mock backend.
- No mínimo duas funcionalidades/telas do projeto PJBL.
- No repo deve conter um arquivo GRUPO.md com o nome dos alunos.
- Comunicação do frontend com pelo menos 1 endpoint GET de Azure Functions
  (utilizar dados mock).
- Utilizar IAG, informando no arquivo Prompt.md qual o prompt utilizado
  para gerar o frontend.
- Publicar no Azure Static Web Apps.
- No README.md deve conter o endereço do site criado no Azure Static Web Apps.

O tema do projeto PJBL é o InvestLab: uma plataforma web de inteligência,
comparação e simulação de investimentos (FIIs, ações e renda fixa). Gere um
frontend em HTML/CSS/JS puro com duas telas:
1. Consulta de FII — buscar um ticker (ex: MXRF11) e exibir cotação,
   dividend yield, P/VP, patrimônio e volatilidade.
2. Simulador de Investimentos — informar patrimônio inicial, aporte mensal
   e horizonte, e retornar uma projeção em três cenários (conservador,
   base, otimista).

Ambas as telas devem consumir endpoints GET de Azure Functions com dados
mock, seguindo visual limpo e consistente com o tema financeiro do
InvestLab.
```

## O que a IA gerou

- Estrutura do frontend (`/frontend`): `index.html`, `fii.html`,
  `simulador.html`, `css/style.css`, `js/app.js`, `js/config.js`.
- Duas Azure Functions HTTP GET com dados mock (`/api/GetFii` e
  `/api/GetSimulacao`), incluindo `function.json`, `host.json` e
  `package.json`.
- Workflow do GitHub Actions para deploy automático no Azure Static Web
  Apps (`.github/workflows/azure-static-web-apps.yml`).
- Arquivos de documentação: `GRUPO.md`, `README.md` e este `Prompt.md`.

## Ajustes manuais feitos pelo grupo

> Preencher aqui, se houver: ajustes de estilo, novos tickers no mock,
> textos alterados, correções de bugs, etc.
