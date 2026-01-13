import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [days, setDays] = useState(1);
  const [dailyRate, setDailyRate] = useState(150);
  const [insurance, setInsurance] = useState(0);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCalculate = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/calculate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          days,
          dailyRate,
          insurance,
        }),
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Erro ao calcular:', error);
      alert('Erro ao comunicar com o servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="calculator">
        <h1>Calculadora de Aluguel - JAC J6</h1>
        
        <div className="input-group">
          <label htmlFor="days">
            Numero de Dias:
          </label>
          <input
            id="days"
            type="number"
            min="1"
            value={days}
            onChange={(e) => setDays(parseInt(e.target.value) || 0)}
          />
        </div>

        <div className="input-group">
          <label htmlFor="dailyRate">
            Valor da Diaria (R$):
          </label>
          <input
            id="dailyRate"
            type="number"
            min="0"
            step="0.01"
            value={dailyRate}
            onChange={(e) => setDailyRate(parseFloat(e.target.value) || 0)}
          />
        </div>

        <div className="input-group">
          <label htmlFor="insurance">
            Valor do Seguro (R$):
          </label>
          <input
            id="insurance"
            type="number"
            min="0"
            step="0.01"
            value={insurance}
            onChange={(e) => setInsurance(parseFloat(e.target.value) || 0)}
          />
        </div>

        <button 
          onClick={handleCalculate} 
          disabled={loading}
          className="calculate-btn"
        >
          {loading ? 'Calculando...' : 'CALCULAR'}
        </button>

        {result && (
          <div className="result">
            <h2>Resultados:</h2>
            
            <div className="result-section">
              <h3>Calculos Basicos</h3>
              <div className="result-item">
                <span>Dias de Aluguel:</span>
                <span>{result.calculations?.rentalDays || 0} dias</span>
              </div>
              <div className="result-item">
                <span>Valor da Diaria:</span>
                <span>R$ {result.calculations?.dailyRate?.toFixed(2) || '0.00'}</span>
              </div>
              <div className="result-item">
                <span>Subtotal:</span>
                <span>R$ {result.calculations?.subtotal?.toFixed(2) || '0.00'}</span>
              </div>
              <div className="result-item">
                <span>Seguro:</span>
                <span>R$ {result.calculations?.insurance?.toFixed(2) || '0.00'}</span>
              </div>
              <div className="result-item">
                <span>Consumo de Combustivel:</span>
                <span>R$ {result.calculations?.carFullConsumption?.toFixed(2) || '0.00'}</span>
              </div>
              <div className="result-item">
                <span>Desconto de Aluguel:</span>
                <span>-R$ {result.calculations?.rentalDiscount?.toFixed(2) || '0.00'}</span>
              </div>
              <div className="result-item total">
                <span>TOTAL:</span>
                <span>R$ {result.calculations?.total?.toFixed(2) || '0.00'}</span>
              </div>
            </div>

            {result.financialAnalysis && (
              <div className="result-section">
                <h3>Analise Financeira</h3>
                <div className="result-item">
                  <span>Lucro Liquido:</span>
                  <span>R$ {result.financialAnalysis.netProfit?.toFixed(2) || '0.00'}</span>
                </div>
                <div className="result-item">
                  <span>Margem de Lucro:</span>
                  <span>{result.financialAnalysis.profitMargin?.toFixed(2) || '0.00'}%</span>
                </div>
                <div className="result-item">
                  <span>Custo por KM:</span>
                  <span>R$ {result.financialAnalysis.costPerKm?.toFixed(2) || '0.00'}</span>
                </div>
                <div className="result-item">
                  <span>Custo por Hora:</span>
                  <span>R$ {result.financialAnalysis.costPerHour?.toFixed(2) || '0.00'}</span>
                </div>
                <div className="result-item">
                  <span>Margem para Manutencao:</span>
                  <span>R$ {result.financialAnalysis.maintenanceMargin?.toFixed(2) || '0.00'}</span>
                </div>
                <div className="result-item">
                  <span>Custo Total Diario:</span>
                  <span>R$ {result.financialAnalysis.totalDayCost?.toFixed(2) || '0.00'}</span>
                </div>
                <div className="result-item">
                  <span>Multa por Atraso (25%):</span>
                  <span>R$ {result.financialAnalysis.lateFee?.toFixed(2) || '0.00'}</span>
                </div>
              </div>
            )}

            {result.profitabilityAnalysis && (
              <div className="result-section">
                <h3>Analise de Rentabilidade</h3>
                <div className="result-item">
                  <span>Capacidade do Veiculo:</span>
                  <span>{result.profitabilityAnalysis.passengerCapacity || 0} passageiros</span>
                </div>
                <div className="result-item">
                  <span>Lucro por Passageiro (Cap. Cheia):</span>
                  <span>R$ {result.profitabilityAnalysis.profitPerPassenger?.toFixed(2) || '0.00'}</span>
                </div>
                <div className="result-item">
                  <span>Lucro por Passageiro (60%):</span>
                  <span>R$ {result.profitabilityAnalysis.profitPerPassengerAssumed?.toFixed(2) || '0.00'}</span>
                </div>
                <div className="result-item">
                  <span>Investimento Inicial (JAC J6):</span>
                  <span>R$ {(result.profitabilityAnalysis.initialInvestment || 0).toLocaleString('pt-BR')}</span>
                </div>
                <div className="result-item highlight">
                  <span>ROI (Retorno do Investimento):</span>
                  <span>{result.profitabilityAnalysis.roi?.toFixed(4) || '0.00'}%</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
