'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

if (process.env.DATABASE_URL) {
	const matches = process.env.DATABASE_URL.match(/^postgres:\/\/([\d\w]+):([\d\w]+)@([\d\w-\.]+):(\d+)\/(.*)$/);
	if (matches) {
		config = {
			"username": matches[1],
			"password": matches[2],
			"database": matches[5],
			"host": matches[3],
			"port": matches[4],
			"dialect": "postgres"
		};
	}
}

let sequelize;
config.operatorsAliases = false;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}
sequelize.createstamp = new Date();

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
