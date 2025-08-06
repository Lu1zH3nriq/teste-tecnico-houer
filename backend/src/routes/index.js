// index.js
const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /api/:
 *   get:
 *     summary: Teste da API
 *     description: Retorna uma mensagem indicando que a API está funcionando.
 *     responses:
 *       200:
 *         description: Sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: API funcionando!
 */
router.get('/', (req, res) => {
  res.send('API funcionando!');
});

module.exports = router;
