// server.js
const app = require('./app/app');
const dotenv = require('dotenv');

// Carregar variáveis de ambiente
dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
