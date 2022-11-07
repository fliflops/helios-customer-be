const {helios_db} = require('../../../config/vars');

const Sequelize = require('sequelize').Sequelize;

/**
 * @type {Sequelize.Sequelize}
 */

const sequelize = new Sequelize({
    ...helios_db
})

const models = {
    booking_request_hdr_tbl: (require('./booking_request_hdr_tbl')).init(sequelize)
}

module.exports = {
    sequelize,
    Sequelize,
    ...models
}