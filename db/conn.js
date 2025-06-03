const {Sequelize} = require('sequelize');
const sequelize = new Sequelize('nodesequelize', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

try {

    sequelize.authenticate()
    console.log('Conexão com Sequelize bem sucedida!')

} catch(e){
    console.log('Não foi possível conectar', error)
}

module.exports = sequelize

