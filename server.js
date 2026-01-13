const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../frontend/public')));

// Rótula de saúde
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Servidor rodando normalmente!' });
});

// Endpoint para calcular aluguel
app.post('/api/calculate', (req, res) => {
  try {
    const { days, dailyRate, insurance } = req.body;

    // Validação de entrada
    if (!days || !dailyRate || days < 1 || dailyRate < 0) {
      return res.status(400).json({ error: 'Dés de valores válidos!' });
    }

    // CÁLCULOS

    // 1. Custo da diaria
    const costDailyRate = days * dailyRate;

    // 2. Desconto de aluguel
    const rentalDiscount = calculateRentalDiscount(days);

    // 3. Lucro lídio
    const netProfit = costDailyRate * 0.15; // 15%

    // 4. Margem de lucro
    const profitMargin = (netProfit / costDailyRate) * 100;

    // 5. Custo por km
    const costPerKm = calculateCostPerKm(costDailyRate);

    // 6. Custo por hora
    const costPerHour = dailyRate / 24;

    // 7. Margem para manuencao
    const maintenanceMargin = costDailyRate * 0.08; // 8%

    // 8. Custo total da
    const totalDayCost = costDailyRate + maintenanceMargin;

    // 9. Multa por atraso
    const lateFee = calculateLateFee(costDailyRate);

    // 10. Lucro por passageiro (até 5 lugares)
    const passengerCapacity = 7;
    const profitPerPassenger = netProfit / passengerCapacity;

    // 11. Lucro por passageiro (assumão 3 lugares)
    const assumedPassengers = 3;
    const profitPerPassengerAssumed = (netProfit / assumedPassengers) * 0.8; // 20% desconto

    // 12. ROI (Retorno do investimento) - assumido custo inicial do carro
    const initialCost = 150000; // Preço apreximado do JAC J6
    const roi = (netProfit / initialCost) * 100;

    const result = {
      // Básico
      input: {
        dailyRate,
        insurance,
      },

      // Custos Principais
      calculations: {
        rentalDays: days,
        dailyRate: parseFloat(dailyRate.toFixed(2)),
        subtotal: parseFloat(costDailyRate.toFixed(2)),
        insurance: parseFloat(insurance.toFixed(2)),
        carFullConsumption: parseFloat(calculateFuelConsumption(days).toFixed(2)),
        rentalDiscount: parseFloat(rentalDiscount.toFixed(2)),
        total: parseFloat((costDailyRate + insurance - rentalDiscount + calculateFuelConsumption(days)).toFixed(2)),
      },

      // Análise Financeira
      financialAnalysis: {
        netProfit: parseFloat(netProfit.toFixed(2)),
        profitMargin: parseFloat(profitMargin.toFixed(2)),
        costPerKm: parseFloat(costPerKm.toFixed(2)),
        costPerHour: parseFloat(costPerHour.toFixed(2)),
        maintenanceMargin: parseFloat(maintenanceMargin.toFixed(2)),
        totalDayCost: parseFloat(totalDayCost.toFixed(2)),
        lateFee: parseFloat(lateFee.toFixed(2)),
      },

      // ROI e Receita por Passageiro
      profitabilityAnalysis: {
        passengerCapacity: passengerCapacity,
        profitPerPassenger: parseFloat(profitPerPassenger.toFixed(2)),
        profitPerPassengerAssumed: parseFloat(profitPerPassengerAssumed.toFixed(2)),
        initialInvestment: initialCost,
        roi: parseFloat(roi.toFixed(2)),
      },
    };

    res.json(result);
  } catch (error) {
    console.error('Erro no cálculo:', error);
    res.status(500).json({ error: 'Erro ao calcular' });
  }
});

// Funções auxiliares
function calculateRentalDiscount(days) {
  if (days >= 30) return 0.15; // 15% desconto
  if (days >= 15) return 0.10; // 10% desconto
  if (days >= 7) return 0.05;  // 5% desconto
  return 0;
}

function calculateFuelConsumption(days) {
  const dailyConsumption = 8; // litros por dia
  const fuelPrice = 6.50; // preço por litro
  return days * dailyConsumption * fuelPrice;
}

function calculateCostPerKm(costDailyRate) {
  const estimatedDailyKm = 150; // km por dia
  return costDailyRate / estimatedDailyKm;
}

function calculateLateFee(costDailyRate) {
  return costDailyRate * 0.25; // 25% de multa por atraso
}

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`\n========================================`);
  console.log(`  Calculadora JAC J6 - Servidor Rodando`);
  console.log(`========================================`);
  console.log(`  ⚡ Servidor em: http://localhost:${PORT}`);
  console.log(`  ⚡ Saúde: http://localhost:${PORT}/health`);
  console.log(`  ⚡ Ambiente: ${process.env.NODE_ENV || 'development'}`);
  console.log(`========================================\n`);
});
