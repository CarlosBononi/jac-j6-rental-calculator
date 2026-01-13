# Calculadora de Aluguel - JAC J6

Aplicativo web interativo para calcular a rentabilidade do aluguel de carro JAC J6. Construído com React, Node.js e Express.

## Features

- 📊 Cálculos automáticos de receita, despesa e lucro
- 🎯 Métricas de rentabilidade por km e por dia
- 💰 Análise de margem de lucro
- 🔄 Interface reativa com atualizações em tempo real
- 📱 Design responsivo
- 🌐 API REST com Node.js/Express

## Requisitos

- Node.js (v14+)
- npm ou yarn

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/CarlosBononi/jac-j6-rental-calculator.git
cd jac-j6-rental-calculator
```

2. Instale as dependências do backend:
```bash
npm install
```

3. Instale as dependências do frontend:
```bash
cd frontend
npm install
```

## Desenvolvimento

### Backend
```bash
node server.js
# ou com nodemon para desenvolvimento:
npm run dev
```
O servidor estará disponível em `http://localhost:5000`

### Frontend
```bash
cd frontend
npm start
```
O aplicativo estará disponível em `http://localhost:3000`

## Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:
```
PORT=5000
NODE_ENV=development
```

## Produção

### Build Frontend
```bash
cd frontend
npm run build
```

### Deploy com Vercel

#### Frontend
```bash
cd frontend
npm install -g vercel
vercel --prod
```

#### Backend
Deploy em Railway, Heroku ou similar que suporte Node.js

## API Endpoints

### POST /api/calculate
Calcula a rentabilidade com base nos parâmetros fornecidos.

**Request Body:**
```json
{
  "distance": 350,
  "fuelPrice": 6.175,
  "rentalDays": 20,
  "dailyRate": 150
}
```

**Response:**
```json
{
  "inputs": {...},
  "expenses": {...},
  "revenue": {...},
  "profitability": {...},
  "metrics": {...}
}
```

### GET /api/defaults
Retorna os valores padrão do carro.

## Tecnologias

- **Frontend**: React, CSS3
- **Backend**: Node.js, Express
- **API**: REST com CORS habilitado

## Autor

Carlos Bononi

## License

MIT
