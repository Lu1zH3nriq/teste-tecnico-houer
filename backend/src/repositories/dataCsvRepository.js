const fs = require('fs');
const csv = require('csv-parser');

class DataCsvRepository {
    
    async processCsvFile(filePath) {
        const results = [];
        await new Promise((resolve, reject) => {
            fs.createReadStream(filePath)
                .pipe(csv({ separator: ';' }))
                .on('data', (data) => results.push(data))
                .on('end', resolve)
                .on('error', reject);
        });
        
        return results.map(obj => {
            const newObj = {};
            Object.keys(obj).forEach(key => {
                const cleanKey = key.replace(/^\uFEFF/, '');
                newObj[cleanKey] = obj[key];
            });
            return newObj;
        });
    }
}

module.exports = new DataCsvRepository();