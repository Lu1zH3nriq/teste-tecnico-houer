const OperationsDataCsvRepository = require('../repositories/operationDataCsvRepository');

class OperationsDataCsvController {
    
    async getById(req, res) {
        const id = req.query.id;
        if (!id) {
            return res.status(400).json({
                status: "Error",
                message: "Parâmetro 'id' é obrigatório."
            });
        }
        try {
            const escola = await OperationsDataCsvRepository.getSchoolById(id);
            if (escola) {
                res.json({
                    status: "sucess",
                    message: 'Registro encontrado com sucesso',
                    data: escola
                });
            } else {
                res.status(404).json({
                    status: "Error",
                    message: 'Registro não encontrado'
                });
            }
        } catch (err) {
            res.status(500).json({
                status: "Error",
                message: err.message
            });
        }
    }
    
    async update(req, res) {
        const id = req.query.id;
        if (!id) {
            return res.status(400).json({
                status: "Error",
                message: "Parâmetro 'id' é obrigatório."
            });
        }
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                status: "Error",
                message: "Corpo da requisição não pode ser vazio."
            });
        }
        try {
            const escola = await OperationsDataCsvRepository.updateSchoolById(id, req.body);
            if (escola) {
                res.json({
                    status: "sucess",
                    message: 'Registro atualizado com sucesso',
                    data: escola
                });
            } else {
                res.status(404).json({
                    status: "Error",
                    message: 'Registro não encontrado'
                });
            }
        } catch (err) {
            res.status(500).json({
                status: "Error",
                message: err.message
            });
        }
    }
    
    async delete(req, res) {
        const id = req.query.id;
        if (!id) {
            return res.status(400).json({
                status: "Error",
                message: "Parâmetro 'id' é obrigatório."
            });
        }
        try {
            const deleted = await OperationsDataCsvRepository.deleteSchoolById(id);
            if (deleted) {
                res.json({
                    status: "sucess",
                    message: 'Registro removido com sucesso',
                    data: { id }
                });
            } else {
                res.status(404).json({
                    status: "Error",
                    message: 'Registro não encontrado'
                });
            }
        } catch (err) {
            res.status(500).json({
                status: "Error",
                message: err.message
            });
        }
    }
    
    async create(req, res) {
        const requiredFields = [
            'NOMEDEP', 'DE', 'MUN', 'DISTR', 'CODESC', 'NOMESC', 'TIPOESC', 'TIPOESC_DESC'
        ];
        const missing = requiredFields.filter(field => !req.body[field]);
        if (missing.length > 0) {
            return res.status(400).json({
                status: "Error",
                message: `Campos obrigatórios faltando: ${missing.join(', ')}`
            });
        }
        try {
            const escola = await OperationsDataCsvRepository.createSchool(req.body);
            res.json({
                status: "sucess",
                message: 'Deu certo',
                data: escola
            });
        } catch (err) {
            res.status(400).json({
                status: "Error",
                message: err.message
            });
        }
    }

    
    async list(req, res) {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 20;
        try {
            const { rows, count } = await OperationsDataCsvRepository.listSchoolsPaginated(page, pageSize);
            res.json({
                status: "sucess",
                message: 'Consulta realizada com sucesso',
                data: rows,
                pagination: {
                    page,
                    pageSize,
                    total: count,
                    totalPages: Math.ceil(count / pageSize)
                }
            });
        } catch (err) {
            res.status(500).json({
                status: "Error",
                message: err.message
            });
        }
    }
}

module.exports = new OperationsDataCsvController();