const School = require('../models/School');

class OperationsDataCsvRepository {
    

    
    async getSchoolById(id) {
        return await School.findByPk(id);
    }
    

    async updateSchoolById(id, data) {
        const escola = await School.findByPk(id);
        if (!escola) return null;
        await escola.update(data);
        return escola;
    }
    

    async deleteSchoolById(id) {
        const escola = await School.findByPk(id);
        if (!escola) return false;
        await escola.destroy();
        return true;
    }


    async createSchool(data) {
        // Pega só esses campos
        const allowedFields = [
            'NOMEDEP', 'DE', 'MUN', 'DISTR', 'CODESC', 'NOMESC', 'TIPOESC', 'TIPOESC_DESC'
        ];
        const schoolData = {};
        allowedFields.forEach(field => {
            schoolData[field] = data[field] !== undefined ? data[field] : null;
        });
        // Outros campos serão null
        const escola = await School.create(schoolData);
        return escola;
    }

    
    async listSchoolsPaginated(page = 1, pageSize = 20) {
        const offset = (page - 1) * pageSize;
        const result = await School.findAndCountAll({
            offset,
            limit: pageSize,
            order: [['id', 'DESC']]
        });
        return result;
    }
}

module.exports = new OperationsDataCsvRepository();