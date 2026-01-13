const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'build')));

// Dados padrão do carro
const carData = {
  model: 'JAC J6',
  fuelConsumption: 9.5, // km/L
  defaultDailyRate: 150, // R$
};

// Endpoint para calcular aluguel
app.post('/api/calculate', (req, res) => {
  try {
    const {
      distance = 350,
      fuelPrice = 6.175,
      rentalDays = 20,
      dailyRate = carData.defaultDailyRate,
    } = req.body;

    // Validar inputs
    if (distance <= 0 || fuelPrice <= 0 || rentalDays <= 0 || dailyRate <= 0) {
      return res.status(400).json({ error: 'Todos os valores devem ser maiores que 0' });
    }

    // CÁLCULOS
    
    // 1. Custo do combustível
    const literalsNeeded = distance / carData.fuelConsumption;
    const fuelCost = literalsNeeded * fuelPrice;

    // 2. Receita do aluguel
    const rentalRevenue = rentalDays * dailyRate;

    // 3. Lucro líquido
    const netProfit = rentalRevenue - fuelCost;

    // 4. Margem de lucro
    const profitMargin = rentalRevenue > 0 ? (netProfit / rentalRevenue) * 100 : 0;

    // 5. Custo por km
    const costPerKm = distance > 0 ? fuelCost / distance : 0;

    // 6. Receita por km
    const revenuePerKm = distance > 0 ? rentalRevenue / distance : 0;

    // 7. Lucro por km
    const profitPerKm = distance > 0 ? netProfit / distance : 0;

    // 8. Custo por dia
    const costPerDay = rentalDays > 0 ? fuelCost / rentalDays : 0;

    // 9. Receita por dia
    const revenuePerDay = dailyRate;

    // 10. Lucro por dia
    const profitPerDay = rentalDays > 0 ? netProfit / rentalDays : 0;

    // 11. Lucro por passageiro (assumindo 7 lugares)
    const passengerCapacity = 7;
    const profitPerPassenger = passengerCapacity > 0 ? netProfit / passengerCapacity : 0;

    // 12. ROI (Return on Investment) - assumindo custo inicial do carro
    const initialCost = 180000; // Preço aproximado da JAC J6
    const roi = initialCost > 0 ? (netProfit / initialCost) * 100 : 0;

    const result = {
      inputs: {
        distance,
        fuelPrice,
        carFuelConsumption: carData.fuelConsumption,
        rentalDays,
        dailyRate,
        carModel: carData.model,
      },
      expenses: {
        literalsNeeded: parseFloat(literalsNeeded.toFixed(2)),
        fuelCost: parseFloat(fuelCost.toFixed(2)),
      },
      revenue: {
        rentalRevenue: parseFloat(rentalRevenue.toFixed(2)),
      },
      profitability: {
        netProfit: parseFloat(netProfit.toFixed(2)),
        profitMargin: parseFloat(profitMargin.toFixed(2)),
        roi: parseFloat(roi.toFixed(2)),
      },
      metrics: {
        costPerKm: parseFloat(costPerKm.toFixed(2)),
        revenuePerKm: parseFloat(revenuePerKm.toFixed(2)),
        profitPerKm: parseFloat(profitPerKm.toFixed(2)),
        costPerDay: parseFloat(costPerDay.toFixed(2)),
        revenuePerDay: parseFloat(revenuePerDay.toFixed(2)),
        profitPerDay: parseFloat(profitPerDay.toFixed(2)),
        profitPerPassenger: parseFloat(profitPerPassenger.toFixed(2)),
      },
    };

    res.json(result);
  } catch (error) {
    console.error('Erro no cálculo:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Endpoint para dados padrão
app.get('/api/defaults', (req, res) => {
  res.json(carData);
});

// Para produção: servir React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
