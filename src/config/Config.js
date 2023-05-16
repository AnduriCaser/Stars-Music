const { config } = require("dotenv");
const path = require("path");

const envPath = path.join(__dirname, '../../.env');

config({ path: envPath });


module.exports = {
    development: {
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        host: process.env.HOST,
        port: process.env.PORT,
        dialect: process.env.DIALECT
    }
}