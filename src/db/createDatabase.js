const fs = require("fs-extra");
const mysql = require("mysql2/promise");
const Promise = require("bluebird");


const variables = require("../config/Config");
const env = process.env.NODE_ENV || 'development';
const config = variables[env];

const createDatabase = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            const { Sequelize } = require('sequelize');

            const sequelize = new Sequelize(`mysql://${config.user}:${config.password}@${config.host}:${config.port}`);

            await sequelize.query(`CREATE DATABASE IF NOT EXISTS ${config.database}`)
                .then(() => {
                    console.log('Database created successfully.');
                })
                .catch((err) => {
                    console.error('Database error:', err);
                });


            resolve("Database successfully initialized");
        } catch (err) {
            reject(err);
        };
    })
};


module.exports = {
    createDatabase
}