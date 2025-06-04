// Incluindo Prototypes
const { DataTypes } = require('sequelize')

// Trazendo a conexão com o banco
const db = require('../db/conn')

const User = require('./User')

const Address = db.define('Address', {
    street: {
        type: DataTypes.STRING,
        required: true
    },
    number: {
        type: DataTypes.STRING,
        required: true
    },
    city: {
        type: DataTypes.STRING,
        required: true
    }
})

// Fazendo relação com a tabela de usuário
// Informando que dentro de Address eu quero criar uma coluna com ID do Usuário
Address.belongsTo(User)

module.exports = Address;
