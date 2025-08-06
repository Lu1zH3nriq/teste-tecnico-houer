// app.js
const express = require('express');
const app = express();
const routes = require('../routes');
const { swaggerUi, swaggerSpec } = require('../config/swagger'); // Importação do Swagger

// Middleware global
app.use(express.json());

// Middleware para Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rotas principais
app.use('/api', routes);

module.exports = app;