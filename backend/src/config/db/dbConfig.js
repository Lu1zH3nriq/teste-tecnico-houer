const { Sequelize } = require('sequelize');

const dbConfig = {
    db_name: process.env.DB_NAME,
    db_user: process.env.DB_USER,
    db_pass: process.env.DB_PASS,
    db_host: process.env.DB_HOST,
    db_port: process.env.DB_PORT
};


const useSSL = dbConfig.db_host && dbConfig.db_host.includes('aivencloud.com');

const sequelize = new Sequelize(dbConfig.db_name, dbConfig.db_user, dbConfig.db_pass, {
    host: dbConfig.db_host,
    port: dbConfig.db_port,
    dialect: 'postgres',
    dialectOptions: useSSL
        ? {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            },
        }
        : {},
});

module.exports = sequelize;