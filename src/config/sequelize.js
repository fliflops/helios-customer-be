const Sequelize = require('sequelize');
const {rataModels,models,tmsModels,heliosModels} = require('../api/models');

/**
* Exports Databases 
* @public
*/

module.exports = async() => {
    await rataModels.sequelize.authenticate().then(() => {
        console.log(`Connected to ${rataModels.sequelize.getDatabaseName()}`)
    })
    .catch(e => {
        console.log(e)
    });

    await models.sequelize.authenticate().then(()=>{
        console.log(`Connected to ${models.sequelize.getDatabaseName()}`)
    })
    .catch(e => {
        console.log(e)
    });

    await tmsModels.sequelize.authenticate().then(()=>{
        console.log(`Connected to ${tmsModels.sequelize.getDatabaseName()}`)
    })
    .catch(e => {
        console.log(e)
    });

    await heliosModels.sequelize.authenticate().then(()=>{
        console.log(`Connected to ${heliosModels.sequelize.getDatabaseName()}`)
    })
    .catch(e => {
        console.log(e)
    });
}
