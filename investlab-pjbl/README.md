# Projeto PJBL - InvestLab

Aplicação web desenvolvida com HTML, CSS e JavaScript para consulta de fundos imobiliários e simulação de investimentos. As funcionalidades consomem Azure Functions com dados mockados.

## Integrantes

-  Arthur Ambrozewicz Cidral
-  Erick Marlon Barbieri da Silva
-  Luan Alberti Estevinho
-  Vinícius de Oliveira Garcia

## Site publicado (Azure Static Web Apps)

https://lively-glacier-005615010.5.azurestaticapps.net/

## Endpoints das Azure Functions

* Simulação em produção:
  https://lively-glacier-005615010.5.azurestaticapps.net/api/GetSimulacao?inicial=10000&aporte=800&horizonte=20

* Consulta de FIIs em produção:
  https://lively-glacier-005615010.5.azurestaticapps.net/api/GetFii

* Simulação local:
  `http://localhost:7071/api/GetSimulacao?inicial=10000&aporte=800&horizonte=20`

* Consulta de FIIs local:
  `http://localhost:7071/api/GetFii`

## Repositório

https://github.com/erickbarbieripuc/arquitetura_cloud

## Mock via Apidog

Não utilizado. Os dados mockados foram disponibilizados diretamente pelas Azure Functions localizadas na pasta `/api`.
