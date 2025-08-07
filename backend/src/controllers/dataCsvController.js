const fs = require('fs');
const School = require('../models/School');
const repoCsv = require('../repositories/dataCsvRepository');
const csv = require('csv-parser');


class DataCsvController {

    async uploadCsv(req, res) {
        if (!req.file) {
            return res.status(400).json({
                status: 'error',
                message: 'Nenhum arquivo enviado!'
            });
        }

        const path = req.file.path;
        try {
            
            const cleanResults = await repoCsv.processCsvFile(path);
            
            const created = await School.bulkCreate(cleanResults, { ignoreDuplicates: true });
            res.json({
                status: 'success',
                message: `Arquivo ${req.file.originalname} importado com sucesso!`,
                totalRegistros: created.length
            });


        } catch (err) {
            console.error('Erro ao importar CSV:', err);
            res.status(500).json({
                status: 'error',
                message: 'Erro ao importar CSV',
                error: err.message
            });
        }
    }
}

module.exports = new DataCsvController();