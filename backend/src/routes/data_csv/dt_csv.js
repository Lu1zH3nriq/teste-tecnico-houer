const express = require('express');
const router = express.Router();
const dataCsvController = require('../../controllers/dataCsvController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });


/**
 * @swagger
 * /api/data/upload:
 *   post:
 *     summary: Faz upload de um arquivo CSV
 *     description: Recebe um arquivo CSV, valida e processa o conteúdo.
 *     tags:
 *       - CSV
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Upload realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 */
router.post('/upload', upload.single('file'), dataCsvController.uploadCsv);

module.exports = router;