const fs = require("fs");
const Sequelize = require("sequelize");
const path = require("path");
const variables = require("../config/config");
const Promise = require("bluebird");

const { createDatabase } = require("../db/createDatabase");


const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = variables[env];
const db = {};
let sequelize;

if (config) {
    module.exports = (async () => {
        return new Promise(async (resolve, reject) => {
            try {
                // Disable for docker image !!!!
                const res = await createDatabase();

                sequelize = new Sequelize(config.database, config.user, config.password, {
                    host: config.host,
                    dialect: config.dialect,
                    logging : false
                });


                fs.readdirSync(__dirname)
                    .filter(file => (file.indexOf(".") !== 0) && (file !== basename) && (file.slice(-3) == '.js'))
                    .forEach(file => {
                        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
                        db[path.parse(file).name] = model;
                    });


                Object.keys(db).forEach(async name => {
                    if ((await db[name]).associate) {
                        (await db[name]).associate(db);
                    };
                });

                db.sequelize = sequelize;
                db.Sequelize = Sequelize;


                resolve(db);
            } catch (err) {
                reject(err);
            }
        })
    })();
}