const express = require('express');
const cors = require('cors');
const app = express();
const { swaggerUi, swaggerSpec } = require('../config/swagger');
const authMiddleware = require('../middlewares/authMiddleware');



const DataCsvRoutes = require("../routes/data_csv/dt_csv");
const OperationsDataCsv = require('../routes/operations_data_csv/operationDataCsv');
const Users = require('../routes/auth/auth');


app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));


app.use(express.json());
app.use('/docs/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.use('/api/auth', Users);
app.use('/api/data', authMiddleware, DataCsvRoutes); 
app.use('/api/operations', authMiddleware, OperationsDataCsv);



module.exports = app;