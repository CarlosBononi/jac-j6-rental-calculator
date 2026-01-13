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
            Número de Dias:
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
            Valor da Diária (R$):
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
          {loading ? 'Calculando...' : 'Calcular'}
        </button>

        {result && (
          <div className="result">
            <h2>Resultado:</h2>
            <div className="result-item">
              <span>Subtotal (Diária × Dias):</span>
              <span>R$ {result.subtotal?.toFixed(2) || '0.00'}</span>
            </div>
            <div className="result-item">
              <span>Seguro:</span>
              <span>R$ {result.insurance?.toFixed(2) || '0.00'}</span>
            </div>
            <div className="result-item total">
              <span>Total:</span>
              <span>R$ {result.total?.toFixed(2) || '0.00'}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
