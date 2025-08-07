const express = require('express');
const app = express();
const { swaggerUi, swaggerSpec } = require('../config/swagger');

const DataCsvRoutes = require("../routes/data_csv/dt_csv");
const OperationsDataCsv = require('../routes/operations_data_csv/operationDataCsv')

app.use(express.json());
app.use('/docs/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/data', DataCsvRoutes);
app.use('/api/operations',OperationsDataCsv);



module.exports = app;