# Guia de Instalação Local - Calculadora JAC J6

## Pre-requisitos

Certifique-se de ter instalado no seu computador:

1. **Node.js** (v14 ou superior)
   - Download: https://nodejs.org/
   - Verifique com: `node --version`
   - Verifique npm com: `npm --version`

2. **Git** (para clonar o repositório)
   - Download: https://git-scm.com/
   - Verifique com: `git --version`

## Passo 1: Clonar o Repositório

Abra seu terminal/prompt de comando e execute:

```bash
git clone https://github.com/CarlosBononi/jac-j6-rental-calculator.git
cd jac-j6-rental-calculator
```

## Passo 2: Instalar Dependências do Backend

```bash
npm install
```

Isso vai instalar: Express, CORS, dotenv, nodemon

## Passo 3: Criar Arquivo .env

Na raiz do projeto, crie um arquivo chamado `.env` com o seguinte conteúdo:

```
PORT=5000
NODE_ENV=development
REACT_APP_API_URL=http://localhost:5000
```

## Passo 4: Iniciar o Backend

No terminal, execute:

```bash
npm start
```

Você deve ver:
```
Servidor rodando em http://localhost:5000
```

Mantenha este terminal aberto.

## Passo 5: Instalar Dependências do Frontend (Nova aba do terminal)

Abra um NOVO terminal/prompt na mesma pasta e execute:

```bash
cd frontend
npm install
```

## Passo 6: Iniciar o Frontend React

No mesmo terminal de frontend, execute:

```bash
npm start
```

Isso vai abrir automaticamente: `http://localhost:3000`

Você verá a calculadora funcionando!

## Testando a Calculadora

Preencha os campos:
- **Distãncia Total (km)**: 350
- **Preço do Combustível (R$/L)**: 6.175
- **Dias de Aluguel**: 20
- **Valor da Diária (R$)**: 150

Clique em "Calcular" e você verá todos os cálculos automaticamente!

## Solucionando Problemas

### Porta 5000 já em uso

Mude a porta no arquivo `.env`:
```
PORT=3001
```

E na paágina React, mude `.env` para:
```
REACT_APP_API_URL=http://localhost:3001
```

### npm: comando não encontrado

Node.js não está instalado. Instale em: https://nodejs.org/

### git: comando não encontrado

Git não está instalado. Instale em: https://git-scm.com/

### EACCES permission denied (no Linux/Mac)

Execute com sudo:
```bash
sudo npm install
```

## Estrutura de Pastas

```
jac-j6-rental-calculator/
├─ server.js           # Backend principal
├─ package.json        # Dependências backend
├─ .env.example        # Exemplo de variáveis
├─ README.md           # Documentação principal
├─ SETUP-LOCAL.md      # Este arquivo
├─ frontend/
│  ├─ src/
│  │  ├─ App.jsx        # Componente principal React
│  │  ├─ App.css        # Estilos
│  │  └─ index.js
│  ├─ package.json    # Dependências frontend
│  └─ public/
└─ build/              # Pasta gerada após npm run build
```

## Proximos Passos

1. **Personalizar**: Abra `server.js` e customize os cálculos conforme necessário

2. **Deploy**: Quando estiver pronto, publique em:
   - Frontend: Vercel, Netlify
   - Backend: Railway, Heroku

3. **Melhorias**: Adicione gráficos, exportação de relatórios, etc.

## Parar a Aplicação

Para parar ambos os servidores:
- Pressione `Ctrl + C` em cada terminal

---

**Pronto!** Você agora tem a calculadora rodando localmente. Aproveite! 🚀
