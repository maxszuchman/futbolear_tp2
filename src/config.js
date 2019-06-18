const dotenv = require('dotenv')
dotenv.config()

const dbConfigs = {
    home: {
        client: 'mssql',
        connection: {
            server: '127.0.0.1',
            host: '127.0.0.1',
            user: 'ORT_TP2_USER',
            password: 'ORT_TP2_PASS',
            database: 'testDB'
        }
    },
    ort: {
        client: 'mssql',
        connection: {
            server: 'A-SRV-BDINST',
            host: 'A-SRV-BDINST',
            user: 'BD21A01',
            password: 'BD21A01',
            database: 'BD21A01'
        }
    }
}

const srvConfigs = {
    port: process.env.PORT || 8080,
    env: process.env.DB_ENV,
    mode: process.env.MODE
}

module.exports = {
    dbConfig: dbConfigs[srvConfigs.env],
    port: srvConfigs.port,
    mode: srvConfigs.mode
}