const dotenv = require('dotenv');
dotenv.config();

const app = require('./app/app');
const sequelize = require('./config/db/dbConfig');
const School = require('./models/School');

sequelize.authenticate()
  .then(() => { console.log('Banco conectado!') })
  .catch((error) => { console.log('Erro ao conectar no banco: ', error) });

sequelize.sync()
  .then(() => { console.log("Modelos Sincronizado") })
  .catch((error) => { console.log("Erro ao sincronizar modelos: ", error) });

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});