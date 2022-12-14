const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const {helios_customer_db} = require('../../../config/vars');
const Sequelize = require('sequelize').Sequelize;


/**
 * @type {Sequelize.Sequelize}
 */
const sequelize = new Sequelize({
    ...helios_customer_db
});

let db = {};

fs.readdirSync(__dirname)
	.filter(file => {
		return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
	})
	.forEach(file => {
        const model = require(path.join(__dirname,file))
        console.log(model.name)
        db[model.name] = model.init(sequelize)
	});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db
