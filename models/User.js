// Incluindo Prototypes
const {DataTypes} = require('sequelize')

// Trazendo a conexão com o banco
const db = require('../db/conn')

const User = db.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    occupation: {
        type: DataTypes.STRING,
        required: true,
    },
    newsletter: {
        type: DataTypes.BOOLEAN
    }
})

module.exports = User;