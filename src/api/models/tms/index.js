const {tms_db} = require('../../../config/vars');
const Sequelize = require('sequelize').Sequelize;

const consignee_tbl = require('./consignee_tbl');

/**
 * @type {Sequelize.Sequelize}
 */

const sequelize = new Sequelize({
    ...tms_db
});

const models = {
    consignee_tbl: consignee_tbl.init(sequelize)
}

module.exports = {
    sequelize,
    Sequelize,
    ...models
}
