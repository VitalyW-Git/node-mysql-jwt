import { Sequelize } from 'sequelize';
import config from '../config/database.js';

const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: 'localhost',
    dialect: 'mysql',
    // operatorsAliases: 'false',
    logging: true,
});
export default sequelize