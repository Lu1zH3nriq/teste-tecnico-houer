const express = require('express');
const router = express.Router();
const OperationsDataCsvController = require('../../controllers/operationsDataCsvController');


//Create
/**
 * @swagger
 * /api/operations/listData:
 *   get:
 *     summary: Lista registros de escolas de forma paginada
 *     description: Retorna uma lista paginada de escolas
 *     tags:
 *       - Operations Data CSV
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Número da página
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *           default: 20
 *         description: Quantidade de registros por página
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista paginada de escolas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: sucess
 *                 message:
 *                   type: string
 *                   example: Consulta realizada com sucesso
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: integer
 *                     pageSize:
 *                       type: integer
 *                     total:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 */
router.get('/listData', (req, res) => OperationsDataCsvController.list(req, res));


//Read
/**
 * @swagger
 * /api/operations/create:
 *   post:
 *     summary: Cria um registro de escola
 *     description: Endpoint para criar um novo registro de escola. Todos os campos são obrigatórios.
 *     tags:
 *       - Operations Data CSV
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - NOMEDEP
 *               - DE
 *               - MUN
 *               - DISTR
 *               - CODESC
 *               - NOMESC
 *               - TIPOESC
 *               - TIPOESC_DESC
 *             properties:
 *               NOMEDEP:
 *                 type: string
 *                 example: ESTADUAL - SE
 *               DE:
 *                 type: string
 *                 example: ADAMANTINA
 *               MUN:
 *                 type: string
 *                 example: ADAMANTINA
 *               DISTR:
 *                 type: string
 *                 example: ADAMANTINA
 *               CODESC:
 *                 type: string
 *                 example: 31045
 *               NOMESC:
 *                 type: string
 *                 example: DURVALINO GRION PROF
 *               TIPOESC:
 *                 type: integer
 *                 example: 8
 *               TIPOESC_DESC:
 *                 type: string
 *                 example: EE
 *     responses:
 *       200:
 *         description: Escola criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: sucess
 *                 message:
 *                   type: string
 *                   example: Deu certo
 *                 data:
 *                   type: object
 */
router.post('/create', (req, res) => OperationsDataCsvController.create(req, res));

//ReadById
/**
 * @swagger
 * /api/operations/getById:
 *   get:
 *     summary: Busca um registro de escola pelo id
 *     description: Retorna um registro de escola pelo id informado na query string
 *     tags:
 *       - Operations Data CSV
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do registro a ser buscado
 *     responses:
 *       200:
 *         description: Registro encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: sucess
 *                 message:
 *                   type: string
 *                   example: Registro encontrado com sucesso
 *                 data:
 *                   type: object
 *       400:
 *         description: Parâmetro 'id' é obrigatório
 *       404:
 *         description: Registro não encontrado
 */
router.get('/getById', (req, res) => OperationsDataCsvController.getById(req, res));

//Update
/**
 * @swagger
 * /api/operations/update:
 *   put:
 *     summary: Atualiza um registro de escola pelo id
 *     description: Atualiza apenas os campos enviados no corpo da requisição para o registro de escola com o id informado na query string
 *     tags:
 *       - Operations Data CSV
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do registro a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             description: Campos a serem atualizados (pode enviar apenas os campos desejados)
 *     responses:
 *       200:
 *         description: Registro atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: sucess
 *                 message:
 *                   type: string
 *                   example: Registro atualizado com sucesso
 *                 data:
 *                   type: object
 *       400:
 *         description: Parâmetro 'id' é obrigatório ou corpo vazio
 *       404:
 *         description: Registro não encontrado
 */
router.put('/update', (req, res) => OperationsDataCsvController.update(req, res));


//Delete
/**
 * @swagger
 * /api/operations/delete:
 *   delete:
 *     summary: Remove um registro de escola pelo id
 *     description: Remove um registro de escola pelo id informado na query string
 *     tags:
 *       - Operations Data CSV
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do registro a ser removido
 *     responses:
 *       200:
 *         description: Registro removido com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: sucess
 *                 message:
 *                   type: string
 *                   example: Registro removido com sucesso
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *       400:
 *         description: Parâmetro 'id' é obrigatório
 *       404:
 *         description: Registro não encontrado
 */
router.delete('/delete', (req, res) => OperationsDataCsvController.delete(req, res));

module.exports = router;
